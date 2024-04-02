import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { changeEmployeeStatus, deleteEmployee } from "../../../http/employee";
import { api } from "../../../services/api";
import { Company } from "../../../types/company";
import { Employee } from "../../../types/employee";
import { Card } from "../../card";
import { EditEmployeeModal } from "../../modals/editEmployee";
import { VisualizationEmployeeModal } from "../../modals/employeeVisualization";
import { NotFoundEmployee } from "../../notFound";
import { Container } from "./styles";

import update from "immutability-helper";

interface EmployeeContainerProps {
  setCurrentCompany: Dispatch<SetStateAction<Company>>;
  setAllCompanies: Dispatch<SetStateAction<Company[]>>;
  currentCompany: Company;
  employees: Employee[];
  allCompanies: Company[];
}

type ModalType = {
  visualization: boolean;
  editEmployee: boolean;
};

export function EmployeeContainer({
  employees,
  currentCompany,
  setCurrentCompany,
  setAllCompanies,
  allCompanies,
}: EmployeeContainerProps) {
  const [isModalOpen, setModalIsOpen] = useState<ModalType>({
    visualization: false,
    editEmployee: false,
  });
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteEmployee(id, currentCompany);
      const { data } = await api.get<Company[]>("/companies");

      setAllCompanies(data);
      setCurrentCompany(
        data.find((company) => company.id === currentCompany.id)
      );
      toast.success("Funcionário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar funcionário!");
    }
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      await changeEmployeeStatus(id, currentCompany);
      const { data } = await api.get<Company[]>("/companies");

      setAllCompanies(data);
      setCurrentCompany(
        data.find((company) => company.id === currentCompany.id)
      );
      toast.success("Status alterado com sucesso!");
    } catch (error) {
      toast.success("Erro ao alterar o status.");
    }
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setCurrentCompany((prevCompany: Company) => {
        const updatedEmployees = [...prevCompany.employees];
        const [removedEmployee] = updatedEmployees.splice(dragIndex, 1);
        updatedEmployees.splice(hoverIndex, 0, removedEmployee);
        return { ...prevCompany, employees: updatedEmployees };
      });
    },
    [setCurrentCompany]
  );

  return (
    <Container>
      {currentEmployee && (
        <VisualizationEmployeeModal
          employee={currentEmployee}
          isOpen={isModalOpen.visualization}
          setIsOpen={() =>
            setModalIsOpen((state) => {
              return { ...state, visualization: !state.visualization };
            })
          }
        />
      )}
      {isModalOpen.editEmployee && (
        <EditEmployeeModal
          employee={currentEmployee}
          isOpen={isModalOpen.editEmployee}
          setIsOpen={() =>
            setModalIsOpen((state) => {
              return { ...state, editEmployee: !state.editEmployee };
            })
          }
          currentCompany={currentCompany}
          setCurrentCompany={setCurrentCompany}
          allCompanies={allCompanies}
        />
      )}
      {employees?.length === 0 ? (
        <NotFoundEmployee />
      ) : (
        employees?.map((employee, index) => (
          <Card
            key={employee.id}
            index={index}
            moveCard={moveCard}
            employee={employee}
            onVisualize={() => {
              setCurrentEmployee(employee);
              setModalIsOpen((state) => {
                return { ...state, visualization: true };
              });
            }}
            onDelete={handleDeleteEmployee}
            onChangeStatus={handleUpdateStatus}
            onEditEmployee={() => {
              setCurrentEmployee(employee);
              setModalIsOpen((state) => {
                return { ...state, editEmployee: true };
              });
            }}
          />
        ))
      )}
    </Container>
  );
}
