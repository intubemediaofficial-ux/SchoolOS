import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const search = url.searchParams.get("search") || "";
    const department = url.searchParams.get("department");
    const status = url.searchParams.get("status") || "active";
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(status && { status }),
      ...(department && { department }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { employeeId: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search } },
        ],
      }),
    };

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: limit,
      }),
      prisma.teacher.count({ where }),
    ]);

    return paginated(teachers, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name, phone, gender, qualification, department, designation } = body;

    if (!name || !phone || !gender || !qualification || !department || !designation) {
      return error("Required: name, phone, gender, qualification, department, designation");
    }

    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const count = await prisma.teacher.count({ where: { schoolId } });
    const employeeId = body.employeeId || `EMP${String(count + 1).padStart(4, "0")}`;

    const teacher = await prisma.teacher.create({
      data: { schoolId, employeeId, name, phone, gender, qualification, department, designation, ...body },
    });

    return success(teacher, 201);
  });
}
