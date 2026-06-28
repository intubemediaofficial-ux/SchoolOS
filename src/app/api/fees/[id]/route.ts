import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "accountant", "parent"], async (user) => {
    const { id } = await params;
    const payment = await prisma.feePayment.findUnique({
      where: { id },
      include: { student: true, feeStructure: true },
    });
    if (!payment) return error("Payment not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && payment.schoolId !== filter.schoolId) return error("Forbidden", 403);
    return success(payment);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(request, ["super_admin", "school_admin", "accountant"], async (user) => {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.feePayment.findUnique({ where: { id } });
    if (!existing) return error("Payment not found", 404);
    const filter = getSchoolFilter(user);
    if (filter.schoolId && existing.schoolId !== filter.schoolId) return error("Forbidden", 403);

    const paidAmount = body.paidAmount ?? existing.paidAmount;
    const amount = body.amount ?? existing.amount;
    const status = paidAmount >= amount ? "paid" : paidAmount > 0 ? "partial" : "pending";

    const payment = await prisma.feePayment.update({
      where: { id },
      data: {
        ...body,
        status,
        paidDate: paidAmount > 0 && !existing.paidDate ? new Date() : existing.paidDate,
        receiptNo: paidAmount > 0 && !existing.receiptNo ? `RCP-${Date.now().toString(36).toUpperCase()}` : existing.receiptNo,
      },
      include: { student: true, feeStructure: true },
    });
    return success(payment);
  });
}
