import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import { IPerson } from '../../interfaces';
import { getPersonsRepository, searchPersonRepository } from '../../domain/repositories/personasRepository';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface PrimaryKeyState {
  rut:string,
  nombre:string
}

interface FormData{
  rut:number | string,
  nombre:string
}


interface PrimaryKeyProps{
  setPersons: React.Dispatch<React.SetStateAction<IPerson[]>>
}



const PrimaryKeyInput:React.FC<PrimaryKeyProps> = ({
  setPersons,
}) => {
  const {control, handleSubmit} = useForm<FormData>();
  
  
  const [inputValue, setInputValue] = useState<PrimaryKeyState>({
    rut:'',
    nombre:''
  });


  const searchPersonByKey = async (rut:string, nombre:string) =>{
      if(rut || nombre){
        const person = await searchPersonRepository(rut.trim(), nombre.trim())
        setPersons(person)
      }else{
        const persons = await getPersonsRepository()
        setPersons(persons)
      }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconClick = () => {
    handleSearch();
  }

  const handleBlur = () => {
    handleSearch()
  }

  const handleSearch = () => {
    const {rut,nombre} = inputValue
    searchPersonByKey(rut,nombre).catch((e)=>{
      console.log(e)
    })

  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === ' ' || e.key === 'Enter'){
      handleSearch()
    }
  }
  return (
    <>
    <form className='flex' onSubmit={handleSubmit(handleSearch)}>
      <Controller
          name='rut'
          control={control}
          defaultValue=''
          render={({field})=>(
            <Input
              {...field }
              label='Rut'
              type='text'
              value={inputValue.rut}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" onClick={handleIconClick} />}
            />
          )}      
      />
      <Controller
          name='nombre'
          control={control}
          defaultValue=''
          render={({field})=>(
            <Input
              {...field }
              label='Nombre'
              type='text'
              value={inputValue.nombre}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" onClick={handleIconClick} />}
            />
          )}      
      />
    </form>
    
    </>
  )
}

export default PrimaryKeyInput