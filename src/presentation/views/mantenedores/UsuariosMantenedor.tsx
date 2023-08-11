import React, { useState } from "react";
import PrimaryKeySearch from "../../components/PrimaryKeySearch";
import { PrimaryButtonsComponent } from "../../components";
import TableComponent from "../../components/TableComponent";
import { useEntityUtils } from "../../hooks";
import { table_head_usuarios } from "../../utils/table_head_utils";

function UsuariosMantenedor() {
  const [usuarios, setUsuarios] = useState([]);

  const { entities, setEntities } = useEntityUtils("/api/usuarios/", "01");

  console.log("state", entities);

  return (
    <div className="w-[95%] h-full">
      <h1>Mantenedor de Usuarios</h1>

      <div className="flex">
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
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={false}
        />
      </div>

      <div>
        <TableComponent data={entities} tableHead={table_head_usuarios} />
      </div>
    </div>
  );
}

export default UsuariosMantenedor;
