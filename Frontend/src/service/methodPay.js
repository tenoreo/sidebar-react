import { axiosClient } from "./axiosClient";

const insertMethodPay=(nombre)=>{
    return axiosClient.post('/tipoPago/agregar',{
        nombre:nombre
    });
}

const viewMethodPay=()=>{
    return axiosClient.post('/tipoPago/obtener',{

    });
}

export {
    insertMethodPay,
    viewMethodPay
}
