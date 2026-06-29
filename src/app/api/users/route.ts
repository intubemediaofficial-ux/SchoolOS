import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const search = url.searchParams.get("search") || "";
    const role = url.searchParams.get("role") || "";
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(role && { role: role as never }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, isVerified: true, lastLogin: true, createdAt: true, school: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return paginated(users, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name, email, phone, password, role, schoolId: targetSchoolId } = body;

    if (!name || !phone || !password || !role) {
      return error("Required: name, phone, password, role");
    }

    // Super admin can create for any school, school admin only for their school
    let schoolId = user.schoolId;
    if (user.role === "super_admin") {
      schoolId = targetSchoolId || null;
    }

    // School admin can only create certain roles
    if (user.role === "school_admin") {
      const allowedRoles = ["teacher", "accountant", "librarian", "receptionist", "driver"];
      if (!allowedRoles.includes(role)) {
        return error("School admin can only create: teacher, accountant, librarian, receptionist, driver");
      }
    }

    // Check if user already exists
    if (email) {
      const existing = await prisma.user.findFirst({ where: { email, schoolId } });
      if (existing) return error("User with this email already exists", 409);
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email || null,
        phone,
        passwordHash,
        role: role as never,
        schoolId,
        isActive: true,
        isVerified: true,
      },
      select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, createdAt: true },
    });

    return success(newUser, 201);
  });
}
