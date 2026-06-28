import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const status = url.searchParams.get("status");
    const plan = url.searchParams.get("plan");

    const where = {
      ...(status && { subscriptionStatus: status as never }),
      ...(plan && { subscription: plan as never }),
    };

    const [schools, total] = await Promise.all([
      prisma.school.findMany({
        where,
        select: { id: true, name: true, subdomain: true, subscription: true, subscriptionStatus: true, subscriptionStart: true, subscriptionEnd: true, _count: { select: { students: true } } },
        orderBy: { subscriptionEnd: "asc" },
        skip,
        take: limit,
      }),
      prisma.school.count({ where }),
    ]);

    return paginated(schools, total, page, limit);
  });
}

export async function PUT(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const body = await request.json();
    const { schoolId, plan, status, endDate } = body;
    if (!schoolId) return error("Required: schoolId");

    const data: Record<string, unknown> = {};
    if (plan) data.subscription = plan;
    if (status) data.subscriptionStatus = status;
    if (endDate) data.subscriptionEnd = new Date(endDate);

    const school = await prisma.school.update({
      where: { id: schoolId },
      data,
      select: { id: true, name: true, subscription: true, subscriptionStatus: true, subscriptionEnd: true },
    });
    return success(school);
  });
}
