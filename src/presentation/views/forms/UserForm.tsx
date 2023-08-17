import React from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { useEntityUtils } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUserSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/UsuariosMantenedor";

export interface IUserInputData {
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

export function transformInsertQuery(
  jsonData: IUserInputData
): OutputData | null {
  if (jsonData.password !== jsonData.password2) {
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
  jsonData: IUserInputData,
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
  );

  if (filteredFields.length === 0) {
    return null;
  }

  const _p3 = filteredFields.join(",");

  return {
    query: "04",
    _p1: primaryKey,
    _p3,
  };
}

// export function transformUpdateQuery(
//   jsonData: IUserInputData,
//   primaryKey: string
// ): OutputData | null {
//   const fields = [
//     jsonData.nombre && `nombre='${jsonData.nombre}'`,
//     jsonData.telefono && `telefono='${jsonData.telefono}'`,
//     jsonData.correo && `correo='${jsonData.correo}'`,
//     jsonData.estado && `estado=${jsonData.estado === "Activo" ? 1 : 2}`,
//     jsonData.cargo && `cargo=${jsonData.cargo}`,
//     jsonData.password1 && `password='${jsonData.password1}'`,
//   ];

//   const filteredFields = fields.filter(
//     (field) => field !== null && field !== ""
//   );
//   console.log("filteredField", filteredFields);
//   if (filteredFields.length === 0) {
//     return null;
//   }

//   const _p3 = filteredFields.join(",");

//   const query: OutputData = {
//     query: "04",
//     _p1: primaryKey,
//     _p3,
//   };

//   return query;
// }

interface IUserFormPrps {
  closeModal: () => void;
  handleChange?: (data: any, isEditting: boolean) => void;
  data?: any[];
  label: string;
  isEditting?: boolean;
}

const UserForm: React.FC<IUserFormPrps> = ({
  closeModal,
  handleChange,
  label,
  data,
  isEditting,
}) => {
  const schema = validationUserSchema(isEditting);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
            data={data && data[EnumGrid.Nombre]}
            control={control}
            error={!isEditting && errors.nombre}
          />

          <SelectInputComponent
            label="Cargos"
            name="cargo"
            showRefresh={true}
            control={control}
            entidad={["/api/cargos/", "02"]}
            error={!isEditting && errors.cargo}
          />
          <SelectInputComponent
            label="Usuarios"
            name="usuarios"
            showRefresh={true}
            control={control}
            entidad={["/api/usuarios/", "02"]}
          />
        </div>

        <div className="w-full mt-4 flex flex-col space-y-2">
          <TextInputComponent
            type="text"
            label="Telefono"
            name="telefono"
            data={data && data[EnumGrid.Telefono]}
            control={control}
          />
          <TextInputComponent
            type="email"
            label="Correo"
            name="correo"
            data={data && data[EnumGrid.Correo]}
            control={control}
          />
          <div>
            <RadioButtonComponent
              control={control}
              label="Estado"
              name="estado"
              data={data && data[EnumGrid.Estado]}
              options={["Activo", "Suspendido"]}
              error={!isEditting && errors.estado}
            />
          </div>
        </div>

        <div className="w-full mt-4 flex flex-col space-y-2">
          <TextInputComponent
            type="password"
            label="Password"
            name="password"
            control={control}
            error={!isEditting && errors.password}
          />
          <TextInputComponent
            type="password"
            label="Confirmar Password"
            name="password2"
            control={control}
            error={!isEditting && errors.password}
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
