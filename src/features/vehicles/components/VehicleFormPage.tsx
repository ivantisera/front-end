"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  createVehicle,
  getVehicleByGid,
  updateVehicle,
} from "@/features/vehicles/api/requests";
import { VehicleFormValues } from "@/features/vehicles/schemas/vehicleSchema";
import VehicleForm from "@/features/vehicles/components/VehicleForm";
import LPPageBase from "@/ui/components/common/LPPageWrapper";
import { normalizeEmptyStringsToNull, removeNulls } from "@/utils/strings";
import { AxiosError } from "axios";
import { NewVehicleInput } from "@/features/vehicles/api/types";
import { useState } from "react";
import GenericErrorMessage from "@/ui/components/feedback/GenericErrorMessage";

export default function VehicleFormPage() {
  const router = useRouter();
  const [genericError, setGenericError] = useState<Error | AxiosError | null>(
    null
  );
  const searchParams = useSearchParams();
  const gid = searchParams.get("gid") || undefined;

  const { data, isLoading, error } = useQuery<VehicleFormValues>({
    queryKey: ["vehicle", gid],
    queryFn: async () => {
      const raw = await getVehicleByGid(gid!);
      return {
        ...raw,
        year: raw.year?.toString(),
      };
    },
    enabled: !!gid,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });

  const handleSubmit = async (values: VehicleFormValues) => {
    const isEditing = Boolean(gid);
    const cleanedValues = normalizeEmptyStringsToNull(values);

    const payload: NewVehicleInput = {
      ...cleanedValues,
      year: cleanedValues.year ? Number(cleanedValues.year) : undefined,
      owners: cleanedValues.owners.map((c) => ({ gid: c.gid })),
    };

    try {
      setGenericError(null);
      if (isEditing) {
        await updateVehicle(gid!, payload);
      } else {
        await createVehicle(payload);
      }
      router.push("/vehicles");
    } catch (err: unknown) {
      setGenericError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  return (
    <LPPageBase
      title={gid ? "Edit Vehicle" : "New Vehicle"}
      subtitle="Please fill out the form below with details about your vehicle."
      showBack
      onBack={() => router.push("/vehicles")}
      loading={isLoading}
      error={error?.message}
      withHorizontalPadding={true}
    >
      {genericError && <GenericErrorMessage error={genericError} />}
      {(!gid || (!isLoading && data)) && (
        <VehicleForm
          defaultValues={gid ? removeNulls(data!) : undefined}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/vehicles")}
          key={gid || "new"}
        />
      )}
    </LPPageBase>
  );
}
