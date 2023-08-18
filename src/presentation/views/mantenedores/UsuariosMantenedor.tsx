import React from "react";
import { toast } from "react-toastify";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useCrud, useEntityUtils } from "../../hooks";
import UserForm, {
  IUserInputData,
  transformInsertQuery,
  transformUpdateQuery,
} from "../forms/UserForm";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  table_head_usuarios,
} from "../../utils";

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
const strEntidad = "Usuario ";
const strBaseUrl = "/api/usuarios/";
const strListUrl = "/api/cargos/";
const strQuery = "01";

interface IUsuariosMantenedorProps {
  userData: UserData;
}

const UsuariosMantenedor: React.FC<IUsuariosMantenedorProps> = () => {
  const { createdEntity, editEntity } = useCrud(strBaseUrl);

  const {
    //entities state
    entities,
    setEntities,
    entity,
    //modal methods
    isModalInsert,
    isModalEdit,
    toggleEditModal,
    openModal,
    closeModal,
    setDataGrid,
    //Check methods
    handleSelect,
    selectedIds,
    setSelectedIds,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
  } = useEntityUtils(strBaseUrl, strQuery);

  //FACTORIZAR
  // const handleSaveChange = async (
  //   data: IUserInputData,
  //   isEditting: boolean
  // ) => {
  //   try {
  //     console.log("transform-FORM", data);
  //     const transformedData = isEditting
  //       ? transformUpdateQuery(data, selectedIds.toString())
  //       : transformInsertQuery(data);

  //     console.log("transform-FORM", transformedData);
  //     if (isEditting) {
  //       const response = await editEntity(transformedData);
  //       const errorResponse = response?.response?.data.error;
  //       console.log("errorResponse", errorResponse);
  //       if (errorResponse) {
  //         if (errorResponse === "IntegrityError") {
  //           toast.error("No se pudo actualizar");
  //         } else {
  //           toast.error(errorResponse);
  //         }
  //       } else {
  //         toast.success("Actualizado correctamente");
  //       }
  //     } else {
  //       const response = await createdEntity(transformedData);
  //       const errorResponse = response?.response?.data.error;
  //       if (errorResponse) {
  //         if (errorResponse === "IntegrityError") {
  //           toast.error("No se pudo ingresar");
  //         } else {
  //           toast.error(errorResponse);
  //         }
  //       } else {
  //         toast.success("Creado correctamente");
  //       }
  //     }

  //     // toast.success(
  //     //   isEditting
  //     //     ? "Usuario editado correctamente"
  //     //     : "Usuario Creado Correctamente"
  //     // );

  //     closeModal();
  //     setEntities([]);
  //     setDataGrid((prev) => !prev);
  //   } catch (error) {
  //     console.log("error toaest test:", error.message);

  //     toast.error(error);
  //   }
  // };

  const handleSaveChange = React.useCallback(
    async (data: IUserInputData, isEditting: boolean) => {
      try {
        const transformedData = isEditting
          ? transformUpdateQuery(data, selectedIds.toString())
          : transformInsertQuery(data);

        const response = isEditting
          ? await editEntity(transformedData)
          : await createdEntity(transformedData);

        handleApiResponse(response, isEditting);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    },
    [selectedIds, editEntity, createdEntity]
  );

  const handleApiResponse = React.useCallback(
    (response: any, isEditting: boolean) => {
      const errorResponse = response?.response?.data.error;
      if (errorResponse) {
        const errorMessage =
          errorResponse === "IntegrityError"
            ? isEditting
              ? strEntidad.concat(ERROR_MESSAGES.delete)
              : strEntidad.concat(ERROR_MESSAGES.create)
            : errorResponse;
        toast.error(errorMessage);
      } else {
        toast.success(
          isEditting
            ? strEntidad.concat(SUCCESS_MESSAGES.edit)
            : strEntidad.concat(SUCCESS_MESSAGES.create)
        );
      }

      closeModal();
      setEntities([]);
      setDataGrid((prev) => !prev);
    },
    [setEntities, setDataGrid]
  );

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Usuarios</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          selectUrl={strListUrl}
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
          handleDeleteSelected={handleDeleteSelected}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={false}
        />
      </div>

      <>
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_usuarios}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <UserForm
          label={`Crear ${strEntidad}`}
          handleChange={(data) => handleSaveChange(data, false)}
          closeModal={closeModal}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <UserForm
          label={`Editar ${strEntidad}`}
          handleChange={(data) => handleSaveChange(data, true)}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
        />
      )}
    </div>
  );
};

export default UsuariosMantenedor;
