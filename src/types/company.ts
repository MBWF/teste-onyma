import { Employee } from "./employee";

export type Company = {
  id: string;
  name: string;
  employees: Employee[];
};
