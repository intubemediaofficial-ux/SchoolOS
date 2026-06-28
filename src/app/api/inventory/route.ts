import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const category = url.searchParams.get("category");
    const lowStock = url.searchParams.get("lowStock") === "true";
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(category && { category }),
      ...(lowStock && { AND: { quantity: { lte: 5 } } }),
    };

    const [items, total] = await Promise.all([
      prisma.inventoryItem.findMany({ where, orderBy: { name: "asc" }, skip, take: limit }),
      prisma.inventoryItem.count({ where }),
    ]);
    return paginated(items, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const body = await request.json();
    const { name, category } = body;
    if (!name || !category) return error("Required: name, category");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const item = await prisma.inventoryItem.create({ data: { schoolId, name, category, ...body } });
    return success(item, 201);
  });
}
