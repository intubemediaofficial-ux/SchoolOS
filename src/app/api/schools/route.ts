import { schools } from "@/lib/mock-data";

export async function GET() {
  return Response.json({ success: true, data: schools, total: schools.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newSchool = {
    id: String(schools.length + 1),
    ...body,
    subdomain: body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    subscription: body.plan || "starter",
    subscriptionStatus: "trial" as const,
    studentCount: 0,
    teacherCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
    isActive: true,
  };

  return Response.json({
    success: true,
    data: newSchool,
    message: "School registered successfully",
    subdomain: newSchool.subdomain + ".schoolos.in",
  });
}
