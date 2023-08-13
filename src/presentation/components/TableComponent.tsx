/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { RiSettings3Fill } from "react-icons/ri";
import { PencilIcon } from "@heroicons/react/24/solid";
import { HiEye } from "react-icons/hi";


import { usePermission } from "../hooks";

interface ITableComponentProps {
  tableHead: { cell: JSX.Element | string; key: string; visible: boolean }[];
  data: React.Dispatch<React.SetStateAction<any[]>>;
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleEditModal?: (id: number) => void;
  selectedIds?: number[];
  entidad: string
}

const TableComponent: React.FC<ITableComponentProps> = ({
  tableHead,
  data,
  entidad,
  handleSelectChecked,
  handleSelectedCheckedAll,
  toggleEditModal,
  selectedIds
}) => {
  const { escritura, lectura } = usePermission();

  return (
    <table className="border border-l-2 border-r-2 mx-10 mt-10 w-full min-w-max table-fixed px-2 text-center">
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
                    <input className="hidden-input" type="checkbox" onChange={handleSelectedCheckedAll} />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold text-lg leading-none opacity-70"
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
            const id = rowData[1]
            return (
              <tr key={rowIndex}>
                {rowData.map((row, index) => {
                  const visible2 = tableHead && tableHead[index].visible;
                  return (
                    visible2 && (
                      <td className="border-b-4 px-4 py-2" key={index}>
                        {index === 0 ? (
                          <input checked={selectedIds && selectedIds.includes(id)} onChange={() => handleSelectChecked(id)} type="checkbox" name="" id="" />
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-sm"
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
                    <Tooltip content={`Editar ${entidad}`}>
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => toggleEditModal(id)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}


                  {lectura && (
                    <Tooltip content={`ver ${entidad}`}>
                      <IconButton
                        variant="text"
                        color="blue-gray"
                      // onClick={() => handleEntity(id)}
                      >
                        <HiEye className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {escritura && (
                    <Tooltip content="Permisos de Sistema">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                      // onClick={() => handleEntity(id)}
                      >
                        <RiSettings3Fill className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {escritura ? (
                    <Tooltip content={`Eliminar ${entidad}`}>
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

                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableComponent;

