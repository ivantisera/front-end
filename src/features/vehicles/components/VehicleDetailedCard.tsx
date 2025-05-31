import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { Vehicle } from "@/features/vehicles/api/types";
import LPPersonAvatar from "@/ui/components/common/LPPersonAvatar";
import { useTheme } from "@mui/material";

type Props = {
  vehicle: Vehicle;
  onEdit?: () => void;
};

export default function VehicleDetailCard({ vehicle, onEdit }: Props) {
  const theme = useTheme();
  const readableMap: Record<string, string> = {
    make: "Make",
    model: "Model",
    plateState: "License state",
    plateNumber: "License number",
    vin: "VIN",
    year: "Production year",
    ownershipType: "Ownership type",
    purchasePrice: "Purchase price",
    purchaseDate: "Purchase date",
    value: "Value",
    valueDate: "Valuation date",
    valueSource: "Valuation source",
  };

  const formattedEntries = Object.entries(vehicle)
    .filter(
      ([key, value]) =>
        key !== "owners" &&
        key !== "name" &&
        key !== "gid" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        value !== null &&
        value !== undefined
    )
    .map(([key, value]) => {
      const label = readableMap[key] ?? key;
      const isDate = key.toLowerCase().includes("date");

      const formattedValue =
        typeof value === "number" &&
        (key === "value" || key === "purchasePrice")
          ? `$${value.toLocaleString()}`
          : isDate
          ? new Date(value).toLocaleDateString("en-US")
          : value;

      return { label, value: formattedValue };
    });

  return (
    <Card
      sx={{
        border: `2px solid ${theme.palette.custom.cardBorder}`,
        borderRadius: 1,
        p: 2,
        width: 320,
      }}
    >
      <Typography variant="h1" fontWeight={600} mb={1} fontSize={16}>
        {vehicle.name}
      </Typography>

      {formattedEntries.length > 0 && <Divider />}

      <Stack spacing={1} mt={2}>
        {formattedEntries.map((entry) => (
          <Box key={entry.label}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              {entry.label}
            </Typography>
            <Typography variant="body2" fontWeight={400}>
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Stack>

      {formattedEntries.length > 0 && <Divider sx={{ my: 2 }} />}

      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <Typography variant="caption" fontWeight={500}>
          Owner
        </Typography>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "red",
          }}
        />
      </Box>

      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {vehicle.owners.map((owner) => (
          <LPPersonAvatar
            key={owner.gid}
            gid={owner.gid}
            firstName={owner.firstName}
            lastName={owner.lastName}
            initials={owner.initials}
            imageUrl={owner.imageUrl}
            showName={true}
          />
        ))}
      </Box>

      <Button
        variant="outlined"
        fullWidth
        size="small"
        startIcon={<span style={{ fontSize: 16 }}>✎</span>}
        onClick={onEdit}
      >
        Edit...
      </Button>
    </Card>
  );
}
