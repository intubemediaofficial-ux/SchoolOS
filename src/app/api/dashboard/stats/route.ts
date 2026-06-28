import { prisma } from "@/lib/db";
import { success, error, withAuth } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["school_admin", "teacher", "accountant"], async (user) => {
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalStudents, activeStudents,
      totalTeachers, activeTeachers,
      presentToday, totalAttendanceToday,
      pendingFees, paidFees, todayCollection,
      upcomingEvents, openAdmissions,
      recentPayments,
    ] = await Promise.all([
      prisma.student.count({ where: { schoolId } }),
      prisma.student.count({ where: { schoolId, status: "active" } }),
      prisma.teacher.count({ where: { schoolId } }),
      prisma.teacher.count({ where: { schoolId, status: "active" } }),
      prisma.attendanceRecord.count({ where: { schoolId, date: today, status: "present" } }),
      prisma.attendanceRecord.count({ where: { schoolId, date: today } }),
      prisma.feePayment.count({ where: { schoolId, status: { in: ["pending", "overdue"] } } }),
      prisma.feePayment.count({ where: { schoolId, status: "paid" } }),
      prisma.feePayment.aggregate({ where: { schoolId, paidDate: { gte: today } }, _sum: { paidAmount: true } }),
      prisma.event.findMany({ where: { schoolId, date: { gte: new Date() } }, take: 5, orderBy: { date: "asc" } }),
      prisma.admission.count({ where: { schoolId, status: { in: ["enquiry", "applied", "interview"] } } }),
      prisma.feePayment.findMany({
        where: { schoolId, status: "paid" },
        include: { student: true, feeStructure: true },
        orderBy: { paidDate: "desc" },
        take: 5,
      }),
    ]);

    const attendancePercent = totalAttendanceToday > 0 ? Math.round((presentToday / totalAttendanceToday) * 1000) / 10 : 0;

    return success({
      students: { total: totalStudents, active: activeStudents },
      teachers: { total: totalTeachers, active: activeTeachers },
      attendance: { present: presentToday, total: totalAttendanceToday, percent: attendancePercent },
      fees: { pending: pendingFees, paid: paidFees, todayCollection: todayCollection._sum.paidAmount || 0 },
      openAdmissions,
      upcomingEvents,
      recentPayments,
    });
  });
}
