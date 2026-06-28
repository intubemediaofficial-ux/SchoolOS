import { authenticateRequest } from "./auth";
import type { UserRole } from "@prisma/client";

export function success(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function error(message: string, status = 400) {
  return Response.json({ success: false, error: message }, { status });
}

export function paginated(data: unknown[], total: number, page: number, limit: number) {
  return Response.json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  });
}

export function getPaginationParams(url: URL) {
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20")));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

type AuthenticatedUser = NonNullable<Awaited<ReturnType<typeof authenticateRequest>>>;

export async function withAuth(
  request: Request,
  allowedRoles: UserRole[],
  handler: (user: AuthenticatedUser) => Promise<Response>
): Promise<Response> {
  const user = await authenticateRequest(request);
  if (!user) {
    return error("Unauthorized", 401);
  }
  if (!allowedRoles.includes(user.role)) {
    return error("Forbidden", 403);
  }
  return handler(user);
}

export function getSchoolFilter(user: { role: UserRole; schoolId: string | null }) {
  if (user.role === "super_admin") return {};
  if (!user.schoolId) return { schoolId: "none" };
  return { schoolId: user.schoolId };
}
