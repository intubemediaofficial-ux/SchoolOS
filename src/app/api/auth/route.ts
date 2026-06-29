import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword, generateOtp, createSession } from "@/lib/auth";
import { success, error } from "@/lib/api-utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  // ─── SEND OTP ───
  if (action === "send-otp") {
    const { phone, email, purpose = "login" } = body;
    if (!phone && !email) return error("Phone or email required");

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    let userId: string | undefined;
    if (phone) {
      const user = await prisma.user.findFirst({ where: { phone } });
      if (user) userId = user.id;
    }

    await prisma.otpRequest.create({
      data: { userId, phone, email, otp, purpose, expiresAt },
    });

    // In production, integrate SMS/email gateway here
    // For development, return OTP in response
    return success({
      message: "OTP sent successfully",
      ...(process.env.NODE_ENV !== "production" && { otp }),
    });
  }

  // ─── VERIFY OTP ───
  if (action === "verify-otp") {
    const { phone, email, otp, purpose = "login" } = body;

    const otpRecord = await prisma.otpRequest.findFirst({
      where: {
        ...(phone ? { phone } : { email }),
        purpose,
        verified: false,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) return error("OTP expired or not found", 400);

    if (otpRecord.attempts >= 5) {
      return error("Too many attempts. Request a new OTP.", 429);
    }

    if (otpRecord.otp !== otp) {
      await prisma.otpRequest.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } },
      });
      return error("Invalid OTP", 400);
    }

    await prisma.otpRequest.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    if (purpose === "login" && otpRecord.userId) {
      const user = await prisma.user.findUnique({
        where: { id: otpRecord.userId },
        include: { school: true },
      });
      if (!user) return error("User not found", 404);

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date(), isVerified: true },
      });

      const { token } = await createSession(user.id);
      return success({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, school: user.school } });
    }

    return success({ verified: true, message: "OTP verified" });
  }

  // ─── PASSWORD LOGIN ───
  if (action === "login") {
    const { email, phone, password } = body;
    if ((!email && !phone) || !password) return error("Credentials required");

    const user = await prisma.user.findFirst({
      where: { ...(email ? { email } : { phone }), isActive: true },
      include: { school: true },
    });

    if (!user || !user.passwordHash) return error("Invalid credentials", 401);

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return error("Invalid credentials", 401);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const { token } = await createSession(user.id);
    return success({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, school: user.school } });
  }

  // ─── REGISTER (School + Admin User) ───
  if (action === "register") {
    const { schoolName, board, city, state, principalName, phone, email, password, plan = "starter" } = body;
    if (!schoolName || !phone || !email || !password) return error("Required fields missing");

    const existing = await prisma.user.findFirst({ where: { email } });
    if (existing) return error("Email already registered", 409);

    const subdomain = schoolName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const subdomainExists = await prisma.school.findUnique({ where: { subdomain } });
    const finalSubdomain = subdomainExists ? `${subdomain}-${Date.now().toString(36)}` : subdomain;

    const passwordHash = await hashPassword(password);

    const school = await prisma.school.create({
      data: {
        name: schoolName,
        subdomain: finalSubdomain,
        email,
        phone,
        city,
        state: state || "",
        board: board || "CBSE",
        principalName,
        subscription: plan,
        subscriptionStatus: "trial",
        subscriptionStart: new Date(),
        subscriptionEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14-day trial
      },
    });

    const user = await prisma.user.create({
      data: {
        name: principalName || schoolName + " Admin",
        email,
        phone,
        passwordHash,
        role: "school_admin",
        isVerified: true,
        schoolId: school.id,
      },
    });

    const { token } = await createSession(user.id);

    return success({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      school: { id: school.id, name: school.name, subdomain: finalSubdomain + ".schoolos.in" },
    }, 201);
  }

  // ─── LOGOUT ───
  if (action === "logout") {
    const { token } = body;
    if (token) {
      await prisma.session.deleteMany({ where: { token } }).catch(() => {});
    }
    return success({ message: "Logged out" });
  }

  return error("Invalid action", 400);
}
