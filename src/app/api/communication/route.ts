import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");
    const filter = getSchoolFilter(user);

    const where = { ...filter, ...(type && { type: type as never }), ...(status && { status }) };
    const [communications, total] = await Promise.all([
      prisma.communication.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.communication.count({ where }),
    ]);
    return paginated(communications, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const body = await request.json();
    const { type, title, message, audience } = body;
    if (!type || !title || !message || !audience) return error("Required: type, title, message, audience");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const sendNow = body.sendNow !== false;

    const comm = await prisma.communication.create({
      data: {
        schoolId, type, title, message, audience,
        audienceFilter: body.audienceFilter || null,
        sentBy: user.name,
        status: sendNow ? "sent" : body.scheduledAt ? "scheduled" : "draft",
        sentAt: sendNow ? new Date() : null,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
        totalRecipients: body.totalRecipients || 0,
      },
    });

    // In production: integrate SMS/WhatsApp/email/push gateway here

    return success(comm, 201);
  });
}
