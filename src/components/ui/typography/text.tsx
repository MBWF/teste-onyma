import styled from "styled-components";
import colors from "../../../styles/colors";

const Styledtext = styled.p`
  font-weight: 500;
  color: ${colors.darkBlue};
`;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Text({ children, ...props }: TitleProps) {
  return <Styledtext {...props}>{children}</Styledtext>;
}
