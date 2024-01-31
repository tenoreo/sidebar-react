import { axiosClient } from "./axiosClient";

const insertProduct=(nombre,cantidad,unidad)=>{
    return axiosClient.post('/producto/agregar',{
        nombre:nombre,
        precio:cantidad,
        unidad:unidad
    });
} 

const viewProduct=()=>{
    return axiosClient.post('/producto/obtener',{

    });
}

export {
    insertProduct,
    viewProduct
}
