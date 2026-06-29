import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const month = url.searchParams.get("month");
    const year = url.searchParams.get("year");
    const status = url.searchParams.get("status");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(month && { month: parseInt(month) }),
      ...(year && { year: parseInt(year) }),
      ...(status && { status }),
    };

    const [payrolls, total] = await Promise.all([
      prisma.payroll.findMany({ where, include: { teacher: true }, orderBy: [{ year: "desc" }, { month: "desc" }], skip, take: limit }),
      prisma.payroll.count({ where }),
    ]);
    return paginated(payrolls, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const body = await request.json();
    const { teacherId, month, year, basicSalary } = body;
    if (!teacherId || !month || !year || !basicSalary) return error("Required: teacherId, month, year, basicSalary");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const hra = body.hra || basicSalary * 0.2;
    const da = body.da || basicSalary * 0.1;
    const ta = body.ta || 0;
    const otherAllowances = body.otherAllowances || 0;
    const grossSalary = basicSalary + hra + da + ta + otherAllowances;

    const pf = body.pf || grossSalary * 0.12;
    const esi = body.esi || (grossSalary <= 21000 ? grossSalary * 0.0075 : 0);
    const tds = body.tds || 0;
    const otherDeductions = body.otherDeductions || 0;
    const netSalary = grossSalary - pf - esi - tds - otherDeductions;

    const payroll = await prisma.payroll.create({
      data: { schoolId, teacherId, month, year, basicSalary, hra, da, ta, otherAllowances, pf, esi, tds, otherDeductions, grossSalary, netSalary },
      include: { teacher: true },
    });
    return success(payroll, 201);
  });
}
