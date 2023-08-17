import * as yup from "yup";

const msg = "Requerido";

export const validationUserSchema = (isEditting: boolean) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    password: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.number(),
    correo: yup.string().email(),
    estado: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });
