import { type UseFormReturn } from "react-hook-form";
import { format, differenceInYears } from "date-fns";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
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
import { useEffect } from "react";
import type { FullSchema } from "@/schemas/fullSchema";

export default function FormEmpresa({
  form,
}: {
  form: UseFormReturn<FullSchema>;
}) {
  // age calculator
  useEffect(() => {
    const fechaNacimiento = form.watch("fechaNacimiento");
    if (fechaNacimiento instanceof Date && !isNaN(fechaNacimiento.getTime())) {
      const edad = differenceInYears(new Date(), fechaNacimiento);
      form.setValue("edad", edad.toString());
    }
  }, [form.watch("fechaNacimiento")]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mx-auto mb-4">
        <p className="font-semibold text-xl">Datos Personales</p>
      </div>

      {/* Name input */}
      <FormField
        control={form.control}
        name="nombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre(s)</FormLabel>
            <div className="mb-2">
              <FormControl>
                <Input
                  className="mb-2"
                  placeholder="Arturo Emmanuel"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mb-2" />
            </div>
          </FormItem>
        )}
      />

      {/* Lastname input */}
      <div className="grid grid-cols-2 space-x-4">
        <FormField
          control={form.control}
          name="apellidoPaterno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Paterno</FormLabel>
              <div className="mb-2">
                <FormControl>
                  <Input className="mb-2" placeholder="García" {...field} />
                </FormControl>
                <FormMessage className="mb-2" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apellidoMaterno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Materno</FormLabel>
              <div className="mb-2">
                <FormControl>
                  <Input className="mb-2" placeholder="Almaguer" {...field} />
                </FormControl>
                <FormMessage className="mb-2" />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 space-x-4">
        {/* date of birth */}
        <FormField
          control={form.control}
          name="fechaNacimiento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
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
                    captionLayout="dropdown"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    classNames={{
                      caption: "flex justify-center pt-2",
                      caption_label: "hidden",
                      caption_dropdowns: "flex gap-2 px-2 pb-4 justify-center",
                      dropdown:
                        "bg-white text-black dark:bg-neutral-800 dark:text-white rounded-md border p-1 text-sm focus:outline-none",
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />

        {/* age */}
        <FormField
          control={form.control}
          name="edad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edad</FormLabel>
              <div className="mb-2">
                <FormControl>
                  <Input
                    className="mb-2"
                    placeholder="Se calcula automáticamente"
                    {...field}
                    readOnly
                  />
                </FormControl>
                <FormMessage className="mb-2" />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 space-x-4">
        <FormField
          control={form.control}
          name="estadoCivil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder="Selecciona el estado civil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Soltero">Soltero</SelectItem>
                  <SelectItem value="Casado">Casado</SelectItem>
                  <SelectItem value="Divorciado">Divorciado</SelectItem>
                  <SelectItem value="Viudo">Viudo</SelectItem>
                  <SelectItem value="Concubinato">Concubinato</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />

        {/* Nationality */}
        <FormField
          control={form.control}
          name="nacionalidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidad</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger className="w-full truncate">
                    <SelectValue placeholder="Selecciona la nacionalidad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mexicana">Mexicana</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="mb-2" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
