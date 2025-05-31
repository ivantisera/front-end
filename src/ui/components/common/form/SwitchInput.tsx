import { Controller, useFormContext } from "react-hook-form";
import { Box, Switch, Typography } from "@mui/material";

interface SwitchInputProps {
  name: string;
  label: string;
}

export default function SwitchInput({ name, label }: SwitchInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          py={1}
        >
          <Typography variant="body1">{label}</Typography>
          <Switch
            {...field}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        </Box>
      )}
    />
  );
}
