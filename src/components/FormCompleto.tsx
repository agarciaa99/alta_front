import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullSchema, type FullSchema } from "@/schemas/fullSchema";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { toast } from "sonner";

import FormRegistro from "./FormEmpresa";
import FormEmpresa from "./FormRegistro";
import FormDireccion from "./FormDireccion";
import FormSalario from "./FormSalario";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function FormCompleto() {
  const BACKEND_URL =
    import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:3001";

  const form = useForm<FullSchema>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      estadoCivil: undefined,
      nacionalidad: undefined,
      alta: "Quincenal",
      edad: "",
      fechaIngreso: undefined,
      fechaNacimiento: undefined,
      salarioMensual: "",
      salarioDiario: "",
      departamento: "",
      puesto: "",
      actividades: "",
      calle: "",
      colonia: "",
      delegacion: "",
      ciudad: "",
      cp: "",
      periodo: "",
    },
  });

  const onSubmit = async (data: FullSchema) => {
    console.log("Backend URL:", import.meta.env.PUBLIC_BACKEND_URL);
    const datosFormateados = {
      nombre: data.nombre.toUpperCase(),
      apellidoPaterno: data.apellidoPaterno.toUpperCase(),
      apellidoMaterno: data.apellidoMaterno.toUpperCase(),
      estadoCivil: data.estadoCivil?.toUpperCase() ?? "",
      nacionalidad: data.nacionalidad?.toUpperCase() ?? "",
      alta: data.alta?.toUpperCase() ?? "",
      edad: data.edad.toUpperCase(),
      departamento: data.departamento.toUpperCase(),
      puesto: data.puesto.toUpperCase(),
      actividades: data.actividades.toUpperCase(),
      calle: data.calle.toUpperCase(),
      colonia: data.colonia.toUpperCase(),
      delegacion: data.delegacion.toUpperCase(),
      ciudad: data.ciudad.toUpperCase(),
      cp: data.cp.toUpperCase(),
      periodo: data.periodo?.toUpperCase() ?? "",
      salarioMensual: data.salarioMensual.toUpperCase(),
      salarioDiario: data.salarioDiario.toUpperCase(),
      fechaIngreso: data.fechaIngreso
        ? format(data.fechaIngreso, "d 'de' MMMM 'de' yyyy", {
            locale: es,
          }).toUpperCase()
        : "",
      fechaNacimiento: data.fechaNacimiento
        ? format(data.fechaNacimiento, "d 'de' MMMM 'de' yyyy", {
            locale: es,
          }).toUpperCase()
        : "",
    };

    toast("Generando contrato...", {
      description: "El contrato se esta generando...",
    });

    try {
      const response = await fetch(`${BACKEND_URL}/generar-contrato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosFormateados),
      });

      if (!response.ok) {
        throw new Error("Error al generar el contrato");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "contrato.docx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast("Contrato generado", {
        description: "El archivo se ha descargado correctamente.",
      });

      form.reset();
    } catch (error) {
      console.error("Error al generar el contrato", error);
      toast("Error", {
        description:
          "Ocurrió un error inesperado al generar el contraro. Intenta de nuevo.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-4/5 mx-auto max-w-3xl space-y-6"
      >
        <FormEmpresa form={form} />
        <FormDireccion form={form} />
        <FormRegistro form={form} />
        <FormSalario form={form} />

        <div className="px-4">
          <Button type="submit" className="w-full mb-4 font-bold">
            Generar Contrato
          </Button>
        </div>
      </form>
    </Form>
  );
}
