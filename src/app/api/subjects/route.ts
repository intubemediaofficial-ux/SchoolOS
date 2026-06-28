import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher"], async (user) => {
    const filter = getSchoolFilter(user);
    const subjects = await prisma.subject.findMany({
      where: filter,
      include: { classSubjects: { include: { class: true, teacher: true } } },
      orderBy: { name: "asc" },
    });
    return success(subjects);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { name } = body;
    if (!name) return error("Required: name");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const subject = await prisma.subject.create({
      data: { schoolId, name, code: body.code, type: body.type || "scholastic" },
    });
    return success(subject, 201);
  });
}
