import { IoMdEye } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import { Button, Text, Title } from "../ui";
import { ActionsContainer, Container } from "./styles";
import { Employee } from "../../types/employee";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  employee: Employee;
  onVisualize: () => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string) => void;
  onEditEmployee: () => void;
}

export function Card({
  employee,
  onVisualize,
  onDelete,
  onChangeStatus,
  onEditEmployee,
}: CardProps) {
  return (
    <Container>
      <div className="infos">
        <Title>{employee.name}</Title>
        <Text>{employee.role}</Text>
      </div>
      <ActionsContainer>
        <Button variant="outlined" type="button" onClick={onVisualize}>
          <IoMdEye size={16} />
        </Button>
        <Button variant="outlined" type="button" onClick={onEditEmployee}>
          <MdModeEditOutline size={16} />
        </Button>
        <Button onClick={() => onChangeStatus(employee.id)} type="button">
          {employee.status ? "Ativo" : "Desativo"}
        </Button>
        <Button
          variant="delete"
          type="button"
          onClick={() => onDelete(employee.id)}
        >
          <FaTrash size={16} />
        </Button>
      </ActionsContainer>
    </Container>
  );
}
