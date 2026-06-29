import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "parent", "student"], async (user) => {
    const url = new URL(request.url);
    const examId = url.searchParams.get("examId");
    const studentId = url.searchParams.get("studentId");
    const filter = getSchoolFilter(user);

    const where = { ...filter, ...(examId && { examId }), ...(studentId && { studentId }) };
    const results = await prisma.examResult.findMany({
      where,
      include: { exam: true, student: true, subject: true },
      orderBy: { createdAt: "desc" },
    });
    return success(results);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const body = await request.json();
    const { results } = body;

    if (!results || !Array.isArray(results)) return error("Required: results array");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const created = await prisma.$transaction(
      results.map((r: { examId: string; studentId: string; subjectId: string; maxMarks: number; obtainedMarks: number; grade?: string; remarks?: string }) =>
        prisma.examResult.upsert({
          where: { examId_studentId_subjectId: { examId: r.examId, studentId: r.studentId, subjectId: r.subjectId } },
          update: { obtainedMarks: r.obtainedMarks, grade: r.grade, remarks: r.remarks },
          create: { schoolId, examId: r.examId, studentId: r.studentId, subjectId: r.subjectId, maxMarks: r.maxMarks, obtainedMarks: r.obtainedMarks, grade: r.grade, remarks: r.remarks },
        })
      )
    );
    return success({ count: created.length }, 201);
  });
}
