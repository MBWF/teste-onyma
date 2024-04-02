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
  cursor: grab;

  .infos {
    display: flex;
    flex-direction: column;
    max-width: 150px;
    gap: 0.5rem;
    h1 {
      font-size: 1.25rem;
      width: 100%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      white-space: nowrap;
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  gap: 1rem;
  margin-top: 1rem;

  .status-button {
    width: 100px;
  }
`;
