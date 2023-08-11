/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";

import { usePermission } from "../hooks";
import { PencilIcon } from "@heroicons/react/24/solid";
import { HiEye } from "react-icons/hi";

interface ITableComponentProps {
  tableHead?: { cell: string; key: string; visible: boolean }[];
  data?: React.Dispatch<React.SetStateAction<any[]>>;
  renderButtons?: (item: any) => React.ReactNode;
}

const TableComponent: React.FC<ITableComponentProps> = ({
  tableHead,
  data,
}) => {
  const numberIndex = 0;
  const columnCheck = tableHead[0].key;
  const { escritura, lectura } = usePermission();

  return (
    <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {tableHead &&
            tableHead.map((column, index) => {
              const isVisible =
                column.visible && (column.key !== "checkbox" || escritura);
              return isVisible ? (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                >
                  {column.key === "checkbox" ? (
                    <input className="hidden-input" type="checkbox" />
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
              ) : null;
            })}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((rowData, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {/* <td key={0}>
                                        <input  type="checkbox" name="" id="" />
                                    </td> */}

                {rowData.map((row, index) => {
                  const visible2 = tableHead[index].visible;
                  return (
                    visible2 && (
                      <td key={index}>
                        {index === 0 ? (
                          <input type="checkbox" name="" id="" />
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row || ""}
                          </Typography>
                        )}
                      </td>
                    )
                  );
                })}
                <td>
                  {escritura ? (
                    <Tooltip content="Editar Usuario">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        // onClick={() => toggleEditModal(id)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}

                  {escritura ? (
                    <Tooltip content="Eliminar Usuario">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        // onClick={() => handleDelete(id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}

                  {lectura && (
                    <Tooltip content="ver usuario">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        // onClick={() => handleEntity(id)}
                      >
                        <HiEye className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableComponent;

// TABLA LEE OBJETOS

// console.log('data table', data)
// const {escritura, lectura} = usePermission()
// return (
//   <table className='mt-4 w-full min-w-max table-auto text-left'>
//       <thead>
//           <tr>
//               {tableHead && tableHead.map((column, index)=>{
//                   if(column.key === 'checkbox' && !escritura){
//                       return null
//                   }
//                   return (
//                       <th key={index} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 '>
//                           {column.key === "checkbox" ? (
//                               <input className='hidden-input' type='checkbox' />
//                           ) : (
//                               <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-normal leading-none opacity-70"
//                               >
//                             {column.cell}
//                           </Typography>
//                           )}
//                       </th>
//                   )
//               })}
//           </tr>
//       </thead>
//       <tbody>
//           {}
//       </tbody>

//   </table>

// {data.map((row, rowIndex) => (
//     <tr key={rowIndex}>
//       {tableHead.map((column, columnIndex) => (
//           <tr>
//                   <td
//                       key={columnIndex}
//                       className={rowIndex === data.length - 1 ? 'p-4' : 'p-4 border-b border-blue-gray-50'}
//                   >
//                       <Typography variant='small' color='blue-gray' className='font-normal'>
//                       {row[column.key]} {/* Mostrar el valor correspondiente a la clave */}
//                       </Typography>
//                   </td>
//                   <td colSpan={tableHead.length}>
//                   {escritura && (
//                       <Tooltip content="Editar Persona">
//                       <IconButton variant="text" color="blue-gray">
//                           <PencilIcon className="h-4 w-4" />
//                       </IconButton>
//                       </Tooltip>
//                   )}
//                   {escritura && (
//                       <Tooltip content="Eliminar Persona">
//                       <IconButton variant="text" color="blue-gray" >
//                           <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6"
//                           >
//                           {/* ... Icono de eliminar */}
//                           </svg>
//                       </IconButton>
//                       </Tooltip>
//                   )}
//                   {lectura && (
//                       <Tooltip content="Ver Persona">
//                       <IconButton variant="text" color="blue-gray">
//                           <HiEye className="h-4 w-4" />
//                       </IconButton>
//                       </Tooltip>
//                   )}
//                   </td>
//               </tr>
//                       ))}
//                   </tr>
//                   ))}
//                   </tbody>
