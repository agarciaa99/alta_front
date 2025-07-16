import { z } from "zod";

export const addressSchema = z.object({
  calle: z
    .string({
      required_error: "La calle y número son obligatorios",
    })
    .min(1, "Debes ingresar una dirección"),
  colonia: z
    .string({ required_error: "La colonia es obligatoria" })
    .min(1, "Debes ingresar una colonia"),
  delegacion: z
    .string({ required_error: "El municipio es obilgatorio" })
    .min(1, "Debes ingresar una delegación o municipio"),
  ciudad: z
    .string({ required_error: "La ciudad es obligatoria" })
    .min(1, "Debes ingresar una ciudad"),
  cp: z
    .string({
      required_error: "El código postal es obligatorio",
    })
    .regex(/^\d{5}$/, {
      message: "El código postal debe tener 5 dígitos",
    }),
});

export type AddressSchema = z.infer<typeof addressSchema>;
