import { type UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import type { FullSchema } from "@/schemas/fullSchema";

export default function FormDireccion({
  form,
}: {
  form: UseFormReturn<FullSchema>;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mx-auto mb-4">
        <p className="font-semibold text-xl">Dirección</p>
      </div>

      <div className="grid grid-cols-2 space-x-4 pb-2">
        {/* address */}
        <FormField
          control={form.control}
          name="calle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calle y Número</FormLabel>
              <FormControl>
                <Input
                  className="mb-2"
                  placeholder="Av. La Joya 3-B"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colonia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colonia</FormLabel>
              <FormControl>
                <Input
                  className="mb-2"
                  placeholder="Santa Ana Tlaltepan"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-3 space-x-4">
        <FormField
          control={form.control}
          name="ciudad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input className="mb-2" placeholder="México" {...field} />
              </FormControl>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delegacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Municipio</FormLabel>
              <FormControl>
                <Input className="mb-2" placeholder="Cuautitlán" {...field} />
              </FormControl>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Postal</FormLabel>
              <FormControl>
                <Input
                  className="mb-2"
                  type="number"
                  placeholder="54870"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
