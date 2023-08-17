import React, { useState } from "react";
import PrimaryKeySearch from "../../components/PrimaryKeySearch";
import {
  PrimaryButtonsComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import TableComponent from "../../components/TableComponent";
import { useCrud, useEntityUtils } from "../../hooks";
import { table_head_usuarios } from "../../utils/table_head_utils";
import UserForm, {
  IUserInputData,
  transformInsertQuery,
  transformUpdateQuery,
} from "../forms/UserForm";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/store";

type UserData = [number, number, string, string, number, string, number];

export enum EnumGrid {
  ID = 1,
  Nombre = 2,
  Telefono = 3,
  Correo = 4,
  Estado = 5,
  Cargo_id = 6,
  Cargo = 7,
}

interface IUsuariosMantenedorProps {
  userData: UserData;
}

const UsuariosMantenedor: React.FC<IUsuariosMantenedorProps> = () => {
  const { createdEntity, editEntity } = useCrud("/api/usuarios/");
  const { control, handleSubmit } = useForm();
  const {
    //entities state
    entities,
    setEntities,
    entity,
    //modal methods
    isModalOpen,
    isModalEdit,
    toggleEditModal,
    openModal,
    closeModal,
    setOnDelete,
    //Check methods
    handleSelect,
    selectedIds,
    setSelectedIds,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteAll,
  } = useEntityUtils("/api/usuarios/", "01");
  //FACTORIZAR
  const handleSaveChange = async (
    data: IUserInputData,
    isEditting: boolean
  ) => {
    try {
      console.log("transform-FORM", data);
      const transformedData = isEditting
        ? transformUpdateQuery(data, selectedIds.toString())
        : transformInsertQuery(data);

      console.log("transform-FORM", transformedData);
      if (isEditting) {
        const response = await editEntity(transformedData);
        const errorResponse = response?.response?.data.error;
        console.log("errorResponse", errorResponse);
        if (errorResponse) {
          if (errorResponse === "IntegrityError") {
            toast.error("No se pudo actualizar");
          } else {
            toast.error(errorResponse);
          }
        } else {
          toast.success("Actualizado correctamente");
        }
      } else {
        const response = await createdEntity(transformedData);
        const errorResponse = response?.response?.data.error;
        if (errorResponse) {
          if (errorResponse === "IntegrityError") {
            toast.error("No se pudo ingresar");
          } else {
            toast.error(errorResponse);
          }
        } else {
          toast.success("Creado correctamente");
        }
      }

      // toast.success(
      //   isEditting
      //     ? "Usuario editado correctamente"
      //     : "Usuario Creado Correctamente"
      // );

      closeModal();
      setEntities([]);
      setOnDelete((prev) => !prev);
    } catch (error) {
      console.log("error toaest test:", error.message);

      toast.error(error);
    }
  };

  const handleAdd = () => {
    console.log("click");
  };

  console.log("selectedID", selectedIds);

  return (
    <div className="w-[95%] h-full">
      <h1 className="text-center mt-5 font-bold text-2xl">
        Mantenedor de Usuarios
      </h1>

      <div className="flex mt-5">
        <PrimaryKeySearch
          baseUrl="/api/usuarios"
          selectUrl="/api/cargos/"
          setState={
            setEntities as React.Dispatch<
              React.SetStateAction<IUsuariosMantenedorProps[]>
            >
          }
          primaryKeyInputs={[
            { name: "_p1", label: "Nombre", type: "text" },
            { name: "_p2", label: "Cargos", type: "select" },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteAll={handleDeleteAll}
          handleAddTipe2={handleAdd}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={false}
        />
      </div>

      <div>
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteAll={handleDeleteAll}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          entidad="Usuario"
          data={entities}
          tableHead={table_head_usuarios}
        />
      </div>

      {isModalOpen && (
        <UserForm
          label="Crear Usuario"
          handleChange={(data) => handleSaveChange(data, false)}
          closeModal={closeModal}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <UserForm
          label="Editar Usuario"
          handleChange={(data) => handleSaveChange(data, true)}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
        />
      )}

      {/* {isModalOpen && <PermisosMantenedor closeModal={closeModal} />} */}
    </div>
  );
};

export default UsuariosMantenedor;

// //COMBINAR LOGICA
// const handleChange = async (data) => {
//   try {
//     const createData = transformInsertQuery(data);
//     await createdEntity(createData);
//     closeModal();
//     setEntities([]);
//     setOnDelete((prev) => !prev);
//     toast.success("Usuario creado correctamente");
//   } catch (error) {
//     toast.error(error);
//     console.log("errorCrear", error);
//   }
// };

// const handleEditChange = async (data) => {
//   try {
//     const editData = transformUpdateQuery(data, entityID.toString());
//     console.log("editData", editData);
//     await editEntity(editData);
//     closeModal();
//     setEntities([]);
//     setOnDelete((prev) => !prev);
//     toast.success("Usuario editado correctamente");
//   } catch (error) {
//     console.log("error editar:", error);
//   }
// };
