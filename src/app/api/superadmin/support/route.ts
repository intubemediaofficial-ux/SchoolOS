import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");

    const where = {
      ...(status && { status: status as never }),
      ...(priority && { priority: priority as never }),
    };

    const [tickets, total] = await Promise.all([
      prisma.supportTicket.findMany({ where, include: { replies: { orderBy: { createdAt: "asc" } } }, orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.supportTicket.count({ where }),
    ]);
    return paginated(tickets, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { subject, description, priority = "medium" } = body;
    if (!subject || !description) return error("Required: subject, description");

    const ticket = await prisma.supportTicket.create({
      data: {
        schoolId: user.schoolId,
        schoolName: user.school?.name,
        subject,
        description,
        priority,
      },
    });
    return success(ticket, 201);
  });
}

export async function PUT(request: Request) {
  return withAuth(request, ["super_admin"], async (user) => {
    const body = await request.json();
    const { ticketId, status, reply } = body;
    if (!ticketId) return error("Required: ticketId");

    if (reply) {
      await prisma.ticketReply.create({
        data: { ticketId, message: reply, isStaff: true, authorName: user.name },
      });
    }

    const data: Record<string, unknown> = {};
    if (status) {
      data.status = status;
      if (status === "resolved") data.resolvedAt = new Date();
    }

    const ticket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data,
      include: { replies: { orderBy: { createdAt: "asc" } } },
    });
    return success(ticket);
  });
}
