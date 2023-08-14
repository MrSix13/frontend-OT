import React from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { useEntityUtils } from "../../hooks";

interface InputData {
  nombre: string;
  password1: string;
  password2: string;
  cargo: string;
  telefono: string;
  correo: string;
  estado: string;
}

interface OutputData {
  query: string;
  _p1: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  if (jsonData.password1 !== jsonData.password2) {
    alert("Las contraseñas no coinciden");
  }

  const _p1 = `'${jsonData.nombre}', '', ${jsonData.cargo}, '${
    jsonData.telefono
  }', '${jsonData.correo}', ${jsonData.estado === "Activo" ? 1 : 2}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    jsonData.nombre && `nombre='${jsonData.nombre}'`,
    jsonData.telefono && `telefono='${jsonData.telefono}'`,
    jsonData.correo && `correo='${jsonData.correo}'`,
    jsonData.estado && `estado=${jsonData.estado === "Activo" ? 1 : 2}`,
    jsonData.cargo && `cargo=${jsonData.cargo}`,
    jsonData.password1 && `password='${jsonData.password1}'`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  ) as string[];
  console.log("filteredField", filteredFields);
  if (filteredFields.length === 0) {
    return null;
  }

  const _p3 = filteredFields.join(",");

  const query: OutputData = {
    query: "04",
    _p1: primaryKey,
    _p3,
  };

  return query;
}

interface IUserFormPrps {
  closeModal: () => void;
  handleChange?: (data: any, id?) => void;
  data?: any[];
  label: string;
}

const UserForm: React.FC<IUserFormPrps> = ({
  closeModal,
  handleChange,
  label,
  data,
}) => {
  const { control, handleSubmit } = useForm();
  const { entities } = useEntityUtils("/api/cargos/", "02");
  console.log("cargos:", entities);
  return (
    <div className="bg-white px-4 w-[90%] max-w-md mx-auto absolute top-[25%] left-[40%] rounded-lg shadow-lg">
      <div className="flex justify-end items-end">
        <button onClick={closeModal} className="text-red-500">
          X
        </button>
      </div>
      <h1 className="text-center text-xl font-semibold mb-4">{label}</h1>

      <form onSubmit={handleSubmit(handleChange)} className="space-y-4">
        <div className="w-full mt-4 flex flex-col space-y-4">
          <TextInputComponent
            type="text"
            label="Nombre"
            name="nombre"
            data={data && data[2]}
            control={control}
          />
          <SelectInputComponent
            label="Cargos"
            name="cargo"
            control={control}
            options={entities}
          />
        </div>

        <div className="w-full mt-4 flex flex-col space-y-2">
          <TextInputComponent
            type="text"
            label="Telefono"
            name="telefono"
            data={data && data[3]}
            control={control}
          />
          <TextInputComponent
            type="email"
            label="Correo"
            name="correo"
            data={data && data[4]}
            control={control}
          />
          <div>
            <RadioButtonComponent
              control={control}
              label="Estado"
              name="estado"
              data={data && data[5]}
              options={["Activo", "Suspendido"]}
            />
          </div>
        </div>

        <div className="w-full mt-4 flex flex-col space-y-2">
          <TextInputComponent
            type="password"
            label="Password"
            name="password1"
            control={control}
          />
          <TextInputComponent
            type="password"
            label="Confirmar Password"
            name="password2"
            control={control}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
