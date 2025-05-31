import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import FormControlWrapper from "./primitives/FormControlWrapper";
import FormLabel from "./primitives/FormLabel";
import FormError from "./primitives/FormError";
import { InputHTMLAttributes } from "react";

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const CurrencyInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 32px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.palette.custom.inputBorder};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.custom.inputBackground};
  color: ${({ theme }) => theme.palette.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.custom.inputBorderFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.custom.inputPlaceholder};
  }
`;

const DollarSign = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export default function CurrencyInput({
  name,
  label,
  ...rest
}: CurrencyInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControlWrapper>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <CurrencyInputWrapper>
        <DollarSign>$</DollarSign>
        <StyledInput
          id={name}
          type="number"
          step="any"
          {...register(name, {
            setValueAs: (v) => {
              const num = parseFloat(v);
              return isNaN(num) ? undefined : num;
            },
          })}
          {...rest}
        />
      </CurrencyInputWrapper>
      <FormError message={errors[name]?.message?.toString()} />
    </FormControlWrapper>
  );
}
