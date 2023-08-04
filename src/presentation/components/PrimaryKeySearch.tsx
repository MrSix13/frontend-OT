/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, Tooltip } from '@material-tailwind/react';
import { IPerson } from '../../interfaces';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useCrud from '../hooks/useCrud';

interface IPrimaryKeyState{
  [key:string]: string | number;
}

interface PrimaryKeySearchProps {
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  primaryKeyInputs: {label: string;type: string; name:string}[];
}

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = ({ setState, primaryKeyInputs }) => {
  const { control, handleSubmit } = useForm<IPrimaryKeyState>();
  const [inputValues, setInputValues] = useState<IPrimaryKeyState>({})
  const { searchEntityByPrimaryKeys } = useCrud('/api/personas');
  
  
  const handleInputChange = (name:string, value:string) => {
    setInputValues((prev)=>({...prev, [name]: value}))
  }
  
  const handleSearch = async (data: IPrimaryKeyState) => {
      const searchParams = Object.entries(data)
      .map(([key, value]) => (value ? `${key}=${encodeURIComponent(value)}` : ''))
      .filter((param)=> param !== '')
      .join('&');

      try {
      const response = await searchEntityByPrimaryKeys(searchParams);
       setState(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === ' ' || e.key === 'Enter'){
      e.preventDefault();
      handleSubmit(handleSearch)();
    }
  };

  const handleBlur = () => {
    handleSubmit(handleSearch)();
  };

  const renderInputs = () => {
    return primaryKeyInputs.map((input, index)=>(
      <Controller
        key={index}
        name={input.name}
        control={control}
        defaultValue=''
        render={({field})=>(
          <Input
            {...field}
            label={input.label}
            value={inputValues[input.name] || ''}
            onChange={(e)=>{
              field.onChange(e)
              handleInputChange(input.name, e.target.value)
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        )}
      />
    ))
  }



  return (
      <form className='flex'>
        {renderInputs()}
        <Tooltip content="Buscar">
          <Button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded' type='submit' onClick={handleSubmit(handleSearch)}>
            <MagnifyingGlassIcon className='w-6 h-6'/>
            
          </Button>
        </Tooltip>
      </form>
  );
};

export default PrimaryKeySearch;
