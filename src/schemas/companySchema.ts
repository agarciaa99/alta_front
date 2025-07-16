import { z } from "zod";

export const companySchema = z.object({
  fechaIngreso: z.date({
    required_error: "Debes seleccionar una fecha",
  }),
  periodo: z
    .string({ required_error: "El periodo de contratación es obligatorio" })
    .min(1, "Debes seleccionar un periodo de contrato"),
  alta: z
    .string({ required_error: "El tipo de alta es obligatorio" })
    .min(1, "Debese seleccionar el tipo de alta"),
  departamento: z
    .string({ required_error: "El departamento es obligatorio" })
    .min(1, "Debes seleccionar un departamento"),
  puesto: z
    .string({
      required_error: "El puesto es obligatorio",
    })
    .min(1, "Debes seleccionar un puesto"),
  actividades: z
    .string({
      required_error: "El menos una actividad es obligatoria",
    })
    .min(5, {
      message: "Debes escribir al menos 5 caracteres.",
    })
    .max(600, {
      message: "No puedes escribir más de 600 caracteres.",
    }),
});

export type CompanySchema = z.infer<typeof companySchema>;
