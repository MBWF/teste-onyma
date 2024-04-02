import { Company } from "./company";

export type Employee = {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthdate: string;
  email?: string;
  phone_number?: string;
  address: string;
  company: Company;
  status: boolean;
  area: string;
  role: string;
};
