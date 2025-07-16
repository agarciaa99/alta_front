import { useForm, type UseFormReturn } from "react-hook-form";
import { format, differenceInYears } from "date-fns";

import { Button } from "./ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { cn } from "@/lib/utils";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { es } from "date-fns/locale";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import type { FullSchema } from "@/schemas/fullSchema";

export default function FormRegistro({
  form,
}: {
  form: UseFormReturn<FullSchema>;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mx-auto mb-4">
        <p className="font-semibold text-xl">Datos de la Empresa</p>
      </div>

      {/* date of birth */}
      <FormField
        control={form.control}
        name="fechaIngreso"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Fecha de Ingreso</FormLabel>
            <div className="mb-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal mb-2",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                    <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="mb-4" />
            </div>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 space-x-4">
        <FormField
          control={form.control}
          name="periodo"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Periodo de Contratación (días)</FormLabel>
              <div className="mb-2">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    className="flex mb-2"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="90" />
                      </FormControl>
                      <FormLabel className="font-normal">90</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="180" />
                      </FormControl>
                      <FormLabel className="font-normal">180</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="mb-4" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alta"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de Alta</FormLabel>
              <div className="mb-2">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={"Quincenal"}
                    className="flex mb-2"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="Quincenal" />
                      </FormControl>
                      <FormLabel className="font-normal">Quincenal</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="mb-4" />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 space-x-4">
        <FormField
          control={form.control}
          name="departamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departamento</FormLabel>
              <div className="mb-2">
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-full truncate mb-2">
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Recursos Humanos">
                      Recursos Humanos
                    </SelectItem>
                    <SelectItem value="Contaduria">Contaduria</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="mb-4" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="puesto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto</FormLabel>
              <div className="mb-2">
                <FormControl>
                  <Input className="mb-2" placeholder="Reclutador" {...field} />
                </FormControl>
                <FormMessage className="mb-2" />
              </div>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="actividades"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Actividades</FormLabel>
            <div className="mb-2">
              <FormControl>
                <Textarea
                  placeholder="Escribe las actividades a realizar"
                  className="resize-none mb-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
