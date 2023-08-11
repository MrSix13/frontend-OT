/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {useState, useCallback, useEffect} from 'react';
import {toast} from 'react-toastify';

import { useCrud, usePermission } from '.';
import { mappedPerson } from '../utils';



export const useEntityUtils = (entityApiBaseUrl:string, query:string) => {
    const baseUrl = entityApiBaseUrl.startsWith('http') ? entityApiBaseUrl : `http://127.0.0.1:8000${entityApiBaseUrl}`;
    console.log('baseUrl', baseUrl)
    const [entityID, setEntityID] = useState(0);
    const [entity, setEntity] = useState<any | null>(null);
    const [entities, setEntities] = useState([]);
    const [pageSize, setPageSize] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
    const [isEntityProfile, setIsEntityProfile] = useState<boolean>(false);
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const {lectura,escritura} = usePermission();
    const {listEntity, deleteEntity, deleteAllEntity, editEntity} = useCrud(baseUrl)



    const openModal = useCallback(()=>{
        setIsModalOpen(true)
    },[]);

    const closeModal = useCallback(()=>{
        setIsModalOpen(false);
        setIsModalEdit(false);
        setIsEntityProfile(false);
    },[])

    const handlePageSize = () => {
        setPageSize((prev)=> prev + 1)
    };

    const toggleEditModal = useCallback((id:number)=>{
        if(escritura){
            setIsModalEdit((prev)=>!prev)
            if(id){
              setEntityID(id)
              const selectedEntity = entities.find((entity)=>entity.id === id);
              setEntity(selectedEntity || null);
            }else{
                setEntityID(0)
                setEntity(null)
            }
        }else{
            alert("No tienes permisos")
        }
    },[entities, escritura]);

    const handleRefresh = useCallback(()=>{
        if(pageSize !==1){
            setEntities([])
            setPageSize(1)        
        }
    },[pageSize])

    const handleDelete = async(id:number) => {
        if(escritura){
            const result = window.confirm('Estas seguro de eliminar?')
            if(result){
                try {
                    await deleteEntity(id)
                    setEntities([])
                    setOnDelete((value)=>!value)
                    toast.success('Eliminado Correctamente')
                } catch (error) {
                    console.log(error)
                    toast.error('Error al eliminar')
                }
            }
        }
    }


    const handleSelectedAll = useCallback((event:React.ChangeEvent<HTMLInputElement>)=>{
            if(event.target.checked){
                const allID = entities.map(({id})=>id)
                setSelectedIds(allID)
            }else{
                setSelectedIds([])
            }
    },[entities])


    const handleSelect = useCallback((id:number):void =>{
        setSelectedIds((prevSelectedIds)=>{
            if(prevSelectedIds.includes(id)){
                return prevSelectedIds.filter((selectedId)=>selectedId !== id)

            }else{
                return [...prevSelectedIds, id]
            }
        })
    },[])

    const handleDeleteAll = useCallback(async()=>{
        if(escritura){
            if(selectedIds.length >=1){
                const result = window.confirm('¿Estás seguro de eliminar?')
                try {
                    if(result){
                        await deleteAllEntity(selectedIds)
                        setSelectedIds([])
                        setEntities([])
                        setPageSize(1)
                        setOnDelete((prev)=>!prev)
                        toast.success('Eliminados Correctamente')
                    }
                } catch (error) {
                    toast.error('Error al eliminar')
                    console.log(error)
                }
            }
        }
    },[selectedIds, escritura])


    const handleEntity = (id:number) => {
        setEntityID(id)
        const selectedEntity = entities.find((entity)=>entity.id === id)
        setEntity(selectedEntity || null);
        setIsEntityProfile((prev)=>!prev)
    }


    // const handleEdit = useCallback((data)=>{
    //     if(escritura){
    //         const cleanedData = mappedPerson(data)
    //         console.log('edit', cleanedData)
    //         editEntity(entity.id, cleanedData)
    //           .then(()=>{
    //             setEntities([])
    //             setOnDelete((prev)=>!prev)
    //             toast.success('Editado correctamente')
    //             closeModal()
    //           })
    //           .catch((e)=>{
    //             toast.error('Error al editar')
    //             console.log(e)
    //           })
    //     }else{
    //         alert('No tienes permiso requerido')
    //     }
    // },[closeModal, escritura, entityID])




    useEffect(() => {
        listEntity(pageSize, query)
          .then((data) => {
            console.log('useData', data)
            data && setEntities((prev) => (prev ? [...prev, ...data] : [...data]));
          })
          .catch((e) => {
            console.log(e);
          });
      }, [pageSize, onDelete]);



    return{
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
        handleDelete,
        selectedIds,
        setSelectedIds,
        handleSelectedAll,
        handleSelect,
        handleDeleteAll,
        isEntityProfile,
        handleEntity,
        entity
    }
};