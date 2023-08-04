import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';

interface IRadioButtonProps{
    label:string;
    control:Control<FieldValues>;
    name:string;
    options: string[];
    data?:any;

}


const RadioButtonComponent:React.FC<IRadioButtonProps> = ({
    label,
    control,
    name,
    options,
    data
}) => {
  console.log(data)
  return (
    <div className='px-6 py-2 w-full flex justify-between'>
        <label  className="text-gray-700 text-sm font-bold w-[20%] px-8 text-center">{label}</label>
        {options.map((option, index)=>(
            <div className='px-8 py-2 flex w-1/3 text-center justify-between' key={index}>
                <Controller
                  key={index}
                  name={name}
                  control={control}
                  defaultValue={data ? data : ""}
                  render={({field})=>(
                    <input
                     {...field}
                     type='radio'
                     value={option}
                     defaultChecked={data === option}
                    //  checked={field.value === option}
                     className='mr-2'
                     onChange={(e)=> field.onChange(e.target.value)}
                    />
                  )}
                
                />
                <label className='text-sm'>{option}</label>
            </div>
        ))}
    </div>
  )
}

export default RadioButtonComponent