import styled from "styled-components";
import colors from "../../../styles/colors";

export const StyledSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  outline: none;
  background-color: ${colors.white};
  width: 100%;
  cursor: pointer;

  &:hover {
    border-color: ${colors.darkGray};
  }

  &:focus {
    border-color: ${colors.veryDarkGray};
  }
`;
