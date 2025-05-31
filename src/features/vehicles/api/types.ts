import { Contact } from "@/features/contacts/api/types";

export const OWNERSHIP_TYPES = [
  "Own outright",
  "Lease",
  "Loan",
  "Other",
] as const;
export type OwnershipType = (typeof OWNERSHIP_TYPES)[number];

export interface Vehicle {
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  plateNumber?: string;
  plateState?: string;
  ownershipType?: OwnershipType;
  purchasePrice?: number;
  purchaseDate?: string;
  value?: number;
  valueDate?: string;
  valueSource?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  gid: string;
  owners: Contact[];
}

export type VehicleOwnerInput = { gid: string };

export interface NewVehicleInput {
  name: string;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  plateNumber?: string;
  plateState?: string;
  ownershipType?: OwnershipType;
  purchasePrice?: number;
  purchaseDate?: string;
  value?: number;
  valueDate?: string;
  valueSource?: string;
  owners: VehicleOwnerInput[];
}
