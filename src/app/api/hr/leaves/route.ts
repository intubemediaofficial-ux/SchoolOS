import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const status = url.searchParams.get("status");
    const teacherId = url.searchParams.get("teacherId");
    const filter = getSchoolFilter(user);

    const where = { ...filter, ...(status && { status: status as never }), ...(teacherId && { teacherId }) };
    const [leaves, total] = await Promise.all([
      prisma.leaveRequest.findMany({ where, include: { teacher: true }, orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.leaveRequest.count({ where }),
    ]);
    return paginated(leaves, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const body = await request.json();
    const { teacherId, leaveType, startDate, endDate, reason } = body;
    if (!teacherId || !leaveType || !startDate || !endDate || !reason) return error("Required: teacherId, leaveType, startDate, endDate, reason");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const leave = await prisma.leaveRequest.create({
      data: { schoolId, teacherId, leaveType, startDate: start, endDate: end, days, reason },
      include: { teacher: true },
    });
    return success(leave, 201);
  });
}

export async function PUT(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { leaveId, status, remarks } = body;
    if (!leaveId || !status) return error("Required: leaveId, status");

    const leave = await prisma.leaveRequest.update({
      where: { id: leaveId },
      data: { status, remarks, approvedBy: user.name },
      include: { teacher: true },
    });
    return success(leave);
  });
}
