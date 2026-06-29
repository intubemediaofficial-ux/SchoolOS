import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent", "student"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const priority = url.searchParams.get("priority");
    const filter = getSchoolFilter(user);

    const where = { ...filter, ...(priority && { priority }) };
    const [notices, total] = await Promise.all([
      prisma.notice.findMany({ where, orderBy: { publishDate: "desc" }, skip, take: limit }),
      prisma.notice.count({ where }),
    ]);
    return paginated(notices, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const body = await request.json();
    const { title, content } = body;
    if (!title || !content) return error("Required: title, content");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const notice = await prisma.notice.create({
      data: { schoolId, title, content, createdBy: user.name, priority: body.priority || "normal", audience: body.audience || "all", expiryDate: body.expiryDate ? new Date(body.expiryDate) : null },
    });
    return success(notice, 201);
  });
}
