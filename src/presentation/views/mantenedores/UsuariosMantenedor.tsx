import React, { useState } from "react";
import PrimaryKeySearch from "../../components/PrimaryKeySearch";
import { PrimaryButtonsComponent } from "../../components";
import TableComponent from "../../components/TableComponent";
import { useCrud, useEntityUtils } from "../../hooks";
import { table_head_usuarios } from "../../utils/table_head_utils";
import UserForm, {
  IUserInputData,
  transformInsertQuery,
  transformUpdateQuery,
} from "../forms/UserForm";
import PermisosMantenedor from "./PermisosMantenedor";
import { toast } from "react-toastify";

function UsuariosMantenedor() {
  const { createdEntity, editEntity } = useCrud("/api/usuarios/");

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

  const handleSaveChange = async (data: IUserInputData, isEditting: boolean) => {
    try {
      console.log('editting', isEditting)
      const transformedData = isEditting
        ? transformUpdateQuery(data, selectedIds.toString())
        : transformInsertQuery(data);

      if (isEditting) {
        await editEntity(transformedData)
      } else {
        await createdEntity(transformedData)
      }

      toast.success(isEditting ? "Usuario editado correctamente" : "Usuario Creado Correctamente")

      closeModal();
      setEntities([]);
      setOnDelete((prev) => !prev)
    } catch (error) {
      toast.error(error)
      console.log('error:', error)
    }
  }

  return (
    <div className="w-[95%] h-full">
      <h1 className="text-center mt-5 font-bold text-2xl">
        Mantenedor de Usuarios
      </h1>

      <div className="flex mt-5">
        <PrimaryKeySearch
          baseUrl="/api/usuarios"
          selectUrl="/api/cargos/"
          setState={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Nombre", type: "text" },
            { name: "_p2", label: "Cargos", type: "select" },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteAll={handleDeleteAll}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={true}
          showRefreshButton={true}
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
}

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
