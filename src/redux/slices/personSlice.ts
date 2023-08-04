import { createSlice } from '@reduxjs/toolkit';


const dataFormCreate = {
    nombre: "",
    direccion: "",
    telefono: 0
}


const initialState = {
    toggleEditModal: false,
    toggleCreateModal: false,
    dataFormEdit:{},
    dataFormCreate: dataFormCreate
};


export const personSlice = createSlice({
    initialState,
    name:"PersonReducer",
    reducers:{
        toggleEditModal: (state) =>{
            state.toggleEditModal = !state.toggleEditModal
        },
        toggleCreateModal: (state) =>{
            state.toggleCreateModal = !state.toggleCreateModal
        },

        updateDataFormCreate: (state, {payload})=>{
            state.dataFormCreate = {...state.dataFormCreate, ...payload}
        }
    }
});

export const {toggleCreateModal, toggleEditModal, updateDataFormCreate} = personSlice.actions;

export default personSlice.reducer;