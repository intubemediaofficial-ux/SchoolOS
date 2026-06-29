import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const date = url.searchParams.get("date");
    const sectionId = url.searchParams.get("sectionId");
    const studentId = url.searchParams.get("studentId");
    const status = url.searchParams.get("status");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(date && { date: new Date(date) }),
      ...(sectionId && { sectionId }),
      ...(studentId && { studentId }),
      ...(status && { status: status as never }),
    };

    const [records, total] = await Promise.all([
      prisma.attendanceRecord.findMany({
        where,
        include: { student: true, section: { include: { class: true } } },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.attendanceRecord.count({ where }),
    ]);

    return paginated(records, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const body = await request.json();
    const { records, date, sectionId, deviceType = "manual" } = body;

    if (!records || !Array.isArray(records) || !date || !sectionId) {
      return error("Required: records (array), date, sectionId");
    }

    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const attendanceDate = new Date(date);

    const created = await prisma.$transaction(
      records.map((r: { studentId: string; status: string; remarks?: string }) =>
        prisma.attendanceRecord.upsert({
          where: { studentId_date: { studentId: r.studentId, date: attendanceDate } },
          update: { status: r.status as never, remarks: r.remarks, markedBy: user.name, deviceType },
          create: {
            schoolId,
            studentId: r.studentId,
            sectionId,
            date: attendanceDate,
            status: r.status as never,
            markedBy: user.name,
            remarks: r.remarks,
            deviceType,
          },
        })
      )
    );

    return success({ count: created.length, message: `Attendance marked for ${created.length} students` }, 201);
  });
}
