import { useFormContext, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import FormError from "./primitives/FormError";
import FormControlWrapper from "./primitives/FormControlWrapper";
import FormLabel from "./primitives/FormLabel";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: "▾";
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 16px;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const StyledSelect = styled.select<{ isPlaceholder?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  padding-right: 32px; /* espacio para la flecha */
  border: 1px solid ${({ theme }) => theme.palette.custom.inputBorder};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.custom.inputBackground};
  font-size: 14px;
  color: ${({ isPlaceholder, theme }) =>
    isPlaceholder
      ? theme.palette.custom.inputPlaceholder
      : theme.palette.text.primary};
  transition: border-color 0.2s ease;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.custom.inputBorderFocus};
  }
`;

export interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
}

export default function SelectInput({
  name,
  label,
  options,
  placeholder = "Select...",
}: SelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message?.toString();

  return (
    <FormControlWrapper>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectWrapper>
            <StyledSelect
              id={name}
              {...field}
              aria-invalid={!!error}
              value={field.value ?? ""}
              isPlaceholder={!field.value}
            >
              <option value="">{placeholder}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </StyledSelect>
          </SelectWrapper>
        )}
      />
      <FormError message={error} />
    </FormControlWrapper>
  );
}
