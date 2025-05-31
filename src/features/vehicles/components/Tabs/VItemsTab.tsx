import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../../api/requests";
import GenericErrorMessage from "@/ui/components/feedback/GenericErrorMessage";
import LPLoader from "@/ui/components/feedback/LPLoader";
import { Box } from "@mui/material";
import VehicleTable from "../VehicleTable";
import { useCallback, useEffect, useRef, useState } from "react";
import { Vehicle } from "../../api/types";
import VehicleDetailCard from "../VehicleDetailedCard";
import EmptyState from "@/ui/components/feedback/EmptyState";
import { useRouter } from "next/navigation";

export default function VItemsTab() {
  const tableRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  const handleSelect = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle((current) =>
      current?.gid === vehicle.gid ? undefined : vehicle
    );
  }, []);

  useEffect(() => {
    if (!selectedVehicle) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideTable = tableRef.current?.contains(target);
      const isInsideDetail = detailRef.current?.contains(target);

      if (!isInsideTable && !isInsideDetail) {
        setSelectedVehicle(undefined);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [selectedVehicle]);

  if (isLoading) return <LPLoader />;
  if (error) return <GenericErrorMessage error={error} onRetry={refetch} />;
  return (
    <div>
      {data && data.length > 0 && (
        <Box display="flex" mt={2} gap={2}>
          <Box flex={1}>
            <div ref={tableRef}>
              <VehicleTable
                vehicles={data}
                selectedVehicle={selectedVehicle}
                onSelect={handleSelect}
              />
            </div>
          </Box>
          {selectedVehicle && (
            <Box ref={detailRef}>
              <VehicleDetailCard
                vehicle={selectedVehicle}
                onEdit={() =>
                  router.push(`/vehicles/form?gid=${selectedVehicle.gid}`)
                }
              />
            </Box>
          )}
        </Box>
      )}
      {!isLoading && !error && data && data.length === 0 && (
        <EmptyState
          title="No vehicles found"
          description="Try adjusting your filters or add a new vehicle."
          primaryAction={{
            label: "+ Add Vehicle",
            onClick: () => console.log("add"),
          }}
          secondaryAction={{
            label: "Try another thing",
            onClick: () => console.log("Try another thing"),
          }}
        />
      )}
    </div>
  );
}
