import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "librarian"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const status = url.searchParams.get("status");
    const filter = getSchoolFilter(user);

    const where = { ...filter, ...(status && { status }) };
    const [issues, total] = await Promise.all([
      prisma.bookIssue.findMany({ where, include: { book: true, student: true }, orderBy: { issuedDate: "desc" }, skip, take: limit }),
      prisma.bookIssue.count({ where }),
    ]);
    return paginated(issues, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "librarian"], async (user) => {
    const body = await request.json();
    const { bookId, studentId, dueDate } = body;
    if (!bookId || !studentId || !dueDate) return error("Required: bookId, studentId, dueDate");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book || book.availableCopies <= 0) return error("Book not available");

    const [issue] = await prisma.$transaction([
      prisma.bookIssue.create({ data: { schoolId, bookId, studentId, dueDate: new Date(dueDate) }, include: { book: true, student: true } }),
      prisma.book.update({ where: { id: bookId }, data: { availableCopies: { decrement: 1 } } }),
    ]);
    return success(issue, 201);
  });
}

export async function PUT(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "librarian"], async () => {
    const body = await request.json();
    const { issueId } = body;
    if (!issueId) return error("Required: issueId");

    const issue = await prisma.bookIssue.findUnique({ where: { id: issueId } });
    if (!issue || issue.status === "returned") return error("Invalid issue");

    const now = new Date();
    const fine = now > issue.dueDate ? Math.ceil((now.getTime() - issue.dueDate.getTime()) / (1000 * 60 * 60 * 24)) * 2 : 0;

    const [updated] = await prisma.$transaction([
      prisma.bookIssue.update({ where: { id: issueId }, data: { status: "returned", returnedDate: now, fine }, include: { book: true, student: true } }),
      prisma.book.update({ where: { id: issue.bookId }, data: { availableCopies: { increment: 1 } } }),
    ]);
    return success(updated);
  });
}
