import { prisma } from "@/lib/db";
import { success, withAuth } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const [
      totalSchools, activeSchools, trialSchools, expiredSchools,
      totalStudents, totalTeachers, totalUsers,
      openTickets, recentSchools,
    ] = await Promise.all([
      prisma.school.count(),
      prisma.school.count({ where: { subscriptionStatus: "active", isActive: true } }),
      prisma.school.count({ where: { subscriptionStatus: "trial" } }),
      prisma.school.count({ where: { subscriptionStatus: "expired" } }),
      prisma.student.count({ where: { status: "active" } }),
      prisma.teacher.count({ where: { status: "active" } }),
      prisma.user.count({ where: { isActive: true } }),
      prisma.supportTicket.count({ where: { status: { in: ["open", "in_progress"] } } }),
      prisma.school.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { students: true, teachers: true } } },
      }),
    ]);

    const subscriptionDistribution = {
      starter: await prisma.school.count({ where: { subscription: "starter", subscriptionStatus: "active" } }),
      professional: await prisma.school.count({ where: { subscription: "professional", subscriptionStatus: "active" } }),
      enterprise: await prisma.school.count({ where: { subscription: "enterprise", subscriptionStatus: "active" } }),
    };

    return success({
      totalSchools,
      activeSchools,
      trialSchools,
      expiredSchools,
      totalStudents,
      totalTeachers,
      totalUsers,
      openTickets,
      subscriptionDistribution,
      recentSchools,
    });
  });
}
