"use client";

import { Box, Button, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "../schemas/contactSchema";
import TextInput from "@/ui/components/common/form/TextInput";
import SelectInput from "@/ui/components/common/form/SelectInput";
import { US_STATES as usStates } from "@/constants/usStates";
import SwitchInput from "@/ui/components/common/form/SwitchInput";
import { createContact } from "../api/requests";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import GenericErrorMessage from "@/ui/components/feedback/GenericErrorMessage";
import { Contact } from "../api/types";
import FormSection from "@/ui/components/common/form/FormSection";
import FormRowTwoColumns from "@/ui/components/common/form/FormRowTwoColumns";

interface ContactFormProps {
  defaultValues?: Partial<ContactFormValues>;
  onSuccess: (created: Contact) => void;
  onCancel: () => void;
}

export default function ContactForm({
  defaultValues,
  onSuccess,
  onCancel,
}: ContactFormProps) {
  const [genericError, setGenericError] = useState<Error | AxiosError | null>(
    null
  );

  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      isCompany: false,
      contactInCaseOfDeath: false,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const firstName = methods.watch("firstName");
  const lastName = methods.watch("lastName");

  useEffect(() => {
    if (firstName || lastName) {
      const auto = `${firstName?.trim().charAt(0) ?? ""}${
        lastName?.trim().charAt(0) ?? ""
      }`.toUpperCase();
      methods.setValue("initials", auto, { shouldDirty: false });
    }
  }, [firstName, lastName, methods]);

  const onValid = async (values: ContactFormValues) => {
    try {
      setGenericError(null);
      const newContact = await createContact(values);
      onSuccess(newContact);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setGenericError(err);
      } else {
        setGenericError(new Error("Unknown error occurred"));
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Stack spacing={2}>
        <FormSection title="Contact details">
          <SwitchInput name="isCompany" label="Is Company Contact" />
          <TextInput
            name="firstName"
            label="First Name"
            placeholder="e.g. Sarah"
          />
          <TextInput
            name="lastName"
            label="Last Name"
            placeholder="e.g. Johnson"
          />
          <TextInput name="initials" label="Initials" placeholder="e.g. SJ" />
          <TextInput
            name="company"
            label="Company"
            placeholder="e.g. Microsoft"
          />
          <TextInput
            name="phone"
            label="Phone"
            placeholder="e.g. +1 555-345-6789"
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="e.g. sarah.johnson@example.com"
          />
          <TextInput name="role" label="Role" placeholder="e.g. Accountant" />
          <SwitchInput
            name="contactInCaseOfDeath"
            label="Contact in Case of Death"
          />
        </FormSection>
        <FormSection title="Address">
          <TextInput
            name="street"
            label="Street"
            placeholder="e.g. 5th Avenue"
          />
          <TextInput name="city" label="City" placeholder="e.g. New York" />
          <FormRowTwoColumns>
            <SelectInput name="state" label="State" options={usStates} />
            <TextInput
              name="zipCode"
              label="Zip Code"
              placeholder="e.g. 10016"
            />
          </FormRowTwoColumns>
        </FormSection>

        {genericError && <GenericErrorMessage error={genericError} />}

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            onClick={onCancel}
            disabled={isSubmitting}
            variant="outlined"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onValid)}
            disabled={isSubmitting}
            variant="contained"
          >
            Save Contact
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}
