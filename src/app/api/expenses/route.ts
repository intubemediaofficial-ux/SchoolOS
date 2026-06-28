import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const category = url.searchParams.get("category");
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(category && { category }),
      ...(from && to && { date: { gte: new Date(from), lte: new Date(to) } }),
    };

    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({ where, orderBy: { date: "desc" }, skip, take: limit }),
      prisma.expense.count({ where }),
    ]);
    return paginated(expenses, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const body = await request.json();
    const { category, description, amount, date } = body;
    if (!category || !description || !amount || !date) return error("Required: category, description, amount, date");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const expense = await prisma.expense.create({ data: { schoolId, category, description, amount, date: new Date(date), ...body } });
    return success(expense, 201);
  });
}
