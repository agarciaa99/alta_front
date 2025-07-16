import { z } from "zod";

export const salarySchema = z.object({
  salarioMensual: z
    .string({
      required_error: "El salario mensual es obligatorio",
    })
    .min(1, "Debes ser un número positivo"),
  salarioDiario: z
    .string({
      required_error: "Ingresa un salario mensual para calcular el diario",
    })
    .min(1, "Debes ingresar el salario diario"),
});

export type SalarySchema = z.infer<typeof salarySchema>;
