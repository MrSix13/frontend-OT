/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-tailwind/react';


import { usePermission } from '../hooks';
import { PencilIcon } from '@heroicons/react/24/solid';
import { HiEye } from 'react-icons/hi';

interface ITableComponentProps{
    tableHead:{ cell: string; key: string }[];
    data: React.Dispatch<React.SetStateAction<any[]>>;
    //methods
}

const TableComponent:React.FC<ITableComponentProps> = ({
    tableHead,
    data
}) => {
    console.log('table coponet', tableHead)
  const {escritura, lectura} = usePermission()
  return (
    <table className='mt-4 w-full min-w-max table-auto text-left'>
        <thead>
            <tr>
                {tableHead && tableHead.map((column, index)=>{
                    if(column.key === 'checkbox' && !escritura){
                        return null
                    }
                    return (
                        <th key={index} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 '>
                            {column.key === "checkbox" ? (
                                <input className='hidden-input' type='checkbox' />
                            ) : (
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                                >
                              {column.cell}
                            </Typography>
                            )}
                        </th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {tableHead.map((column, columnIndex) => (

                        <td
                            key={columnIndex}
                            className={rowIndex === data.length - 1 ? 'p-4' : 'p-4 border-b border-blue-gray-50'}
                        >
                            <Typography variant='small' color='blue-gray' className='font-normal'>
                            {row[column.key]} {/* Mostrar el valor correspondiente a la clave */}
                            </Typography>
                        </td>

            ))}
          </tr>
        ))}
        </tbody>
            <tfoot>
                <tr>
                    <td colSpan={tableHead.length}>
                    {escritura && (
                        <Tooltip content="Editar Persona">
                        <IconButton variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                        </IconButton>
                        </Tooltip>
                    )}
                    {escritura && (
                        <Tooltip content="Eliminar Persona">
                        <IconButton variant="text" color="blue-gray" >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            >
                            {/* ... Icono de eliminar */}
                            </svg>
                        </IconButton>
                        </Tooltip>
                    )}
                    {lectura && (
                        <Tooltip content="Ver Persona">
                        <IconButton variant="text" color="blue-gray">
                            <HiEye className="h-4 w-4" />
                        </IconButton>
                        </Tooltip>
                    )}
                    </td>
                </tr>
    </tfoot>
    </table>
  )
}

export default TableComponent