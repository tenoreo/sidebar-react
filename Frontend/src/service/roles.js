import { axiosClient } from "./axiosClient";

const insertRoles=(nombre)=>{
    return axiosClient.post('/roles/agregar',{
        nombre:nombre
    });
}

const viewRoles=()=>{
    return axiosClient.post('/roles/obtener',{

    });
}

export {
    insertRoles,
    viewRoles
}
