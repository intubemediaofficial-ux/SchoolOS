import { prisma } from "@/lib/db";
import { success, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const url = new URL(request.url);
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];
    const filter = getSchoolFilter(user);
    const attendanceDate = new Date(date);

    const [present, absent, late, leave, total] = await Promise.all([
      prisma.attendanceRecord.count({ where: { ...filter, date: attendanceDate, status: "present" } }),
      prisma.attendanceRecord.count({ where: { ...filter, date: attendanceDate, status: "absent" } }),
      prisma.attendanceRecord.count({ where: { ...filter, date: attendanceDate, status: "late" } }),
      prisma.attendanceRecord.count({ where: { ...filter, date: attendanceDate, status: "leave" } }),
      prisma.attendanceRecord.count({ where: { ...filter, date: attendanceDate } }),
    ]);

    return success({
      date,
      present,
      absent,
      late,
      leave,
      total,
      presentPercent: total > 0 ? Math.round((present / total) * 1000) / 10 : 0,
    });
  });
}
