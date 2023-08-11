import React from 'react'
import { AiOutlineDelete,AiOutlineForward } from "react-icons/ai";
import { ExportCSV } from '.';
import { Button, Tooltip, button } from '@material-tailwind/react';
import { SiAddthis } from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import { usePermission } from '../hooks';


interface IPrimaryButtonProps{
    handlePageSize?: () => void;
    handleDeleteAll?: () => void;
    escritura?: boolean;
    personsLength?: number;
    handleAddPerson?: () => void;
    handleRefresh?: () => void;
    showForwardButton?:boolean;
    showAddButton?: boolean;
    showRefreshButton?:boolean;
    showDeleteButton?: boolean;
    showExportButton?:boolean
}



const PrimaryButtonsComponent:React.FC<IPrimaryButtonProps> = ({
    handleDeleteAll,
    handlePageSize,
    personsLength,
    handleAddPerson,
    handleRefresh,
    showForwardButton,
    showAddButton,
    showRefreshButton,
    showDeleteButton,
    showExportButton
}) => {

  const {escritura} = usePermission()
  return (
    <div className="flex w-full justify-end px-4 mx-4">





     {showForwardButton && (
      <Tooltip content="Siguiente">
          <button
          className="flex items-center mr-6 gap-3 rounded bg-blue-500"
          onClick={handlePageSize}
          >
          <AiOutlineForward
              className="text-white h-10 w-10"        
          />
        </button>
      </Tooltip>
     )}






    { showAddButton && escritura && (
      <Tooltip content="Agregar">
        <button
          onClick={handleAddPerson}
          className="flex items-center mr-6 gap-3 bg-blue-500 rounded text-center"
        >
          <SiAddthis className="h-8 w-8 text-white" />
        </button>
      </Tooltip>
    )}



    {showRefreshButton && (
      <Tooltip content="Refrescar">
          <button
          onClick={handleRefresh}
          className="flex items-center mr-6 gap-3 bg-blue-500 rounded text-center"
        >
          <FiRefreshCw className="h-10 w-10 text-white" /> 
        </button>
      </Tooltip>
    )}
    {showExportButton && (
        <ExportCSV data={personsLength} />

    )}
    {showDeleteButton && escritura && (
      <Tooltip content="Eliminar Seleccionados">
        <button
        className="flex items-center ml-6 gap-3 bg-red-500 rounded text-center"
        onClick={handleDeleteAll}
        >
            <AiOutlineDelete
              className="h-10 w-10 text-white"
            />
        </button>
      </Tooltip>
    )}
  </div>
  )
}

export default PrimaryButtonsComponent