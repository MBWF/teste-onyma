import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Text } from "../../ui";
import { CustomModal } from "../../ui/customModal";

import axios from "axios";
import { Dispatch, SetStateAction, useRef } from "react";
import { toast } from "react-toastify";
import { createNewEmployee } from "../../../http/employee";
import { Company } from "../../../types/company";
import { Employee } from "../../../types/employee";
import { Input } from "../../ui/input";
import { AddressContainer, ModalContent, StyledForm } from "./styles";
import { FormValues, createEmployeeSchema } from "./validations";
import { cpfMask, telMask } from "../../../utils/inputMasks";

interface CreateEmployeeModalProps {
  isOpen: boolean;
  currentCompany: Company;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentCompany: Dispatch<SetStateAction<Company>>;
  allCompanies: Company[];
}

export const CreateEmployeeModal = ({
  isOpen,
  setIsOpen,
  currentCompany,
  allCompanies,
  setCurrentCompany,
}: CreateEmployeeModalProps) => {
  const telInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(createEmployeeSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const allEmployees = allCompanies
      .map((company) => company.employees)
      .flat();

    if (allEmployees.find((employee) => employee.cpf === data.cpf)) {
      toast.error("CPF já cadastrado");
      return;
    }
    try {
      const response = await createNewEmployee(
        {
          ...(data as Employee),
          id: Math.floor(Math.random() * 100).toString(),
          status: true,
        },
        currentCompany
      );

      setCurrentCompany(response);
      reset();
      toast.success("Funcionário cadastrado com sucesso");
      setIsOpen(false);
    } catch (error) {
      toast.error("Erro ao criar novo funcionário.");
    }
  };

  const onClose = () => {
    reset();
    setIsOpen(false);
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
        <Text data-testid="modal-title">Cadastro de Funcionário</Text>
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
              />

              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="CPF:"
                    hasErrorMessage={errors.cpf?.message}
                    type="text"
                    onChange={(e) => {
                      field.onChange(cpfMask(e.target.value));
                    }}
                  />
                )}
              />

              <Input
                label="RG:"
                type="text"
                hasErrorMessage={errors.rg?.message}
                {...register("rg")}
              />

              <Input
                label="Data de Nascimento:"
                type="date"
                hasErrorMessage={errors.birthdate?.message}
                {...register("birthdate")}
              />

              <Input
                label="Email:"
                type="email"
                {...register("email")}
                hasErrorMessage={errors.email?.message}
              />
            </section>

            <section>
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Telefone:"
                    hasErrorMessage={errors.phone_number?.message}
                    type="text"
                    onChange={(e) => {
                      field.onChange(telMask(e.target.value));
                    }}
                  />
                )}
              />
              <AddressContainer>
                <Input
                  label="Endereço:"
                  type="text"
                  hasErrorMessage={errors.address?.message}
                  {...register("address")}
                  onClick={getLocation}
                />
                <Button
                  type="button"
                  onClick={getLocation}
                  data-testid="search-loc-button"
                >
                  Buscar
                </Button>
              </AddressContainer>

              <Input
                label="Setor:"
                type="text"
                hasErrorMessage={errors.area?.message}
                {...register("area")}
              />

              <Input
                label="Cargo:"
                type="text"
                hasErrorMessage={errors.role?.message}
                {...register("role")}
              />
            </section>
          </div>

          <div className="action-buttons">
            <Button type="button" variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </div>
        </StyledForm>
      </ModalContent>
    </CustomModal>
  );
};
