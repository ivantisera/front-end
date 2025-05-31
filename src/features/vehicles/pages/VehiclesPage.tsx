"use client";
import LPPageBase from "@/ui/components/common/LPPageWrapper";
import ClientTabsWrapper from "../components/VehicleTabsWrapper";
import { useRouter } from "next/navigation";

export function VehiclesPageContent() {
  const router = useRouter();

  return (
    <LPPageBase
      title="Vehicles"
      showGeneralHeader={true}
      actionButton={{
        label: "+ Add Vehicle",
        onClick: () => router.push("/vehicles/form"),
        variant: "contained",
        color: "primary",
      }}
    >
      <ClientTabsWrapper />
    </LPPageBase>
  );
}
