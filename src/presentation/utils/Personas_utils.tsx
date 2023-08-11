
export const mappedPerson = (data) => {
    data.comuna_id = Number(data.comuna_id)
    data.dominio_ingles = Number(data.dominio_ingles)
    const {provincia_nombre, region_nombre, ...rest} = data;

    rest.telefono = Number(rest.telefono)
    // rest.anteojos = rest.anteojos === "Lejos" ? 1 : rest.anteojos === "Cerca" ? 2 : rest.anteojos;
    rest.sexo = rest.sexo === "Masculino" ? 1 : rest.sexo === "Femenino" ? 2 : rest.sexo;

    const cleanedData = {};
        for (const key in rest) {
          if (rest[key] !== "" && rest[key] !== null && rest[key] !== undefined && rest[key] !== 0) {
            cleanedData[key] = data[key];
          }
        }
    

    return cleanedData

}

export const table_head_cargos = [
    {
        cell: <input type="checkbox"/>,
        key: "checkbox"
    },
    {
        cell: 'Nombre',
        key: 'nombre'
    },
    {
        cell: 'Opciones',
        key: 'opciones'
    },
]


export const TABLE_HEAD = [
    {
        cell: <input type="checkbox"/>,
        key: "checkbox"
    },
    {
        cell: 'Rut',
        key: 'rut'
    },
    {
        cell: 'Nombre',
        key: 'nombre'
    },
    {
        cell: 'Direccion',
        key: 'direccion'
    },
    {
        cell: 'Provincia',
        key: 'provincia_nombre'
    },
    {
        cell: 'Region',
        key: 'region_nombre'
    },
    {
        cell: 'Comuna',
        key: 'comuna_nombre'
    },
    {
        cell: 'Telefono',
        key: 'telefono'
    },
    {
        cell: 'Correo',
        key: 'correo'
    },
    {
        cell: 'Sexo',
        key: 'sexo'
    },
    {
        cell: 'Nacimiento',
        key: 'fecha_nacimiento'
    },
    {
        cell: 'Anteojos',
        key: 'anteojos'
    },
    {
        cell: 'Estado',
        key: 'estado'
    },
    {
        cell: 'Nivel Ingles',
        key: 'dominio_ingles'
    },
    {
        cell: 'Botones',
        key: 'botones'
    },
]


export const dominioInglesMap:{[key:number]:string} = {
    0: 'Sin Estado',
    1: 'Basico',
    2: 'Medio',
    3: 'Avanzado',
    4: 'Nativo'
}

export const estadoMap:{[key:number]:string} = {
    0:'Sin Estado',
    1: 'Activo',
    2: 'Suspendio' 
}

export const generoMap:{[key:string]:string} = {
    1:'Masculino',
    2:'Femenino'
}

