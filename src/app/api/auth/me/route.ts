import { authenticateRequest } from "@/lib/auth";
import { success, error } from "@/lib/api-utils";

export async function GET(request: Request) {
  const user = await authenticateRequest(request);
  if (!user) return error("Unauthorized", 401);

  return success({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    school: user.school
      ? { id: user.school.id, name: user.school.name, subdomain: user.school.subdomain }
      : null,
  });
}
