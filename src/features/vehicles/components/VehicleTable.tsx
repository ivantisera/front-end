import LPGenericTable, { Column } from "@/ui/components/common/LPGenericTable";
import { Vehicle } from "../api/types";
import { AvatarGroup, Box, Typography } from "@mui/material";
import LPPersonAvatar from "@/ui/components/common/LPPersonAvatar";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

type VehicleTableProps = {
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
};

export default function VehicleTable({
  vehicles,
  selectedVehicle,
  onSelect,
}: VehicleTableProps) {
  const columns: Column<Vehicle>[] = [
    {
      label: "Name",
      render: (v) => (
        <Box display="flex" alignItems="center" gap={1}>
          <DirectionsCarFilledOutlinedIcon />
          <Typography variant="body2" fontWeight={500}>
            {v.name}
          </Typography>
        </Box>
      ),
    },
    {
      label: "Make and Model",
      render: (v) => (
        <Typography variant="body2" color="text.secondary">
          {v.year} {v.make} {v.model}
        </Typography>
      ),
    },
    {
      label: "License Plate",
      render: (v) => (
        <Typography variant="body2">
          {v.plateState} {v.plateNumber}
        </Typography>
      ),
    },
    {
      label: "VIN",
      render: (v) => (
        <Typography variant="body2" fontFamily="monospace">
          {v.vin}
        </Typography>
      ),
    },
    {
      label: "Owner",
      render: (v) => (
        <Box display="flex" gap={0.5} alignItems="center">
          <AvatarGroup
            max={2}
            componentsProps={{
              additionalAvatar: {
                sx: {
                  width: 30,
                  height: 30,
                  fontSize: 12,
                },
              },
            }}
          >
            {v.owners.map((o) => {
              return (
                <LPPersonAvatar
                  key={o.gid}
                  gid={o.gid}
                  firstName={o.firstName}
                  lastName={o.lastName}
                  initials={o.initials}
                  imageUrl={o.imageUrl}
                />
              );
            })}
          </AvatarGroup>
        </Box>
      ),
    },
  ];

  return (
    <LPGenericTable
      data={vehicles}
      selected={selectedVehicle}
      onRowClick={onSelect}
      columns={columns}
    />
  );
}
