import { api } from "../services/api";
import { Company } from "../types/company";
import { Employee } from "../types/employee";

export async function getEmployees() {
  const response = await api.get<Employee[]>("/employees");

  return response.data;
}

export async function createNewEmployee(
  newEmployee: Employee,
  company: Company
) {
  const body = {
    ...company,
    employees: [...company.employees, newEmployee],
  };
  const response = await api.put<Company>(`/companies/${company.id}`, {
    ...body,
  });

  return response.data;
}

export async function editEmployee(editedEmployee: Employee, company: Company) {
  const newEmployee = company.employees.map((employeeItem) => {
    if (employeeItem.id === editedEmployee.id) {
      return editedEmployee;
    }
    return employeeItem;
  });

  const response = await api.put(`/companies/${company.id}`, {
    ...company,
    employees: newEmployee,
  });

  return response.data;
}

export async function deleteEmployee(employeeId: string, company: Company) {
  const deletedEmployee = company.employees.filter(
    (employee) => employee.id !== employeeId
  );

  const response = await api.put(`/companies/${company.id}`, {
    ...company,
    employees: deletedEmployee,
  });

  return response.data;
}

export async function changeEmployeeStatus(
  employeeId: string,
  company: Company
) {
  const response = await api.put(`/companies/${company.id}`, {
    ...company,
    employees: company.employees.map((employee) => {
      if (employee.id === employeeId) {
        return {
          ...employee,
          status: !employee.status,
        };
      }
      return employee;
    }),
  });

  return response.data;
}
