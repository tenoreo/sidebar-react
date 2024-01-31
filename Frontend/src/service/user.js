import { axiosClient } from "./axiosClient";

const insertUser=(nombre,apellido1,apellido2,correo,telefono,rol,contrasena)=>{
    return axiosClient.post('/usuario/agregar',{
        nombre:nombre,
        apellido1:apellido1,
        apellido2:apellido2,
        correo:correo,
        telefono:telefono,
        rol:rol,
        contrasena:contrasena,
        puesto:'Cajero'
    });
}

const viewUser=()=>{
    return axiosClient.post('/usuario/obtener',{
    });
}

const verifyUser=(email,password)=>{
    return axiosClient.post('/usuario/verificar',{
        correo:email,
        contrasena:password
    });
}

export {
    insertUser,
    viewUser,
    verifyUser
}
