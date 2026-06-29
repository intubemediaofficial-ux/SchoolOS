import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const filter = getSchoolFilter(user);
    const schoolId = user.schoolId;
    if (!schoolId && user.role !== "super_admin") return error("No school associated", 403);

    const url = new URL(request.url);
    const targetSchoolId = url.searchParams.get("schoolId") || schoolId;

    const pages = await prisma.websitePage.findMany({
      where: { schoolId: targetSchoolId!, ...(user.role !== "super_admin" ? filter : {}) },
      orderBy: { sortOrder: "asc" },
    });
    return success(pages);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { slug, title, content } = body;
    if (!slug || !title) return error("Required: slug, title");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const page = await prisma.websitePage.create({
      data: { schoolId, slug, title, content: content || {}, isPublished: body.isPublished ?? false, metaTitle: body.metaTitle, metaDescription: body.metaDescription, sortOrder: body.sortOrder || 0 },
    });
    return success(page, 201);
  });
}
