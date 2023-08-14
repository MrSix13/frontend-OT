import React, { useState } from "react";
import PrimaryKeySearch from "../../components/PrimaryKeySearch";
import { PrimaryButtonsComponent } from "../../components";
import TableComponent from "../../components/TableComponent";
import { useCrud, useEntityUtils } from "../../hooks";
import { table_head_usuarios } from "../../utils/table_head_utils";
import UserForm, {
  transformInsertQuery,
  transformUpdateQuery,
} from "../forms/UserForm";
import PermisosMantenedor from "./PermisosMantenedor";
import { toast } from "react-toastify";

function UsuariosMantenedor() {
  const [usuarios, setUsuarios] = useState([]);

  const { createdEntity, editEntity } = useCrud("/api/usuarios/");

  const {
    //entities state
    entities,
    setEntities,
    entity,
    entityID,
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
    handleDelete,
  } = useEntityUtils("/api/usuarios/", "01");

  //check id
  console.log("selectedIDs", selectedIds);
  // console.log("entity", entity);
  // console.log("togleEdit", isModalEdit);

  //COMBINAR LOGICA
  const handleChange = async (data) => {
    try {
      const createData = transformInsertQuery(data);
      await createdEntity(createData);
      closeModal();
      setEntities([]);
      setOnDelete((prev) => !prev);
      toast.success("Usuario creado correctamente");
    } catch (error) {
      toast.error(error);
      console.log("errorCrear", error);
    }
  };

  const handleEditChange = async (data) => {
    try {
      const editData = transformUpdateQuery(data, entityID.toString());
      console.log("editData", editData);
      await editEntity(editData);
      closeModal();
      setEntities([]);
      setOnDelete((prev) => !prev);
      toast.success("Usuario editado correctamente");
    } catch (error) {
      console.log("error editar:", error);
    }
  };

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
          handleChange={handleChange}
          closeModal={closeModal}
        />
      )}

      {isModalEdit && (
        <UserForm
          label="Editar Usuario"
          handleChange={handleEditChange}
          data={entity}
          closeModal={closeModal}
        />
      )}

      {/* {isModalOpen && <PermisosMantenedor closeModal={closeModal} />} */}
    </div>
  );
}

export default UsuariosMantenedor;

// {
//   nombre: "test";
//   password1: "password";
//   password2: "password";
//   cargo: "1";
//   telefono: "+56939422";
//   correo: "correo@correo.cl";
//   estado: "Activo";
// }
// {
//   "query":"03",
//   "_p1": " 'Sandra', '', 2, '+5692304', 'correo@correo.cl', 3 "
// }
