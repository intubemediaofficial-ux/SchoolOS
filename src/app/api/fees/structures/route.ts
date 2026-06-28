import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const filter = getSchoolFilter(user);
    const structures = await prisma.feeStructure.findMany({
      where: { ...filter, isActive: true },
      orderBy: { name: "asc" },
    });
    return success(structures);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name, amount, frequency, classFilter } = body;
    if (!name || !amount) return error("Name and amount required");

    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const structure = await prisma.feeStructure.create({
      data: { schoolId, name, amount, frequency: frequency || "monthly", classFilter, ...body },
    });
    return success(structure, 201);
  });
}
