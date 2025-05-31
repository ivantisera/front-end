import VehicleFormPageWrapper from "@/features/vehicles/pages/VehicleFormPageWrapper";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VehicleFormPageWrapper />
    </Suspense>
  );
}
