import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "receptionist"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const status = url.searchParams.get("status");
    const source = url.searchParams.get("source");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(status && { status: status as never }),
      ...(source && { source }),
    };

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({ where, orderBy: { appliedDate: "desc" }, skip, take: limit }),
      prisma.admission.count({ where }),
    ]);

    return paginated(admissions, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "receptionist"], async (user) => {
    const body = await request.json();
    const { studentName, parentName, phone, class: cls } = body;
    if (!studentName || !parentName || !phone || !cls) return error("Required: studentName, parentName, phone, class");

    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const admission = await prisma.admission.create({
      data: { schoolId, studentName, parentName, phone, class: cls, ...body },
    });
    return success(admission, 201);
  });
}
