import { prisma } from "@/lib/db";
import { success, error, paginated, getPaginationParams, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "librarian", "teacher", "student"], async (user) => {
    const url = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(url);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category");
    const filter = getSchoolFilter(user);

    const where = {
      ...filter,
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { author: { contains: search, mode: "insensitive" as const } },
          { isbn: { contains: search } },
        ],
      }),
    };

    const [books, total] = await Promise.all([
      prisma.book.findMany({ where, orderBy: { title: "asc" }, skip, take: limit }),
      prisma.book.count({ where }),
    ]);
    return paginated(books, total, page, limit);
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "librarian"], async (user) => {
    const body = await request.json();
    const { title, author, category } = body;
    if (!title || !author || !category) return error("Required: title, author, category");
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    const book = await prisma.book.create({
      data: { schoolId, title, author, category, ...body },
    });
    return success(book, 201);
  });
}
