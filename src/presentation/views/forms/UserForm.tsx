import React from 'react'
import { RadioButtonComponent, TextInputComponent } from '../../components';
import { useForm } from 'react-hook-form';

interface IUserFormPrps {
    closeModal: () => void;
    handleChange?: (data: any) => void;
}

const UserForm: React.FC<IUserFormPrps> = ({
    closeModal,
    handleChange
}) => {
    const { control, handleSubmit } = useForm()
    return (
        <div className='bg-gray-300 px-4 w-[50%] h-[50%] mx-auto absolute top-[25%] left-[25%]'>
            <div className="flex justify-end items-end">
                <button onClick={closeModal}>X</button>
            </div>
            <h1 className='text-center'>Mantenedor de usuarios</h1>


            <form onSubmit={handleSubmit(handleChange)}>



                <div className=' w-[60%]  mt-10 mx-auto flex justify-around'>
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

                <div className='w-[60%]  mt-8 mx-auto flex justify-around'>
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
                <div className='w-[60%]  mt-8 mx-auto flex justify-around'>
                    <TextInputComponent
                        type='password'
                        label='Password'
                        name="password1"
                        control={control}
                    />
                    <TextInputComponent
                        type='password'
                        label='Password'
                        name="Password2"
                        control={control}
                    />

                </div>

                <button type='submit' className='absolute left-[50%] mt-8'>Guardar</button>




            </form>
        </div>
    )
}


export default UserForm