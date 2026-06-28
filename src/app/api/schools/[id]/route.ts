import { prisma } from "@/lib/db";
import { success, error, withAuth } from "@/lib/api-utils";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const school = await prisma.school.findUnique({
      where: { id },
      include: {
        _count: { select: { students: true, teachers: true, users: true, classes: true } },
      },
    });
    if (!school) return error("School not found", 404);
    if (user.role !== "super_admin" && user.schoolId !== school.id) return error("Forbidden", 403);
    return success(school);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    if (user.role !== "super_admin" && user.schoolId !== id) return error("Forbidden", 403);

    const body = await request.json();
    const school = await prisma.school.update({ where: { id }, data: body });
    return success(school);
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin"], async () => {
    const { id } = await params;
    await prisma.school.update({ where: { id }, data: { isActive: false } });
    return success({ message: "School deactivated" });
  });
}
