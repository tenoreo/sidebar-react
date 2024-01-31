import { axiosClient } from "./axiosClient";

const insertTransaction=(fecha,hora,cantidad,precioTotal,iva,subtotal,descuento,numeroPlaca,idProducto,idCliente,tipoPago,idUsuario)=>{
    return axiosClient.post('/transaccion/agregar',{
        fecha:fecha,
        hora:hora,
        cantidad:cantidad,
        precioTotal:precioTotal,
        IVA:iva,
        subtotal:subtotal,
        descuento:descuento,
        numeroPlaca:numeroPlaca,
        idProducto:idProducto,
        idCliente:idCliente,
        tipoPago:tipoPago,
        moneda:1,
        idUsuario:idUsuario
    });
}

const viewTransaction=()=>{
    return axiosClient.post('/transaccion/obtener',{
        
    });
}

const viewTransactionDay=()=>{
    return axiosClient.post('/transaccion/obtenerDia',{
        
    });
}
const viewTransactionMonth=()=>{
    return axiosClient.post('/transaccion/obtenerMes',{
        
    });
}
const viewTransactionYear=()=>{
    return axiosClient.post('/transaccion/obtenerAno',{
        
    });
}

export { 
    insertTransaction,
    viewTransaction,
    viewTransactionDay,
    viewTransactionMonth,
    viewTransactionYear
}
