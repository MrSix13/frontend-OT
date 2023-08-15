/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { AiOutlineFilePdf, AiOutlineDelete, AiOutlineForward } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';



import { IPerson } from '../../../interfaces';
import FormularioView from '../forms/FormView_v2';
import { TABLE_HEAD, mappedPerson } from '../../utils';
import { PersonProfileModal } from '../../components/modals/PersonProfileModal';
import { PrimaryButtonsComponent } from '../../components';
import PrimaryKeySearch from '../../components/PrimaryKeySearch';
import { useEntityUtils, usePermission, useCrud } from '../../hooks';
import TableComponent from '../../components/TableComponent';



export default function ListPerson() {
  // const [pageSize, setPageSize] = useState(1);
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [person, setPerson] = useState<IPerson | null>(null);
  // const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [rutPerson, setRutPerson] = useState<number | string>('')
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  // const [isPersonProfile, setIsPersonProfile] = useState<boolean>(false);


  const { lectura, escritura } = usePermission();
  const { editEntity, createdEntity } = useCrud('/api/personas');
  const {
    openModal,
    closeModal,
    handlePageSize,
    pageSize,
    setPageSize,
    isModalOpen,
    entities,
    setEntities,
    handleRefresh,
    toggleEditModal,
    isModalEdit,
    selectedIds,
    setSelectedIds,
    handleSelectedAll,
    handleSelect,
    handleDeleteAll,
    isEntityProfile,
    handleEntity,
    entity
  } = useEntityUtils('/api/personas')


  // const openModal = useCallback(() => {
  //   setIsModalOpen(true)
  // },[]);

  // const closeModal = useCallback(() => {
  //   setIsModalOpen(false)
  //   setIsModalEdit(false);
  //   setIsPersonProfile(false);
  // },[]);

  // const toggleEditModal = useCallback( (id:number) =>{
  //   if(escritura){
  //     setIsModalEdit((prev)=>!prev)
  //     if(id){
  //       setRutPerson(id);
  //       const selectedPerson= persons.find((person)=>person.id === id);
  //       console.log('selectedPerson', selectedPerson)
  //       setPerson(selectedPerson || null);
  //     }else{
  //       setRutPerson(0)
  //       setPerson(null)
  //     }
  //   }else{
  //     alert('no tienes permisos para esta accion')
  //   }
  //   // setRutPerson(rut || 0)

  // },[persons, escritura]);

  // const handleDelete = async(id:number) => {
  //   // event.preventDefault()
  //   if(escritura){
  //       const result = window.confirm('¿Estás seguro de eliminar?')
  //     if(result){
  //       // await deleteAllPersonRepository([id])
  //       await deleteEntity(id)
  //       setPersons([])
  //       setOnDelete((value)=>!value)
  //       toast.success('Eliminado Correctamente')
  //     }
  //   }else{
  //     alert("No tienes permiso requerido")
  //   }
  // }

  const handleCreate: SubmitHandler<IPerson> = useCallback((data) => {
    if (escritura) {
      const selectedDate = new Date(data.fecha_nacimiento)
      const formatDate = format(selectedDate, 'dd-MM-yyyy')
      data.fecha_nacimiento = formatDate;
      data.sexo === "Masculino" ? data.sexo = 1 : data.sexo = 2
      const { region_nombre, provincia_nombre, ...rest } = data;
      rest.estado = rest.estado === true ? 1 : 2;
      console.log('data del formulario', rest);

      createdEntity(rest)
        .then((createdPerson) => {
          toast('Creado exitosamente')
          console.log(createdPerson)
          closeModal();
        })
        .catch((errors) => {
          console.log(errors)
        })
    } else {
      alert('No tienes los permisos requeridos')
    }
  }, [closeModal, escritura])

  const handleEdit: SubmitHandler<IPerson> = useCallback((data) => {
    if (escritura) {
      const cleanedData = mappedPerson(data)
      console.log('ententity.id', entity);
      //   editEntity(entity.id,cleanedData)
      //      .then(()=>{
      //         setPersons([])
      //         setOnDelete((prev)=>!prev)
      //         toast.success('persona editada corectamente')
      //         closeModal()
      //      })
      //      .catch((e)=>{
      //         toast.error(e)
      //         console.log(e)
      //      })
      // }else{
      //   alert('No tienes el permiso requerido')
    }
  }, [rutPerson, closeModal, escritura])

  // const handlePerson = (id:number) => {
  //   // console.log(rut)
  //   setRutPerson(id)
  //   const selectedPerson = persons.find((person)=> person.id === id);
  //   setPerson(selectedPerson || null);
  //   setIsPersonProfile((prev)=>!prev)
  //   console.log('click', rutPerson)
  // }


  // const handlePageSize = () => {
  //   console.log('click')
  //   setPageSize((prev)=> prev + 1)

  //   console.log(pageSize)
  // }

  // const handleRefresh = useCallback(() => {
  //   if(pageSize !== 1){
  //     setPersons([])
  //     setPageSize(1)
  //   }
  // },[pageSize])    

  // const handleSelectedAll = useCallback((event:React.ChangeEvent<HTMLInputElement>):void => {
  //   if(event.target.checked){
  //     const allID = persons.map(({id})=>id)
  //     setSelectedIds(allID)
  //   }else{
  //     setSelectedIds([])
  //   }
  // },[persons]);

  // const handleSelect = useCallback((id:number):void =>{
  //   setSelectedIds((prevSelectedIds)=>{
  //     if(prevSelectedIds.includes(id)){
  //       return prevSelectedIds.filter((selectedId)=> selectedId !== id)
  //     }else{
  //       return [...prevSelectedIds, id]
  //     }
  //   });
  // },[]);

  // const handleDeleteAll = useCallback(async() => {
  //   if(escritura){
  //     if(selectedIds.length >= 1){
  //       //ejecutar el repositorio
  //       const result = window.confirm('¿Estás seguro de eliminar?')
  //       try {
  //         if(result){
  //           // await deleteAllPersonRepository(selectedIds)
  //           await deleteAllEntity(selectedIds)
  //           setSelectedIds([])
  //           setPersons([])
  //           setPageSize(1)
  //           setOnDelete((prev) => !prev)
  //           toast.success('Personas Eliminadas Correctamente')
  //         }
  //       } catch (error) {
  //         toast.error("Error al eliminar personas")
  //         console.log(error)
  //       }
  //   }
  //   }
  // },[selectedIds, escritura])


  // useEffect(()=>{
  //     listEntity(pageSize)
  //       .then((data)=>{
  //           console.log('data list entity:', data)
  //           setPersons((prev) => [...prev, ...data])
  //       })
  //       .catch((e)=>{
  //           console.log(e)
  //       })
  // },[closeModal,onDelete,pageSize])




  return (
    <>
      <Card className=" my-2 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Listado de Personas
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row w-[50%]">

              <PrimaryButtonsComponent
                handlePageSize={handlePageSize}
                handleDeleteAll={handleDeleteAll}
                escritura={escritura}
                personsLength={persons.length}
                handleAddPerson={openModal}
                handleRefresh={handleRefresh}


                showAddButton={true}
                showDeleteButton={true}
                showExportButton={true}
                showForwardButton={true}
                showRefreshButton={true}
              />



            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">



            <div className=" flex w-full md:w-80 mx-2">
              {/* <PrimaryKeyInput  setPersons={setPersons}/> */}
              <PrimaryKeySearch
                setState={setEntities}
                primaryKeyInputs={[
                  { name: 'rut', label: 'Rut', type: 'text' },
                  { name: 'nombre', label: 'Nombre', type: 'text' },
                ]}
              />
            </div>

          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">

            <thead>
              <tr>
                {TABLE_HEAD.map((column, index) => {
                  if (column.key === 'checkbox' && !escritura) {
                    return null;
                  }
                  return (
                    <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      {column.key === "checkbox" ? (
                        <input className="hidden-input" type="checkbox" onChange={handleSelectedAll} />
                      ) : (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {column.cell}
                        </Typography>
                      )
                      }
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {

                entities && entities.map(({ id, rut, nombre, direccion, comuna_nombre, anteojos, correo, fecha_nacimiento, telefono, sexo, estado, dominio_ingles, region_nombre, provincia_nombre }, index) => {
                  const isLast = index === entities.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr className='cursor-pointer' key={index}>
                      {escritura ? (
                        <td className={classes}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(id)}
                            onChange={() => handleSelect(id)}
                          />
                        </td>
                      ) : (<></>)}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {rut}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {nombre}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {direccion}
                        </Typography>

                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {region_nombre}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {provincia_nombre}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {comuna_nombre}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          +569{telefono}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {correo}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {sexo}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {fecha_nacimiento}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {anteojos}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {estado}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {dominio_ingles}
                        </Typography>
                      </td>
                      <td>
                        {escritura ? (
                          <Tooltip content="Editar Persona">
                            <IconButton variant="text" color="blue-gray" onClick={() => toggleEditModal(id)}>
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        ) : (<></>)}

                        {escritura ? (
                          <Tooltip content="Eliminar Persona">
                            <IconButton variant="text" color="blue-gray" onClick={() => handleDeleteAll(id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                              </svg>
                            </IconButton>
                          </Tooltip>
                        ) : (<></>)}

                        {lectura && (
                          <Tooltip content="Ver Persona">
                            <IconButton variant="text" color="blue-gray" onClick={() => handleEntity(id)}>
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
        </CardBody>






        <div>
          <h1>Componente Table</h1>
          <TableComponent
            tableHead={TABLE_HEAD}
            data={entities}

          />
        </div>
      </Card>
      <Outlet />
      {isEntityProfile && <FormularioView onlyRead={true} data={entity} closeModal={closeModal} isOpen={isPersonProfile} />}
      {isModalOpen && <FormularioView required={true} label="Crear Persona" handleChange={handleCreate} isOpen={isModalOpen} closeModal={closeModal} />}
      {isModalEdit && (
        <FormularioView
          required={false}
          data={entity}
          label="Editar Persona"
          handleChange={handleEdit}
          isOpen={isModalEdit}
          closeModal={closeModal}
        />
      )}
    </>
  );
}