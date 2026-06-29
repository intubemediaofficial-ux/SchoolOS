import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const filter = getSchoolFilter(user);
    const sessions = await prisma.academicSession.findMany({ where: filter, orderBy: { startDate: "desc" } });
    return success(sessions);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name, startDate, endDate, isCurrent } = body;
    if (!name || !startDate || !endDate) return error("Required: name, startDate, endDate");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    if (isCurrent) {
      await prisma.academicSession.updateMany({ where: { schoolId, isCurrent: true }, data: { isCurrent: false } });
    }

    const session = await prisma.academicSession.create({
      data: { schoolId, name, startDate: new Date(startDate), endDate: new Date(endDate), isCurrent: isCurrent ?? false },
    });
    return success(session, 201);
  });
}
