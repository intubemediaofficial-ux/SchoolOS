import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "accountant", "receptionist", "parent"], async (user) => {
    const { id } = await params;
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        section: { include: { class: true } },
        parent: true,
        feePayments: { orderBy: { dueDate: "desc" }, take: 10 },
        attendanceRecords: { orderBy: { date: "desc" }, take: 30 },
        examResults: { include: { exam: true, subject: true }, orderBy: { createdAt: "desc" } },
        documents: true,
        transportRoute: true,
      },
    });
    if (!student) return error("Student not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && student.schoolId !== filter.schoolId) return error("Forbidden", 403);
    return success(student);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "receptionist"], async (user) => {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) return error("Student not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);

    const student = await prisma.student.update({
      where: { id },
      data: body,
      include: { section: { include: { class: true } }, parent: true },
    });
    return success(student);
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) return error("Student not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);

    await prisma.student.update({ where: { id }, data: { status: "inactive" } });
    return success({ message: "Student deactivated" });
  });
}
