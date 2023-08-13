import React, { useState } from "react";
import PrimaryKeySearch from "../../components/PrimaryKeySearch";
import { PrimaryButtonsComponent } from "../../components";
import TableComponent from "../../components/TableComponent";
import { useEntityUtils } from "../../hooks";
import { table_head_usuarios } from "../../utils/table_head_utils";
import UserForm from "../forms/UserForm";

function UsuariosMantenedor() {
  const [usuarios, setUsuarios] = useState([]);


  const { entities, setEntities, isModalOpen, openModal, closeModal } = useEntityUtils("/api/usuarios/", "01");

  const handleChange = (data) => {
    console.log('data', data)
  }
  const usuariosJson = [
    [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
    [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
    [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
    [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
    [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
    [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
    [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
    [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
    [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
    [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
    [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
    [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
    [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
    [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
    [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
    [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
    [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
    [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
  ];

  // Puedes acceder a los valores de los usuarios por índice, por ejemplo: usuarios[0] para el primer usuario


  // Puedes acceder a los usuarios por índice, por ejemplo: usuarios[0] para el primer usuario

  console.log("state", usuariosJson);

  return (
    <div className="w-[95%] h-full">
      <h1 className="text-center mt-5 font-bold text-2xl">Mantenedor de Usuarios</h1>

      <div className="flex mt-5">
        <PrimaryKeySearch
          baseUrl="/api/usuarios"
          selectUrl="/api/cargos/"
          setState={setUsuarios}
          primaryKeyInputs={[
            { name: "_p1", label: "Nombre", type: "text" },
            { name: "_p2", label: "Cargos", type: "select" },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={true}
          showRefreshButton={true}
        />
      </div>

      <div>
        <TableComponent entidad="Usuario" data={usuariosJson} tableHead={table_head_usuarios} />
      </div>

      {isModalOpen && <UserForm handleChange={handleChange} closeModal={closeModal} />}
    </div>
  );
}

export default UsuariosMantenedor;
