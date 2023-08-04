/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IComunas, IPerson, IProvincias, IRegiones } from "../../interfaces";
import { 
     createPerson, 
     deletePerson,
     editPerson,
     getPersons, 
     getRegiones, 
     getComunas_by_id, 
     getProvincias_by_region_id,
     searchPerson,
     deleteAllPerson,
     exportAllPerson
} from "../../presentation/services/personas_api";
import { mappedPerson } from "../../presentation/utils";


//==============PERSONAS==================

//Crear personas
export const createPersonRepository = async(person:IPerson):Promise<IPerson> => {
    try {
        
        const createdPerson = await createPerson(person);
        return createdPerson
    } catch (error) {
        throw new Error('Error al crear la persona')
    }
};

//Buscar Persona
export const searchPersonRepository = async (rut:string, nombre:string): Promise<IPerson | IPerson[]> => {
    try {
      const searchedPerson = await searchPerson(rut,nombre);
      return searchedPerson;
    } catch (error) {
      throw new Error('Error al buscar a la Persona');
    }
  };
  

// Eliminar Personas
export const deletePersonRepository = async(id:string):Promise<{mensaje?:string}> =>{
    try {
        const delete_person = await deletePerson(id);
        return delete_person
    } catch (error) {
        throw new Error('Error al eliminar Persona')
    }
}

//Eliminar varias Personas
export const deleteAllPersonRepository = async(id:number[]):Promise<{mensaje?:string}> =>{
    try {
        const delete_all_person= await deleteAllPerson(id)
        return delete_all_person
    } catch (error) {
        throw new Error('Error al eliminar varias Personas')
    }
}

//Editar Personas
export const editPersonRepository = async(id:number, data:IPerson):Promise<IPerson> =>{
    try {
        const mapped = mappedPerson(data)
        console.log('data mapeada', mapped)
        const edit_person = await editPerson(id,mapped)
        return edit_person
    } catch (error) {
        throw new Error('Error al editar a la Persona')
    }
}


//Obtener todas las Personas, agregandoles region-provincia
export const getPersonsRepository = async (pageSize?:number):Promise<IPerson[]> =>{
    try {
        const persons = await getPersons(pageSize);
        return persons
    } catch (error) {
        throw new Error('Error al obtener las prsonas')
    }
}


//==============REGIONES==================
export const getRegionesRepository = async():Promise<IRegiones[]> => {
    try {
        const regions = await getRegiones()
        return regions;
    } catch (error) {
        throw new Error('Error al obtener las regiones desde repository')
    }
}

export const exportAllPersonRepository = async(limit?:number):Promise<void> =>{
    try {
        const exportExcel = await exportAllPerson(limit)
        return exportExcel
    } catch (error) {
        console.log(error)
        throw new Error('Error al descargar Personas en excel')
    }
}



//==============PROVINCIAS==================
export const getProvinciasRepository = async (id:string):Promise<IProvincias[]> =>{
    try {
        const provincias = await getProvincias_by_region_id(id)
        return provincias;
    } catch (error) {
        throw new Error('Error al obtener las provincias')
    }
}




//==============COMUNAS==================
export const getComunasRepository=async( id:string ):Promise<IComunas[]> =>{
    try {
        const comunas = await getComunas_by_id(id)
        return comunas;
    } catch (error) {
        throw new Error('Error cargando las comunas')
    }
}



