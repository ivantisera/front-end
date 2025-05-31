import styled from "@emotion/styled";

const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 2px;
  display: block;
`;

export default FormLabel;
