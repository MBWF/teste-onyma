import styled, { css } from "styled-components";
import colors from "../../../styles/colors";

interface ButtonProps {
  variant?: "default" | "outlined" | "delete";
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ variant }) => {
    switch (variant) {
      case "outlined":
        return css`
          background-color: transparent;
          color: ${colors.softViolet};
          border: 1px solid ${colors.softViolet};

          &:hover {
            background-color: ${colors.verySoftViolet};
            color: ${colors.white};
          }
        `;
      case "delete":
        return css`
          background-color: red;
          color: ${colors.white};

          &:hover {
            filter: brightness(0.9);
          }
        `;
      default:
        return css`
          background-color: ${colors.softViolet};
          color: ${colors.white};

          &:hover {
            background-color: ${colors.verySoftViolet};
          }
        `;
    }
  }}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(113, 89, 235, 0.5);
  }

  &:disabled {
    background-color: ${colors.lightGray};
    color: ${colors.darkGray};
    border-color: ${colors.lightGray};
    cursor: not-allowed;
  }
`;
