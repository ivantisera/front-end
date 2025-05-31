import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormControlWrapper from "./primitives/FormControlWrapper";
import FormLabel from "./primitives/FormLabel";
import FormError from "./primitives/FormError";

interface DateInputProps {
  name: string;
  label: string;
  minDate?: Date;
  maxDate?: Date;
}

export default function DateInput({
  name,
  label,
  minDate,
  maxDate,
}: DateInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControlWrapper>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              const iso = date?.toISOString().split("T")[0];
              field.onChange(iso);
            }}
            format="MM/DD/YYYY"
            slotProps={{
              textField: {
                placeholder: "Select date...",
                fullWidth: true,
                variant: "outlined",
                error: !!errors[name],
                sx: {
                  "& .MuiInputBase-root": {
                    height: 40,
                    fontSize: "14px",
                    borderRadius: "8px",
                    backgroundColor: (theme) =>
                      theme.palette.custom.inputBackground,
                    "& input": {
                      padding: "10px 12px",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: (theme) =>
                      theme.palette.custom.inputBorder || theme.palette.divider,
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: (theme) =>
                        theme.palette.custom.inputBorderFocus ||
                        theme.palette.primary.main,
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                },
                InputProps: {
                  sx: {
                    height: 40,
                    minHeight: 40,
                    bgColor: "background.paper",
                    borderRadius: "8px",
                  },
                },
              },
            }}
            minDate={minDate ? dayjs(minDate) : undefined}
            maxDate={maxDate ? dayjs(maxDate) : undefined}
          />
        )}
      />
      <FormError message={errors[name]?.message?.toString()} />
    </FormControlWrapper>
  );
}
