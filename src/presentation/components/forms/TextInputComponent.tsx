import { Input } from '@material-tailwind/react';
import React from 'react'
import { Controller } from 'react-hook-form';


interface ITextInputProps{
    label:string;
    name:string;
    defaultValue?:string;
    onlyRead?:boolean;
    type:string;
    control:any;
    data?:any;
}

const TextInputComponent:React.FC<ITextInputProps> = ({
    label,
    type,
    control,
    name,
    defaultValue= "",
    onlyRead,
    data
}) => {
  return (
    <div  className="flex items-center mb-2">
        <label className="label-input w-1/3">{label}</label>
        <Controller
          name={name}
          
          control={control}
          defaultValue={data ? data : ""}
          render={({field})=>(
            <Input
            {...field}
             label={label}
             id={label}
            //  required={true}
             type={type}
             readOnly={onlyRead}
             className='custom-input py-2 px-3 w-2/3'
            />
          )}
        />
    
    </div>
  )
}

export default TextInputComponent