import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "teacher", "accountant", "receptionist"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const search = url.searchParams.get("search") || "";
    const classId = url.searchParams.get("classId");
    const sectionId = url.searchParams.get("sectionId");
    const status = url.searchParams.get("status") || "active";
    const feeStatus = url.searchParams.get("feeStatus");
    const schoolFilter = getSchoolFilter(user);

    const where = {
      ...schoolFilter,
      ...(status && { status }),
      ...(classId && { section: { classId } }),
      ...(sectionId && { sectionId }),
      ...(feeStatus && { feePayments: { some: { status: feeStatus as never } } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { admissionNo: { contains: search, mode: "insensitive" as const } },
          { fatherName: { contains: search, mode: "insensitive" as const } },
          { fatherPhone: { contains: search } },
        ],
      }),
    };

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        include: {
          section: { include: { class: true } },
          parent: true,
        },
        orderBy: { name: "asc" },
        skip,
        take: limit,
      }),
      prisma.student.count({ where }),
    ]);

    return paginated(students, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "receptionist"], async (user) => {
    const body = await request.json();
    const { name, dateOfBirth, gender, fatherName, sectionId, ...rest } = body;

    if (!name || !dateOfBirth || !gender || !fatherName || !sectionId) {
      return error("Required fields: name, dateOfBirth, gender, fatherName, sectionId");
    }

    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    // Auto-generate admission number
    const count = await prisma.student.count({ where: { schoolId } });
    const year = new Date().getFullYear().toString().slice(-2);
    const admissionNo = `${year}${String(count + 1).padStart(4, "0")}`;

    // Create parent if phone provided
    let parentId: string | undefined;
    if (body.fatherPhone) {
      const existingParent = await prisma.parent.findFirst({
        where: { schoolId, phone: body.fatherPhone },
      });
      if (existingParent) {
        parentId = existingParent.id;
      } else {
        const parent = await prisma.parent.create({
          data: {
            schoolId,
            name: fatherName,
            phone: body.fatherPhone,
            email: body.fatherEmail,
          },
        });
        parentId = parent.id;
      }
    }

    const student = await prisma.student.create({
      data: {
        schoolId,
        admissionNo,
        name,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        fatherName,
        sectionId,
        parentId,
        ...rest,
        fatherPhone: body.fatherPhone,
        fatherEmail: body.fatherEmail,
        motherName: body.motherName,
        motherPhone: body.motherPhone,
      },
      include: { section: { include: { class: true } }, parent: true },
    });

    return success(student, 201);
  });
}
