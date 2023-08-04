/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Option, Select } from '@material-tailwind/react';
import React from 'react'
import { Controller } from 'react-hook-form';

interface ISelectInputProps{
    label:string;
    control:any;
    name:string;
    options:any[];
    data?: any;
    onChange?: (value:string) =>void;
}

const SelectInputComponent:React.FC<ISelectInputProps> = ({
    label,
    control,
    name,
    options,
    data,
    onChange
}) => {
  return (
    <div className='flex items-center mb-2 mt-select mt-select-dropdown-up'>
        <label className="text-gray-700 text-sm font-bold w-1/3 text-center">{label}</label>
        <Controller
            name={name}
            control={control}
            defaultValue={data ? data : ""}
            render={({field})=>(
                <Select
                   {...field}
                   value={field.value}
                   defaultValue={data ? data : ""}
                   onChange={(e)=>{
                    field.onChange(e)
                    onChange && onChange(e)
                }}
                  className='shadow appearance-none border rounded py-2 px-3'
                >   
                    
                    {options && options.map((option, index)=>(
                        <Option value={option.id.toString()} key={index}>{option.nombre}</Option>
                    ))}
                   
                </Select>
            )}
        
        />
    </div>
  )
}

export default SelectInputComponent