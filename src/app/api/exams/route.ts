import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent", "student"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");
    const filter = getSchoolFilter(user);

    const where = { ...filter, ...(type && { type: type as never }), ...(status && { status }) };
    const [exams, total] = await Promise.all([
      prisma.exam.findMany({ where, include: { _count: { select: { examResults: true } } }, orderBy: { startDate: "desc" }, skip, take: limit }),
      prisma.exam.count({ where }),
    ]);
    return paginated(exams, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name, type, startDate } = body;
    if (!name || !type || !startDate) return error("Required: name, type, startDate");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const exam = await prisma.exam.create({
      data: { schoolId, name, type, startDate: new Date(startDate), endDate: body.endDate ? new Date(body.endDate) : null, classFilter: body.classFilter },
    });
    return success(exam, 201);
  });
}
