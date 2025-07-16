import { z } from "zod";
import { personalSchema } from "./personalSchema";
import { companySchema } from "./companySchema";
import { salarySchema } from "./salarySchema";
import { addressSchema } from "./addressSchema";

export const fullSchema = z.object({
  ...personalSchema.shape,
  ...companySchema.shape,
  ...salarySchema.shape,
  ...addressSchema.shape,
});

export type FullSchema = z.infer<typeof fullSchema>;
