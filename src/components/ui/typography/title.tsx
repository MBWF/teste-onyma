import styled from "styled-components";
import colors from "../../../styles/colors";

export const StyledTitle = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: ${colors.darkBlue};
`;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Title({ children, ...props }: TitleProps) {
  return <StyledTitle {...props}>{children}</StyledTitle>;
}
