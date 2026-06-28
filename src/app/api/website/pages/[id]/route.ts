import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const page = await prisma.websitePage.findUnique({ where: { id } });
    if (!page) return error("Page not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && page.schoolId !== filter.schoolId) return error("Forbidden", 403);
    return success(page);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.websitePage.findUnique({ where: { id } });
    if (!existing) return error("Page not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);

    const page = await prisma.websitePage.update({ where: { id }, data: body });
    return success(page);
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const { id } = await params;
    const existing = await prisma.websitePage.findUnique({ where: { id } });
    if (!existing) return error("Page not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);

    await prisma.websitePage.delete({ where: { id } });
    return success({ message: "Page deleted" });
  });
}
