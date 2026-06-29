import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const { id } = await params;
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: { classSubjects: { include: { subject: true, class: true } }, payrolls: { orderBy: { year: "desc" }, take: 12 }, leaveRequests: { orderBy: { createdAt: "desc" }, take: 10 } },
    });
    if (!teacher) return error("Teacher not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && teacher.schoolId !== filter.schoolId) return error("Forbidden", 403);
    return success(teacher);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.teacher.findUnique({ where: { id } });
    if (!existing) return error("Teacher not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);
    const teacher = await prisma.teacher.update({ where: { id }, data: body });
    return success(teacher);
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const existing = await prisma.teacher.findUnique({ where: { id } });
    if (!existing) return error("Teacher not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);
    await prisma.teacher.update({ where: { id }, data: { status: "resigned" } });
    return success({ message: "Teacher deactivated" });
  });
}
