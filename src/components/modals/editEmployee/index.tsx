import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Text } from "../../ui";
import { CustomModal } from "../../ui/customModal";

import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { editEmployee } from "../../../http/employee";
import { Company } from "../../../types/company";
import { Employee } from "../../../types/employee";
import { Input } from "../../ui/input";
import { AddressContainer, ModalContent, StyledForm } from "./styles";
import { FormValues, editEmployeeSchema } from "./validations";

interface EditEmployeeModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  currentCompany: Company;
  setCurrentCompany: Dispatch<SetStateAction<Company>>;
  allCompanies: Company[];
  employee: Employee;
}

export const EditEmployeeModal = ({
  isOpen,
  setIsOpen,
  currentCompany,
  allCompanies,
  setCurrentCompany,
  employee,
}: EditEmployeeModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(editEmployeeSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const allEmployees = allCompanies
      .map((company) => company.employees)
      .flat();

    if (
      allEmployees.find((employee) => employee.cpf === data.cpf) &&
      employee.cpf !== data.cpf
    ) {
      toast.error("CPF já cadastrado");
      return;
    }
    try {
      const response = await editEmployee(
        { ...(data as Employee), id: employee.id },
        currentCompany
      );

      setCurrentCompany(response);
      reset();
      toast.success("Funcionário editado com sucesso.");
      setIsOpen();
    } catch (error) {
      toast.error("Erro ao editar funcionário.");
    }
  };

  const onClose = () => {
    reset();
    setIsOpen();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
            );

            setValue("address", response.data.results[0].formatted_address);
          } catch (error) {
            toast.error("Erro ao obter endereço.");
          }
        },

        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não suportada pelo navegador");
    }
  };

  return (
    <CustomModal isOpen={isOpen} setIsOpen={onClose}>
      <ModalContent>
        <Text>Editar funcionário</Text>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <section>
              <Input
                id="name"
                label="Nome:"
                type="text"
                name="name"
                hasErrorMessage={errors.name?.message}
                {...register("name")}
                defaultValue={employee.name}
              />

              <Input
                id="cpf"
                label="CPF:"
                type="text"
                hasErrorMessage={errors.cpf?.message}
                defaultValue={employee.cpf}
                {...register("cpf")}
              />

              <Input
                label="RG:"
                type="text"
                hasErrorMessage={errors.rg?.message}
                defaultValue={employee.rg}
                {...register("rg")}
              />

              <Input
                label="Data de Nascimento:"
                type="date"
                hasErrorMessage={errors.birthdate?.message}
                defaultValue={employee.birthdate}
                {...register("birthdate")}
              />

              <Input
                label="Email:"
                type="email"
                {...register("email")}
                defaultValue={employee.email}
                hasErrorMessage={errors.email?.message}
              />
            </section>

            <section>
              <Input
                label="Telefone:"
                type="text"
                hasErrorMessage={errors.phone_number?.message}
                defaultValue={employee.phone_number}
                {...register("phone_number")}
              />
              <AddressContainer>
                <Input
                  label="Endereço:"
                  type="text"
                  hasErrorMessage={errors.address?.message}
                  defaultValue={employee.address}
                  {...register("address")}
                  onClick={getLocation}
                />
                <Button type="button" onClick={getLocation}>
                  Buscar
                </Button>
              </AddressContainer>

              <Input
                label="Setor:"
                type="text"
                hasErrorMessage={errors.area?.message}
                defaultValue={employee.area}
                {...register("area")}
              />

              <Input
                label="Cargo:"
                type="text"
                hasErrorMessage={errors.role?.message}
                defaultValue={employee.role}
                {...register("role")}
              />
            </section>
          </div>

          <div className="action-buttons">
            <Button type="button" variant="outlined" onClick={onClose}>
              Voltar
            </Button>
            <Button type="submit">Editar</Button>
          </div>
        </StyledForm>
      </ModalContent>
    </CustomModal>
  );
};
