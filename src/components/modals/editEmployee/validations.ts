import { z } from "zod";

export const editEmployeeSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório.",
      })
      .min(3, "O nome deve ter no mínimo 3 caracteres."),
    cpf: z.string().min(11, "O CPF deve ter no mínimo 11 caracteres."),
    rg: z.string().min(7, "O RG deve ter no mínimo 7 caracteres."),
    birthdate: z.string({
      required_error: "Data de nascimento é obrigatória.",
    }),
    email: z
      .string()
      .email({ message: "Email é obrigatório." })
      .optional()
      .or(z.literal("")),
    phone_number: z.string().optional(),
    address: z.string().min(3, "O endereço deve ter no mínimo 3 caracteres."),
    area: z
      .string({
        required_error: "Área é obrigatória.",
      })
      .min(3, "O setor deve ter no mínimo 3 caracteres."),
    role: z
      .string({
        required_error: "Cargo é obrigatório.",
      })
      .min(3, "O cargo deve ter no mínimo 3 caracteres."),
  })
  .refine(
    (data) => {
      const { email, phone_number } = data;
      return (email && !phone_number) || (!email && phone_number);
    },
    {
      message: "É obrigatório preencher o campo Email ou Telefone",
      path: ["email"],
    }
  )
  .refine(
    (data) => {
      const { birthdate } = data;
      return !(birthdate === "");
    },
    {
      message: "Data de nascimento é obrigatória",
      path: ["birthdate"],
    }
  );

export type FormValues = z.infer<typeof editEmployeeSchema>;
