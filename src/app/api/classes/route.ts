import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent", "student", "accountant", "receptionist"], async (user) => {
    const filter = getSchoolFilter(user);
    const classes = await prisma.class.findMany({
      where: filter,
      include: { sections: { include: { _count: { select: { students: true } } } } },
      orderBy: { numericOrder: "asc" },
    });
    return success(classes);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name, numericOrder, sections } = body;
    if (!name || numericOrder === undefined) return error("Required: name, numericOrder");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const cls = await prisma.class.create({
      data: {
        schoolId,
        name,
        numericOrder,
        sections: sections ? { create: (sections as string[]).map((s) => ({ schoolId, name: s })) } : undefined,
      },
      include: { sections: true },
    });
    return success(cls, 201);
  });
}
