import styled from "styled-components";

const StyledSpan = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: red;
`;

interface ErrorMessageProps {
  text: string;
}

export function ErrorMessage({ text }: ErrorMessageProps) {
  return <StyledSpan>{text}</StyledSpan>;
}
