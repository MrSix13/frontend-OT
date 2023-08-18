import React from "react";
import { PrimaryButtonsComponent } from "../../components";
import { useEntityUtils } from "../../hooks";
import TableComponent from "../../components/TableComponent";
// import { table_head_cargos, TABLE_HEAD } from '../../utils'
import {
  table_head_cargos,
  table_head_perfiles,
  table_head_usuarios,
} from "../../utils/table_head_utils";

const CargosMantenedor = () => {
  const {
    handlePageSize,
    handleDeleteSelected,
    handleRefresh,
    entity,
    entities,
  } = useEntityUtils("/api/usuarios/");

  // util.js (o cualquier otro nombre que desees)
  // const transformDataForTable = (entities) => {
  //     return entities.map((item) => {
  //     const transformedItem = {};
  //     for (let i = 0; i < item.length; i++) {
  //         transformedItem[`key${i + 1}`] = item[i];
  //     }
  //     return transformedItem;
  //     });
  // };

  // const transformDataForTable = (dataFromBackend, key1Name, key2Name) => {
  //     return dataFromBackend.map((item) => {
  //       return {
  //         [key1Name]: item[0], // Por ejemplo, key1Name puede ser "id"
  //         [key2Name]: item[1], // Por ejemplo, key2Name puede ser "nombre"
  //         // ... Puedes seguir añadiendo más claves según sea necesario
  //       };
  //     });
  //   };

  console.log("cargos", entities);
  // const tableMapped  = transformDataForTable(entities, "id", "nombre")

  // console.log('nueva data', tableMapped)
  return (
    <div className="w-[95%] h-full">
      <h1 className="text-center font-bold text-xl">Mantenedor de Cargos</h1>

      <div className="">
        <div className="mt-3">
          <label>Nombre Funcionalidad</label>
          <input type="text" className="ml-2" placeholder="" />
        </div>
        <PrimaryButtonsComponent
          handleDeleteSelected={handleDeleteSelected}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showRefreshButton={false}
          showForwardButton={false}
        />
      </div>

      <TableComponent data={entities} tableHead={table_head_usuarios} />
    </div>
  );
};

export default CargosMantenedor;
