import { type UseFormReturn } from "react-hook-form";

import { Input } from "./ui/input";
import type { FullSchema } from "@/schemas/fullSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useEffect } from "react";

export default function FormSalario({
  form,
}: {
  form: UseFormReturn<FullSchema>;
}) {
  const salarioMensual = form.watch("salarioMensual");

  useEffect(() => {
    if (salarioMensual && !isNaN(Number(salarioMensual))) {
      const diario = Number(salarioMensual) / 30;
      form.setValue("salarioDiario", diario.toFixed(2));
    }
  }, [salarioMensual, form]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mx-auto mb-4">
        <p className="font-semibold text-xl">Datos Salariales</p>
      </div>

      {/* Mensual */}
      <div className="grid grid-cols-2 space-x-4">
        <FormField
          control={form.control}
          name="salarioMensual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensual</FormLabel>
              <FormControl>
                <Input
                  className="mb-2"
                  type="number"
                  placeholder="Ingresa el salario mensual"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salarioDiario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diario</FormLabel>
              <FormControl>
                <Input
                  className="mb-2"
                  readOnly
                  placeholder="Se calcula automáticamente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
