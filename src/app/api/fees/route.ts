import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const status = url.searchParams.get("status");
    const studentId = url.searchParams.get("studentId");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(status && { status: status as never }),
      ...(studentId && { studentId }),
    };

    const [payments, total] = await Promise.all([
      prisma.feePayment.findMany({
        where,
        include: { student: true, feeStructure: true },
        orderBy: { dueDate: "desc" },
        skip,
        take: limit,
      }),
      prisma.feePayment.count({ where }),
    ]);

    return paginated(payments, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const body = await request.json();
    const { studentId, feeStructureId, amount, dueDate, paymentMethod, paidAmount = 0 } = body;

    if (!studentId || !feeStructureId || !amount || !dueDate) {
      return error("Required: studentId, feeStructureId, amount, dueDate");
    }

    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const status = paidAmount >= amount ? "paid" : paidAmount > 0 ? "partial" : "pending";
    const receiptNo = paidAmount > 0 ? `RCP-${Date.now().toString(36).toUpperCase()}` : null;

    const payment = await prisma.feePayment.create({
      data: {
        schoolId,
        studentId,
        feeStructureId,
        amount,
        paidAmount,
        dueDate: new Date(dueDate),
        paidDate: paidAmount > 0 ? new Date() : null,
        status,
        paymentMethod: paymentMethod || null,
        receiptNo,
        collectedBy: user.name,
      },
      include: { student: true, feeStructure: true },
    });

    return success(payment, 201);
  });
}
