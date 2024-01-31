import { axiosClient } from "./axiosClient";

const insertClient=(identificador,nombre,apellido1,apellido2,correo,tipoIdentificacion,provincia,distrito,canton,descripcion,numero)=>{
    return axiosClient.post('cliente/agregar',{
        identificador:identificador,
        nombre:nombre,
        apellido1:apellido1,
        apellido2:apellido2,
        correo:correo,
        tipoIdentificacion:tipoIdentificacion,
        provincia:provincia,
        distrito:distrito,
        canton:canton,
        descripcion:descripcion,
        numero:numero
    });
}

const viewClient=()=>{
    return axiosClient.post('cliente/obtener',{
    });
}
const viewClientPerID=(identificador)=>{
    return axiosClient.post('cliente/porID',{
        identificador:identificador
    });
}

export{
    insertClient,
    viewClient,
    viewClientPerID
}