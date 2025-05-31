import styled from "@emotion/styled";

const SearchInputStyled = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.palette.custom.inputBorder};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.custom.inputBackground};
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.palette.custom.inputPlaceholder};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.custom.inputBorderFocus};
  }
`;

type SearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <SearchInputStyled
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
