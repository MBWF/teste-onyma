import type { Identifier, XYCoord } from "dnd-core";
import { FaTrash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";

import { Employee } from "../../types/employee";
import { Button, Text, Title } from "../ui";
import { ActionsContainer, Container } from "./styles";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  employee: Employee;
  onVisualize: () => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string) => void;
  onEditEmployee: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export function Card({
  employee,
  onVisualize,
  onDelete,
  onChangeStatus,
  onEditEmployee,
  id,
  index,
  moveCard,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Container ref={ref} style={{ opacity }} data-handler-id={handlerId}>
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
        <Button
          onClick={() => onChangeStatus(employee.id)}
          type="button"
          className="status-button"
        >
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
