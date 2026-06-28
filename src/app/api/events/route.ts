import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent", "student"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const type = url.searchParams.get("type");
    const upcoming = url.searchParams.get("upcoming") === "true";
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(type && { type }),
      ...(upcoming && { date: { gte: new Date() } }),
    };

    const [events, total] = await Promise.all([
      prisma.event.findMany({ where, orderBy: { date: "asc" }, skip, take: limit }),
      prisma.event.count({ where }),
    ]);
    return paginated(events, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { title, date, type } = body;
    if (!title || !date || !type) return error("Required: title, date, type");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const event = await prisma.event.create({
      data: { schoolId, title, date: new Date(date), type, description: body.description, endDate: body.endDate ? new Date(body.endDate) : null, location: body.location, audience: body.audience || "all" },
    });
    return success(event, 201);
  });
}
