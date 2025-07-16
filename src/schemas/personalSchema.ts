import { z } from "zod";

export const personalSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(2, "El nombre es obligatorio"),
  apellidoPaterno: z
    .string({
      required_error: "El apeliido paterno es obligatorio",
    })
    .min(2, "El apellido paterno es obligatorio"),
  apellidoMaterno: z
    .string({
      required_error: "El apellido materno es obligatorio",
    })
    .min(2, "El apellido materno es obligatorio"),
  fechaNacimiento: z.date({
    required_error: "Debes seleccionar una fecha",
  }),
  edad: z
    .string({
      required_error: "Selecciona una fecha para calcular tu edad",
    })
    .min(2, "Debes ingresar tu edad")
    .max(2),
  estadoCivil: z
    .string({
      required_error: "El estado civil es obligatorio",
    })
    .min(1, "Debes seleccionar tu estado cicil"),
  nacionalidad: z
    .string({ required_error: "La nacionalidad es obligatoria" })
    .min(1, "Debese seleccionar tu nacionalidad"),
});

export type PersonalSchema = z.infer<typeof personalSchema>;
