import { axiosClient } from "./axiosClient";

const insertUnit=(nombre)=>{
    return axiosClient.post('/unidad/agregar',{
        nombre:nombre
    });
}

const viewUnit=()=>{
    return axiosClient.post('/unidad/obtener',{

    });
}

export {
    insertUnit,
    viewUnit
}
