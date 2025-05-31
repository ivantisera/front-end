"use client";
import { Box, Button } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRef, useState } from "react";
import { Contact } from "@/features/contacts/api/types";
import FormControlWrapper from "./primitives/FormControlWrapper";
import FormError from "./primitives/FormError";
import ContactCard from "../ContactCard";
import { VehicleFormValues } from "@/features/vehicles/schemas/vehicleSchema";
import ContactPicker from "@/features/contacts/components/ContactPicker";

export default function OwnersField() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext<VehicleFormValues>();

  const { fields, append, remove } = useFieldArray<VehicleFormValues, "owners">(
    {
      control,
      name: "owners",
    }
  );

  const selectedGids = fields.map((f) => f.gid);

  const handleAddOwners = (contacts: Contact[]) => {
    const newContacts = contacts.filter((c) => !selectedGids.includes(c.gid));
    newContacts.forEach((c) => append(c));
    setPickerOpen(false);
  };

  return (
    <FormControlWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {fields.length === 0 && (
          <Button
            ref={openButtonRef}
            startIcon={<Person2OutlinedIcon />}
            size="small"
            color="primary"
            onClick={() => {
              setPickerOpen(true);
            }}
          >
            Add Owners
          </Button>
        )}
      </Box>

      <Box mt={1} display="flex" gap={1} flexWrap="wrap">
        {fields.map((field, index) => (
          <Box key={field.id} position="relative">
            <ContactCard
              contact={field as unknown as Contact}
              onRemove={() => remove(index)}
            />
          </Box>
        ))}
      </Box>
      {fields.length > 0 && (
        <Box display={"flex"} justifyContent="flex-end" mt={1}>
          <Button
            startIcon={<AddOutlinedIcon />}
            size="small"
            color="primary"
            onClick={() => {
              setPickerOpen(true);
            }}
          >
            Add More
          </Button>
        </Box>
      )}

      <FormError message={errors.owners?.message?.toString()} />

      <ContactPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        excludedGids={selectedGids}
        onConfirm={handleAddOwners}
      />
    </FormControlWrapper>
  );
}
