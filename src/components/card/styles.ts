import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
  width: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  background-color: ${colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;

  .infos {
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 1.25rem;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;
