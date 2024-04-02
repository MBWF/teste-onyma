import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InputField = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${colors.darkGray};
  }

  &:focus {
    border-color: ${colors.strongCyan};
  }
`;
