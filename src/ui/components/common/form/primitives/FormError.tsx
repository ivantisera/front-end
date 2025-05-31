import styled from "@emotion/styled";

const StyledError = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
`;

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return <StyledError>{message}</StyledError>;
}
