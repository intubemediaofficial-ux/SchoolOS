import { students } from "@/lib/mock-data";

export async function GET() {
  return Response.json({ success: true, data: students, total: students.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newStudent = {
    id: String(students.length + 1),
    admissionNo: `2024${String(students.length + 1).padStart(3, "0")}`,
    ...body,
    status: "active" as const,
    admissionDate: new Date().toISOString().split("T")[0],
    feeStatus: "pending" as const,
    attendancePercent: 0,
  };

  return Response.json({
    success: true,
    data: newStudent,
    message: "Student added successfully",
  });
}
