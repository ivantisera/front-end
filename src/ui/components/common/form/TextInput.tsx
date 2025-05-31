import { useFormContext, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import FormControlWrapper from "./primitives/FormControlWrapper";
import FormLabel from "./primitives/FormLabel";
import FormError from "./primitives/FormError";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.palette.custom.inputBorder};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.custom.inputBackground};
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.primary};
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.palette.custom.inputPlaceholder};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.custom.inputBorderFocus};
  }
`;

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

export default function TextInput({
  name,
  label,
  placeholder,
}: TextInputProps) {
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
          <StyledInput
            id={name}
            {...field}
            placeholder={placeholder}
            value={field.value ?? ""}
          />
        )}
      />
      <FormError message={error} />
    </FormControlWrapper>
  );
}
