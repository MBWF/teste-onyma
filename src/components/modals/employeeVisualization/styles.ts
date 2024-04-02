import styled from "styled-components";
import colors from "../../../styles/colors";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;

  p {
    font-size: 1.25rem;
  }
`;

export const StyledForm = styled.form`
  width: 600px;

  div {
    width: 100%;
    display: flex;
    gap: 0 1rem;
    margin: 1rem 0;

    section {
      width: 100%;
    }
  }

  .action-buttons {
    display: flex;
    gap: 0 1rem;
    justify-content: flex-end;
  }
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 1rem;
    color: ${colors.darkGray};
  }
  p {
    font-size: 1rem;
    color: ${colors.darkBlue};
  }
`;
