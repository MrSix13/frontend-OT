import React,{useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useAppSelector, useAppDispatch } from '../../redux/sotre';
import { addRegions } from '../../redux/slices/utilsSlice';
import { toggleCreateModal, updateDataFormCreate } from '../../redux/slices/personSlice';
import FormularioView from './forms/FormView_v2';
import TextInputComponent from '../components/forms/TextInputComponent';
import { useForm } from 'react-hook-form';
import SelectInputComponent from '../components/forms/SelectInputComponent';
import RadioButtonComponent from '../components/forms/RadioButtonComponent';
import DateInputComponent from '../components/forms/DateInputComponent';
import CheckInputComponent from '../components/forms/CheckInputComponent';
import useCrud from '../hooks/useCrud';


interface IPersonViewProps {
  title:string
}
interface ITab{
    id:number,
    title:string
}

const PersonView:React.FC<IPersonViewProps> = ({
    title
}) => {
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [nextTabId, setNextTabId] = useState(0);

  const {control, register, formState, handleSubmit} = useForm()

  
  const apiBaseURL = '/api/personas';
  const {listEntity} = useCrud(apiBaseURL)

  const listado = listEntity(2).then((listado)=>console.log('listado', listado))

  // console.log('listado',listado)
  
  
  
  const handleAddTab = () => {
    const newTab: ITab = {
      id: nextTabId,
      title: `Tab ${nextTabId}`,
    };
    setTabs((prevTabs)=>[...prevTabs, newTab])
    setNextTabId((prevId)=>prevId + 1)
  };

  const handleCloseTab  = (id:number) => {
    console.log('id', id)
    setTabs((prevTabs)=>prevTabs.filter((tab)=> tab.id !== id))
  };
  
  // console.log('formState', formState)


  // const handleForm = (data) => {
  //   console.log('form', data)
  // }
  const data = {
    rut: "122231",
    nombre: "Fabian"
  }
  const regionsChile = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "Libertador General Bernardo O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibáñez del Campo",
    "Magallanes y de la Antártica Chilena",
  ];
  

  return (
    <div>
        <h1>
            {title}
      <button onClick={handleAddTab}>Añadir pestañas</button>
        
        </h1>
        <Tabs>
          <TabList>
            {tabs.map((tab,index)=>(
              <Tab key={index}>
                <p>contenido</p> <button onClick={()=>handleCloseTab(tab.id)}>X</button>
              </Tab>
            ))}
          </TabList>
          {tabs.map((tab,index)=>(
            <TabPanel key={index}>
              <p>contenido de la pestaña</p>
            </TabPanel>
          ))}

       </Tabs>


       {/* <div className='w-[40%]'>
          <h1>Formulario de Prueba</h1>
          <form onSubmit={handleSubmit(handleForm)} >
            <TextInputComponent 
                label='Rut' 
                type='text' 
                defaultValue='' 
                control={control}
                name="rut"
                // data={data.rut}
            />
            <TextInputComponent 
                label='Nombre' 
                type='text' 
                defaultValue='' 
                control={control}
                name="nombre"
                // data={data.nombre}
            />
            <TextInputComponent 
                label='Direccion' 
                type='text' 
                defaultValue='' 
                control={control}
                name="direccion"
                // data={data.nombre}
            />

            <SelectInputComponent 
                label="Regiones"
                control={control}
                name="region_nombre"
                options={regionsChile} 
            />
            <SelectInputComponent 
                label="Comunas"
                control={control}
                name="comuna_nombre"
                options={regionsChile} 
            />
            <SelectInputComponent 
                label="Provincias"
                control={control}
                name="provincia_nombre"
                options={regionsChile} 
            />

            <TextInputComponent 
                label='Numer' 
                type='number' 
                defaultValue='' 
                control={control}
                name="numero"
                // data={data.nombre}
            />
            <TextInputComponent 
                label='Correo' 
                type='text' 
                defaultValue='' 
                control={control}
                name="correo"
                // data={data.nombre}
            />
            <RadioButtonComponent
               label="Sexo"
               control={control}
               name="sexo"
               options={["Masculino", "Femenino"]}
            />
            <DateInputComponent
              label="Fecha Nacimiento"
              control={control}
              name="fecha_nacimiento"
              type="date"
            />
            <RadioButtonComponent
               label="Anteojos"
               control={control}
               name="anteojos"
               options={["Lejos", "Cerca"]}
            />
            <CheckInputComponent
                label="Estado"
                control={control}
                name="estado"
            />
            <SelectInputComponent
              label='Dominio Ingles'
              control={control}
              name="dominio_ingles"
              options={["Basico", "Medio", "Avanzado", "Nativo"]}
            />
            <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Enviar
                        </button>
          </form>
        </div> */}
    </div>
  )
}

export default PersonView