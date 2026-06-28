import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent", "student"], async (user) => {
    const url = new URL(request.url);
    const sectionId = url.searchParams.get("sectionId");
    const teacherId = url.searchParams.get("teacherId");
    const dayOfWeek = url.searchParams.get("dayOfWeek");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(sectionId && { sectionId }),
      ...(teacherId && { teacherId }),
      ...(dayOfWeek && { dayOfWeek: parseInt(dayOfWeek) }),
    };

    const entries = await prisma.timetableEntry.findMany({
      where,
      include: { subject: true, teacher: true, section: { include: { class: true } } },
      orderBy: [{ dayOfWeek: "asc" }, { period: "asc" }],
    });
    return success(entries);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { entries } = body;
    if (!entries || !Array.isArray(entries)) return error("Required: entries array");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const created = await prisma.$transaction(
      entries.map((e: { sectionId: string; subjectId: string; teacherId: string; dayOfWeek: number; period: number; startTime: string; endTime: string; room?: string }) =>
        prisma.timetableEntry.upsert({
          where: { sectionId_dayOfWeek_period: { sectionId: e.sectionId, dayOfWeek: e.dayOfWeek, period: e.period } },
          update: { subjectId: e.subjectId, teacherId: e.teacherId, startTime: e.startTime, endTime: e.endTime, room: e.room },
          create: { schoolId, ...e },
        })
      )
    );
    return success({ count: created.length }, 201);
  });
}
