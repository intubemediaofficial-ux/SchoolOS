import { prisma } from "@/lib/db";
import { success, error, withAuth } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const settings = await prisma.platformSetting.findMany();
    const settingsMap: Record<string, unknown> = {};
    for (const s of settings) {
      settingsMap[s.key] = s.value;
    }
    return success(settingsMap);
  });
}

export async function PUT(request: Request) {
  return withAuth(request, ["super_admin"], async () => {
    const body = await request.json();
    const { key, value } = body;
    if (!key) return error("Required: key");

    const setting = await prisma.platformSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return success(setting);
  });
}
