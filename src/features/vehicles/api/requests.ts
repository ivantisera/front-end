import api from "@/lib/api";
import { VEHICLES_ENDPOINTS } from "./endpoints";
import { NewVehicleInput, Vehicle } from "./types";

export async function getVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get(VEHICLES_ENDPOINTS.list);
  return data;
}

export async function getVehicleByGid(gid: string): Promise<Vehicle> {
  const { data } = await api.get(VEHICLES_ENDPOINTS.detail(gid));
  return data;
}

export async function createVehicle(data: NewVehicleInput): Promise<Vehicle> {
  const { data: vehicle } = await api.post(VEHICLES_ENDPOINTS.create, data);
  return vehicle;
}

export async function updateVehicle(
  gid: string,
  data: NewVehicleInput
): Promise<Vehicle> {
  const { data: vehicle } = await api.patch(
    VEHICLES_ENDPOINTS.update(gid),
    data
  );
  return vehicle;
}

export async function deleteVehicle(gid: string): Promise<void> {
  await api.delete(VEHICLES_ENDPOINTS.delete(gid));
}
