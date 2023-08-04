import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Draggable,{DraggableData, DraggableEvent} from 'react-draggable';
import { FormContext } from '../../utils/FormProvider';

import { getRegionesRepository,getProvinciasRepository,getComunasRepository } from '../../../domain/repositories/personasRepository';
import { IPerson, IProvincias, IRegiones, IComunas } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/sotre';
import SelectInputComponent from '../../components/forms/SelectInputComponent';
import { CheckInputComponent, DateInputComponent, RadioButtonComponent, TextInputComponent } from '../../components';

interface FormModalProps{
  label?:string;
  required?: boolean;
  isOpen?: boolean;
  onlyRead?:boolean;
  data?:IPerson | null;
  closeModal?: () => void;
  handleChange?: (data:IPerson) => void;
  hanldeInputChange?: (data:IPerson) => void;
}

type Position = {
  xRate:number;
  yRate:number;
}

const FormularioView: React.FC<FormModalProps> = ({
  isOpen, 
  closeModal, 
  handleChange,
  label, 
  required, 
  data,
  hanldeInputChange,
  onlyRead
}) => {
  const [regions, setRegions] = useState<IRegiones[]>([])
  const [provincias, setProvincias] = useState<IProvincias[]>([])
  const [comunas, setComunas] = useState<IComunas[]>([])
  const [currentPosition, setCurrenPosition] = useState<Position>({
    xRate:20,
    yRate:-window.innerHeight
  })
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedProvincia, setSelectedProvincia] = useState<string>('')
  const [selectedComuna, setSelectedComuna] = useState<string>('')
  const [toggle, setIsToggle] = useState<boolean>(true);
  const [formData, setFormData] = useState<IPerson | null>(data);


  const { register,control, handleSubmit, formState: { errors } } = useForm<IPerson>();

  const onDrag = (_e: DraggableEvent, data: DraggableData) => {
    setCurrenPosition({ xRate: data.lastX, yRate: data.lastY });
  };
  const dominioIngles = [
    {
      id:1,
      nombre:'Basico'
    },
    {
      id:2,
      nombre:'Medio'
    },
    {
      id:3,
      nombre:'Avanzado'
    },
    {
      id:4,
      nombre:'Nativo'
    },
  ]
  useEffect(()=>{
     setFormData(data ? data : null);
  },[data])

  //LLamar a las regiones
  useEffect(()=>{
      getRegionesRepository()
          .then((regiones)=>{
            setRegions(regiones)
          })
          .catch((errors)=>{
            console.log(errors)
          })
  },[])

  // LLamar a las provincias por region id
  useEffect(()=>{
    if(selectedRegion){
        getProvinciasRepository(selectedRegion)
          .then((provincias)=>{
            setProvincias(provincias)
          })
          .catch((errors)=>{
            console.log(errors)
          })
    }
  },[selectedRegion])
  //LLaar a las comunas por Provincias id
  useEffect(()=>{
      if(selectedProvincia){
        getComunasRepository(selectedProvincia)
            .then((comuna)=>{
              setComunas(comuna)
            })
            .catch((errors)=>{
              console.log(errors)
            })
      }
  },[selectedProvincia])
  // const windowWidth = window.innerWidth;
  //   const windowHeight = window.innerHeight;
  const handleRegionChange = (value:string) => {
    setSelectedRegion(value)
  }
  const handleProvinciaChange = (value:string) => {
    setSelectedProvincia(value)
  }
  const handleComunaChange = (value:string) => {
    setSelectedComuna(value)
  }
  console.log('form data', formData)
  console.log('data', data)
  return (
    <>
    
      {isOpen && (

          <Draggable 
               onDrag={onDrag} 
               position={{
                x: currentPosition.xRate,
                y:currentPosition.yRate
               }}
               handle='.draggable-handle'>
                <div className="custom-draggable draggable-handle bg-white max-w-md mx-auto shadow-2xl">
                  <div className=''>
                      <h1 className="text-center mb-4">{label}</h1>
                      <div className=' flex justify-between'>
                        <button onClick={() => setIsToggle(!toggle)}>Help</button>
                        <button onClick={closeModal}>Close</button>
                      </div>
                  </div>
                  

                  <form onSubmit={handleSubmit(handleChange)} className="bg-white shadow-md rounded px-8 pt-2 pb-4 mb-2">
                    
                      {/* Rut */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="rut" className="text-gray-700 text-sm font-bold w-1/3">
                        Rut
                      </label>
                      <input
                        className={`shadow appearance-none border rounded py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rut ? 'border-red-500' : ''}`}
                        id="rut"
                        type="text"
                        // maxLength={11}
                        readOnly={onlyRead}
                        placeholder={toggle ? '' : 'Ingresar Rut'}
                        defaultValue={formData?.rut || ''}
                        {...register('rut', { required: required })}
                      />
                    </div> */}
                    <TextInputComponent 
                        label='Rut' 
                        type='text' 
                        defaultValue='' 
                        control={control}
                        name="rut"
                        data={formData?.rut || ""}
                      />
                  
                      {/* Nombre */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="nombre" className="text-gray-700 text-sm font-bold w-1/3">
                        Nombre
                      </label>
                      <input
                        className={`shadow appearance-none border rounded py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nombre ? 'border-red-500' : ''}`}
                        id="nombre"
                        type="text"
                        readOnly={onlyRead}
                        defaultValue={formData?.nombre || ''}
                        placeholder={toggle ? '' : 'Ingresar Nombre'}
                        {...register('nombre', { required: required })}
                      />
                    </div> */}

                    <TextInputComponent 
                      label='Nombre' 
                      type='text' 
                      defaultValue='' 
                      control={control}
                      name="nombre"
                      data={formData?.nombre || ""}
                      />

                      {/* Direccion */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="direccion" className="text-gray-700 text-sm font-bold w-1/3">
                        Dirección
                      </label>
                      <input
                        className={`shadow appearance-none border rounded py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.direccion ? 'border-red-500' : ''}`}
                        id="direccion"
                        type="text"
                        readOnly={onlyRead}
                        defaultValue={formData?.direccion || ''}
                        placeholder={toggle ? '' : 'Ingresar Dirección'}
                        {...register('direccion', { required: required })}
                      />
                    </div> */}

                    <TextInputComponent 
                      label='Direccion' 
                      type='text' 
                      defaultValue='' 
                      control={control}
                      name="direccion"
                      data={formData?.direccion || ""}
                      />




                      {/* Region */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="regiones" className="text-gray-700 text-sm font-bold w-1/3">
                        Región
                      </label>
                      <select
                        disabled={onlyRead}
                        className={`w-2/3 p-2 border rounded focus:outline-none focus:shadow-outline ${errors.region_nombre ? 'border-red-500' : ''}`}
                        id="regiones"
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setSelectedRegion(e.target.value)}
                      >
                        <option value="">{formData ? formData.region_nombre : 'Seleccionar Region'}</option>
                        {regions && regions.length > 0 &&  regions.map((region) => (
                          <option key={region.id} value={region.id}>{region.nombre}</option>
                        ))}
                      </select>
                    </div> */}
                    


                    <SelectInputComponent
                       label="Region"
                       control={control}
                       name="region_nombre"
                       onChange={handleRegionChange}
                       options={regions}
                       data={formData?.region_nombre || ""}   
                    />

                      {/* provincia */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="provincia" className="text-gray-700 text-sm font-bold w-1/3">
                        Provincia
                      </label>
                      <select
                        disabled={onlyRead}
                        className={`w-2/3 p-2 border rounded focus:outline-none focus:shadow-outline ${errors.provincia ? 'border-red-500' : ''}`}
                        id="provincia"
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setSelectedProvincia(e.target.value)}
                        >
                        <option value="">{formData ? formData.provincia_nombre : 'Seleccionar Provincia'}</option>
                    
                        {provincias && provincias.length > 0 && provincias.map((provincia) => (
                            <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                        ))}
                      </select>
                    </div> */}



                    <SelectInputComponent 
                      label="Provincias"
                      control={control}
                      name="provincia_nombre"
                      options={provincias}
                      onChange={handleProvinciaChange}
                      data={formData?.provincia_nombre || ""} 
                    />

                      {/* Comuna */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="comuna" className="text-gray-700 text-sm font-bold w-1/3">
                        Comuna
                      </label>
                      <select
                        className={`w-2/3 p-2 border rounded focus:outline-none focus:shadow-outline ${errors.comuna_id ? 'border-red-500' : ''}`}
                        id="comuna"
                        disabled={onlyRead}
                        {...register('comuna_id', { required: required })}
                      >
                        <option value="">{formData ? formData.comuna_nombre : 'Seleccionar Comuna'}</option>
      
                        {comunas && comunas.length > 0 && comunas.map((comuna) => (
                          <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
                        ))}
                      </select>
                    </div> */}

                      <SelectInputComponent 
                        label="Comunas"
                        control={control}
                        name="comuna_id"
                        options={comunas} 
                        onChange={handleComunaChange}
                        data={formData?.comuna_nombre || ""} 
                       />






                      {/* Telefono */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="telefono" className="text-gray-700 text-sm font-bold w-1/3">
                        Telefono
                      </label>
                      <input
                        className={`shadow appearance-none border rounded-full py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.telefono ? 'border-red-500' : ''}`}
                        id="telefono"
                        type="number"
                        readOnly={onlyRead}
                        defaultValue={formData?.telefono || ''}
                        placeholder={toggle ? '' : 'Ingresar Telefono'}
                        {...register('telefono', { required: required })}
                      />
                    </div> */}


                    <TextInputComponent 
                      label='Telefono' 
                      type='number' 
                      defaultValue='' 
                      control={control}
                      name="telefono"
                      data={formData?.telefono || ""}
                     />





                      {/* Correo*/}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="correo" className="text-gray-700 text-sm font-bold w-1/3">
                        Correo
                      </label>
                      <input
                        className={`shadow appearance-none border rounded py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.correo ? 'border-red-500' : ''}`}
                        id="correo"
                        type="mail"
                        readOnly={onlyRead}
                        defaultValue={formData?.correo || ''}
                        placeholder={toggle ? '' : 'Ingresar correo'}
                        {...register('correo', { required: required })}
                      />
                    </div> */}

                    <TextInputComponent 
                      label='Correo' 
                      type='text' 
                      defaultValue='' 
                      control={control}
                      name="correo"
                      data={formData?.correo || ''}
                    />







                      {/* Sexo */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="masculino" className="text-gray-700 text-sm font-bold w-1/3">
                        Sexo
                      </label>
                      <div className='px-10 py-2 w-full flex justify-between'>
                        <div>
                          <input
                            className="mr-2"
                            id="masculino"
                            type="radio"
                            disabled={onlyRead}
                            value="Masculino"
                            defaultChecked={formData?.sexo === 'Masculino'}
                            {...register('sexo', { required: required })}
                          />
                          <label htmlFor="femenino" className='text-sm'>Masculino</label>
                        </div> */}
                          {/* <div>
                            <input
                              className={`mr-2 ${errors.correo ? 'border-red-500' : ''}` }
                              id="femenino"
                              type="radio"
                              value="Femenino"
                              disabled={onlyRead}
                              defaultChecked={formData?.sexo === 'Femenino'}
                              {...register('sexo', { required: required })}
                              />
                            <label htmlFor="femenino" className='text-sm'>Femenino</label>
                          </div>

                          </div>
                          </div>
                          */}


                        <RadioButtonComponent
                          label="Sexo"
                          control={control}
                          name="sexo"
                          options={["Masculino", "Femenino"]}
                          data={formData?.sexo}
                        />






                      {/* Fecha de nacimiento */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="telefono" className="text-gray-700 text-sm font-bold w-1/3">
                        Fecha de Nacimiento
                      </label>
  
                      <input
                        className={`shadow appearance-none border rounded py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fecha_nacimiento ? 'border-red-500' : ''}`}
                        id="fecha_nacimiento"
                        type="date"
                        readOnly={onlyRead}
                        defaultValue={formData?.fecha_nacimiento || '00-00-2000'}
                        placeholder={toggle ? '' : 'Ingresar Telefono'}
                        {...register('fecha_nacimiento', { required: required })}
                      />
                    </div> */}

                    <DateInputComponent
                        label="Fecha Nacimiento"
                        control={control}
                        name="fecha_nacimiento"
                        type="date"
                        data={formData?.fecha_nacimiento}
                    />

                      {/* Anteojos */}
                    {/* <div className="flex items-center mb-2">
                      <label htmlFor="anteojos" className="text-gray-700 text-sm font-bold w-1/3">
                        Anteojos
                      </label>
                      <div className='px-14 py-2 w-full flex justify-between'>
                        <div>
                          <input
                            className={`mr-2 ${errors.anteojos ? 'border-red-500' : ''}`}
                            id="Lejos"
                            type="radio"
                            value="Lejos"
                            disabled={onlyRead}
                            defaultChecked={formData?.anteojos === 'Lejos'}
                            {...register('anteojos', { required: required })}
                          />
                          <label htmlFor="lejos" className='text-sm'>Lejos</label>
                        </div>


                        <div>
                          <input
                            className="mr-2"
                            id="Cerca"
                            type="radio"
                            disabled={onlyRead}
                            value="Cerca"
                            defaultChecked={formData?.anteojos === 'Cerca'}
                            {...register('anteojos', { required: required })}
                            />
                          <label htmlFor="cerca" className='text-sm'>Cerca</label>
                        </div>
                        
                      </div>
                    </div> */}

                    <RadioButtonComponent
                        label="Anteojos"
                        control={control}
                        name="anteojos"
                        options={["Lejos", "Cerca"]}
                        data={formData?.anteojos}
                      />


                      {/* Estado */}
                    {/* <div className="flex items-center mb-4">
                      <label htmlFor="masculino" className="text-gray-700 text-sm font-bold w-1/3">
                        Estado
                      </label>
                      <div className='px-14 py-2 w-full flex justify-between'>
                      
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input disabled={onlyRead} type="checkbox" id="Suspendido" defaultChecked={formData?.estado === 'Suspendido'} value={1} className="sr-only peer" {...register('estado', { required: required })}/>
                          <div className="w-9 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-700 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Suspendido</span>
                        </label>
                      </div>
                    </div> */}



                    <CheckInputComponent
                      label="Estado"
                      control={control}
                      name="estado"
                      data={formData?.estado}
                      />


                      {/* Dominio Ingles */}
                    {/* <div className="flex items-center mb-4">
                      <label htmlFor="comuna" className="text-gray-700 text-sm font-bold w-1/3">
                        Dominio Ingles
                      </label>
                      <select
                        className={`w-2/3 p-2 border rounded focus:outline-none focus:shadow-outline ${errors.dominio_ingles ? 'border-red-500' : ''}`}
                        id="comuna"
                        disabled={onlyRead}
                        {...register('dominio_ingles', { required: required })}
                      >
                        <option value="">{formData ? formData.dominio_ingles : 'Seleccionar Dominio'}</option>
                        <option value={1}>Basico</option>
                        <option value={2}>Medio</option>
                        <option value={3}>Nativo</option>
                        
                      </select>
                    </div> */}

                    <SelectInputComponent
                        label='Dominio Ingles'
                        control={control}
                        name="dominio_ingles"
                        options={dominioIngles}
                        data={formData?.dominio_ingles || ""} 
                    />

                    <div className="flex justify-center mt-4">
                      {onlyRead ? (<></>) : (
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Enviar
                        </button>
                      )}
                    </div>
                  </form>
                </div>
          </Draggable>
      )}
    </>
  );
};

export default FormularioView;
