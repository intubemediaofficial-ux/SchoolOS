import { prisma } from "@/lib/db";
import { success, error, withAuth, getSchoolFilter } from "@/lib/api-utils";

export async function GET(request: Request) {
  return withAuth(request, ["super_admin", "school_admin", "driver"], async (user) => {
    const filter = getSchoolFilter(user);
    const [vehicles, routes] = await Promise.all([
      prisma.vehicle.findMany({ where: filter, include: { routes: { include: { _count: { select: { students: true } } } } }, orderBy: { vehicleNo: "asc" } }),
      prisma.transportRoute.findMany({ where: filter, include: { vehicle: true, _count: { select: { students: true } } }, orderBy: { name: "asc" } }),
    ]);
    return success({ vehicles, routes });
  });
}

export async function POST(request: Request) {
  return withAuth(request, ["super_admin", "school_admin"], async (user) => {
    const body = await request.json();
    const { type } = body; // "vehicle" or "route"
    const schoolId = user.schoolId;
    if (!schoolId) return error("No school associated", 403);

    if (type === "vehicle") {
      const { vehicleNo, capacity, driverName, driverPhone } = body;
      if (!vehicleNo || !capacity || !driverName || !driverPhone) return error("Required: vehicleNo, capacity, driverName, driverPhone");
      const vehicle = await prisma.vehicle.create({ data: { schoolId, vehicleNo, capacity, driverName, driverPhone, type: body.vehicleType || "bus" } });
      return success(vehicle, 201);
    }

    if (type === "route") {
      const { name, vehicleId, stops, fare } = body;
      if (!name || !vehicleId || !fare) return error("Required: name, vehicleId, fare");
      const route = await prisma.transportRoute.create({ data: { schoolId, name, vehicleId, stops: stops || [], fare } });
      return success(route, 201);
    }

    return error("type must be 'vehicle' or 'route'");
  });
}
