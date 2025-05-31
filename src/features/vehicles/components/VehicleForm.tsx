import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VehicleFormValues,
  vehicleSchema,
} from "@/features/vehicles/schemas/vehicleSchema";
import { Box, Button, Stack } from "@mui/material";
import { US_STATES as usStates } from "@/constants/usStates";
import { PRODUCTION_YEARS as productionYears } from "@/constants/years";
import { ownershipTypes } from "@/constants/ownershipTypes";
import OwnersField from "@/ui/components/common/form/OwnersField";
import TextInput from "@/ui/components/common/form/TextInput";
import SelectInput from "@/ui/components/common/form/SelectInput";
import CurrencyInput from "@/ui/components/common/form/CurrencyInput";
import DateInput from "@/ui/components/common/form/DateInput";
import FormSection from "@/ui/components/common/form/FormSection";
import FormRowTwoColumns from "@/ui/components/common/form/FormRowTwoColumns";
import { z } from "zod";

interface VehicleFormProps {
  defaultValues?: VehicleFormValues;
  onSubmit: (values: VehicleFormValues) => void;
  onCancel: () => void;
}

export default function VehicleForm({
  defaultValues,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const normalizedDefaults = defaultValues
    ? {
        ...defaultValues,
        year: defaultValues.year?.toString(),
      }
    : undefined;
  const methods = useForm<z.input<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: normalizedDefaults,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormSection title="Details">
            <TextInput
              name="name"
              label="Name"
              placeholder="e.g. Melissa's Honda"
            />
            <TextInput name="make" label="Make" placeholder="e.g. Honda" />
            <TextInput name="model" label="Model" placeholder="e.g. Accord" />
            <FormRowTwoColumns>
              <SelectInput
                name="plateState"
                label="License Plate State"
                placeholder="Select state..."
                options={usStates}
              />
              <TextInput
                name="plateNumber"
                label="License Plate Number"
                placeholder="e.g. ABC1234"
              />
            </FormRowTwoColumns>
            <FormRowTwoColumns>
              <TextInput
                name="vin"
                label="VIN"
                placeholder="e.g. 1HGMFR3KSJRKSE424J"
              />
              <SelectInput
                name="year"
                label="Production Year"
                options={productionYears}
                placeholder="Select year..."
              />
            </FormRowTwoColumns>
          </FormSection>

          <FormSection title="Valuation">
            <SelectInput
              name="ownershipType"
              label="Ownership Type"
              options={ownershipTypes}
              placeholder="Select ownership type..."
            />
            <FormRowTwoColumns>
              <CurrencyInput
                name="purchasePrice"
                label="Purchase Price"
                placeholder="0.00"
              />
              <DateInput name="purchaseDate" label="Purchase Date" />
            </FormRowTwoColumns>
            <FormRowTwoColumns>
              <CurrencyInput name="value" label="Value" placeholder="0.00" />
              <DateInput name="valueDate" label="Valuation Date" />
            </FormRowTwoColumns>
            <TextInput
              name="valueSource"
              label="Valuation Source"
              placeholder="e.g. Kelley Blue Book"
            />
          </FormSection>

          <FormSection title="Owners" subtitle="(required)">
            <OwnersField />
          </FormSection>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Save Vehicle
            </Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  );
}
