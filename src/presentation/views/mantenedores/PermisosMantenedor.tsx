import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '../../components';
import TableComponent from '../../components/TableComponent';
import { table_head_permisos } from '../../utils/table_head_utils';
import { useEntityUtils } from '../../hooks';



interface IPermisosProps {
    closeModal: () => void;
    handleChange?: (data: any) => void;
    label: string
}

const PermisosMantenedor: React.FC<IPermisosProps> = ({
    closeModal
}) => {
    const [permisos, setPermisos] = useState([])
    const { selectedIds } = useEntityUtils('/', 's')
    const { control } = useForm()
    const usuariosJson = [
        [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
        [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
        [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
        [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
        [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
        [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
        [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
        [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
        [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
        [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
        [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
        [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
        [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
        [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
        [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
        [1, 1, 'Carlos', '+569112233444', 'carlos@gmail.com', 'Activo', 2, 'Gerente'],
        [1, 2, 'Sandra', '+56922334455', 'sandra@gmail.com', 'Suspendido', 1, 'Supervisor'],
        [1, 3, 'Diego', '+56988771100', 'diego@gmail.com', 'Activo', 3, 'Empleado'],
    ];
    return (
        <div className='bg-white px-4 w-[45%] mx-auto absolute top-[25%] left-[25%] rounded-lg shadow-lg'>
            <div className="flex justify-end items-end">
                <button onClick={closeModal} className="text-red-500">X</button>
            </div>
            <h1 className='text-center font-bold'>Permisos del Sistema</h1>

            <div className='bg-red-100 flex'>
                <div>
                    <TextInputComponent
                        control={control}
                        type='text'
                        name="nombre"
                        label="Nombre"
                    />
                    <TextInputComponent
                        control={control}
                        type='text'
                        name="nombre"
                        label="Funcionalidad"
                    />
                </div>
                {/* <SelectInputComponent
                    control={control}
                    name='funcionalidad'
                    label='Funcionalidad'
                    options={[{ "nombre": "mantenedor" }]}
                /> */}
                <RadioButtonComponent
                    control={control}
                    label='Permiso'
                    name='permiso'
                    options={["Lectura", "Lectura/Escritura"]}
                />
                <button>Add</button>
                <button>Eliminar</button>
            </div>
            <h1>Tabla</h1>

            <TableComponent
                data={usuariosJson}
                selectedIds={selectedIds}
                tableHead={table_head_permisos}
                entidad='Permisos'
            />
        </div>
    )
}

export default PermisosMantenedor