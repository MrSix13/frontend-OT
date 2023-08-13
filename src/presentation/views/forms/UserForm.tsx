import React from 'react'
import { RadioButtonComponent, TextInputComponent } from '../../components';
import { useForm } from 'react-hook-form';

interface IUserFormPrps {
    closeModal: () => void;
    handleChange?: (data: any) => void;
    label: string
}


const UserForm: React.FC<IUserFormPrps> = ({
    closeModal,
    handleChange,
    label
}) => {
    const { control, handleSubmit } = useForm()
    return (
        <div className='bg-white px-4 w-[90%] max-w-md mx-auto absolute top-[25%] left-[40%] rounded-lg shadow-lg'>
            <div className="flex justify-end items-end">
                <button onClick={closeModal} className="text-red-500">X</button>
            </div>
            <h1 className='text-center text-xl font-semibold mb-4'>{label}</h1>

            <form onSubmit={handleSubmit(handleChange)} className="space-y-4">

                <div className='w-full mt-4 flex flex-col space-y-4'>
                    <TextInputComponent
                        type='text'
                        label='Nombre'
                        name="nombre"
                        control={control}
                    />
                    <TextInputComponent
                        type='text'
                        label='Cargo'
                        name="cargo"
                        control={control}
                    />
                </div>

                <div className='w-full mt-4 flex flex-col space-y-2'>
                    <TextInputComponent
                        type='number'
                        label='Telefono'
                        name="telefono"
                        control={control}
                    />
                    <TextInputComponent
                        type='email'
                        label='Correo'
                        name="correo"
                        control={control}
                    />
                    <div>
                        <RadioButtonComponent
                            control={control}
                            label='Estado'
                            name='estado'
                            options={["Activo", "Suspendido"]}
                        />
                    </div>
                </div>

                <div className='w-full mt-4 flex flex-col space-y-2'>
                    <TextInputComponent
                        type='password'
                        label='Password'
                        name="password1"
                        control={control}
                    />
                    <TextInputComponent
                        type='password'
                        label='Confirmar Password'
                        name="password2"
                        control={control}
                    />
                </div>

                <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded mt-4'>
                    Guardar
                </button>

            </form>
        </div>
    );


}


export default UserForm