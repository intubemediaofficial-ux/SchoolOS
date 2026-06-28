import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const plan = url.searchParams.get("plan") || "";

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { subdomain: { contains: search, mode: "insensitive" as const } },
          { city: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(status && { subscriptionStatus: status as never }),
      ...(plan && { subscription: plan as never }),
    };

    const [schools, total] = await Promise.all([
      prisma.school.findMany({
        where,
        include: { _count: { select: { students: true, teachers: true, users: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.school.count({ where }),
    ]);

    return paginated(schools, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const body = await request.json();
    const { name, email, phone, city, state, board, principalName, plan = "starter" } = body;

    if (!name || !email || !phone) return error("Name, email, and phone required");

    const subdomain = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const existing = await prisma.school.findUnique({ where: { subdomain } });
    const finalSubdomain = existing ? `${subdomain}-${Date.now().toString(36)}` : subdomain;

    const school = await prisma.school.create({
      data: {
        name,
        subdomain: finalSubdomain,
        email,
        phone,
        city: city || "",
        state: state || "",
        board: board || "CBSE",
        principalName,
        subscription: plan,
        subscriptionStatus: "trial",
        subscriptionStart: new Date(),
        subscriptionEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });

    return success(school, 201);
  });
}
