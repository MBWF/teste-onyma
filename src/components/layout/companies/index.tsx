import { Dispatch, SetStateAction } from "react";
import { Company } from "../../../types/company";
import { Select, Text } from "../../ui";
import { Container } from "./styles";

type CompaniesProps = {
  allCompanies: Company[];
  setCurrentCompany: Dispatch<SetStateAction<Company>>;
};

export function Companies({ setCurrentCompany, allCompanies }: CompaniesProps) {
  return (
    <>
      <Container>
        <Text>Selecione a empresa</Text>
        <Select
          onChange={(e) =>
            setCurrentCompany(
              allCompanies.find((company) => company.id === e.target.value)
            )
          }
          options={[
            {
              label: "Bencorp",
              value: "bencorp",
            },
            {
              label: "Onyma",
              value: "onyma",
            },
          ]}
        />
      </Container>
    </>
  );
}
