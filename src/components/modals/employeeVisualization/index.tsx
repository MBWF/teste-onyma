import { Button, Text, Title } from "../../ui";
import { CustomModal } from "../../ui/customModal";

import { Employee } from "../../../types/employee";
import { ModalContent, StyledForm, WrapperInfo } from "./styles";

interface CreateEmployeeModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  employee: Employee;
}

export const VisualizationEmployeeModal = ({
  isOpen,
  setIsOpen,
  employee,
}: CreateEmployeeModalProps) => {
  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <Text>Cadastro de Funcionário</Text>
        <StyledForm>
          <div>
            <section>
              <WrapperInfo>
                <Title>Nome</Title>
                <Text>{employee.name}</Text>
              </WrapperInfo>
              <WrapperInfo>
                <Title>CPF</Title>
                <Text>{employee.cpf}</Text>
              </WrapperInfo>
              <WrapperInfo>
                <Title>RG</Title>
                <Text>{employee.rg}</Text>
              </WrapperInfo>
              <WrapperInfo>
                <Title>Data de nascimento</Title>
                <Text>{employee.birthdate}</Text>
              </WrapperInfo>
              <WrapperInfo>
                <Title>Email</Title>
                <Text>{employee.email}</Text>
              </WrapperInfo>
            </section>

            <section>
              {employee.phone_number && (
                <WrapperInfo>
                  <Title>Telefone</Title>
                  <Text>{employee.phone_number}</Text>
                </WrapperInfo>
              )}
              <WrapperInfo>
                <Title>Endereço</Title>
                <Text>{employee.address}</Text>
              </WrapperInfo>
              <WrapperInfo>
                <Title>Setor</Title>
                <Text>{employee.area}</Text>
              </WrapperInfo>
              <WrapperInfo>
                <Title>Cargo</Title>
                <Text>{employee.role}</Text>
              </WrapperInfo>
            </section>
          </div>

          <div className="action-buttons">
            <Button type="button" variant="outlined" onClick={setIsOpen}>
              Voltar
            </Button>
          </div>
        </StyledForm>
      </ModalContent>
    </CustomModal>
  );
};
