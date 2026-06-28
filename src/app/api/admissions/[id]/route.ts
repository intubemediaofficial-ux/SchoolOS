import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "receptionist"], async (user) => {
    const { id } = await params;
    const admission = await prisma.admission.findUnique({ where: { id } });
    if (!admission) return error("Admission not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && admission.schoolId !== filter.schoolId) return error("Forbidden", 403);
    return success(admission);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "receptionist"], async (user) => {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.admission.findUnique({ where: { id } });
    if (!existing) return error("Admission not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);
    const admission = await prisma.admission.update({ where: { id }, data: body });
    return success(admission);
  });
}
