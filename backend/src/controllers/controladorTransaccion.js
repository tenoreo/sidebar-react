const { createPDF } = require('../Functions/createPDF');
const psql= require('../settings/databaseSettings');

module.exports.getTransaction=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idTrans,fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,nombreProducto,nombreCliente,nombrePago,nombreMoneda,nombreUsuario FROM transactionInformation();';
        const result=(await client.query(sql,[])).rows;        
        const final=result.map(element => {
            const fecha=element.fecha;
            const sinT=fecha.toISOString().split('T')[0];
            const tiempo=element.hora;
            return{
                idtrans:element.idtrans,
                fecha:sinT + ' ' +tiempo,
                cantidad:element.cantidad,
                preciototal:element.preciototal,
                iva:element.iva,
                subtotal:element.subtotal,
                descuento:element.descuento,
                numeroplaca:element.numeroplaca,
                nombreproducto:element.nombreproducto,
                nombrecliente:element.nombrecliente,
                nombrepago:element.nombrepago,
                nombremoneda:element.nombremoneda,
                nombreusuario:element.nombreusuario
            }
        });
        res.status(200).json(final);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.getTransactionPerMonth=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idTrans,fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,nombreProducto,nombreCliente,nombrePago,nombreMoneda,nombreUsuario FROM transactionInformationPerMonth();';
        const result=(await client.query(sql,[])).rows;        
        const final=result.map(element => {
            const fecha=element.fecha;
            const sinT=fecha.toISOString().split('T')[0];
            const tiempo=element.hora;
            return{
                idtrans:element.idtrans,
                fecha:sinT + ' ' +tiempo,
                cantidad:element.cantidad,
                preciototal:element.preciototal,
                iva:element.iva,
                subtotal:element.subtotal,
                descuento:element.descuento,
                numeroplaca:element.numeroplaca,
                nombreproducto:element.nombreproducto,
                nombrecliente:element.nombrecliente,
                nombrepago:element.nombrepago,
                nombremoneda:element.nombremoneda,
                nombreusuario:element.nombreusuario
            }
        });
        res.status(200).json(final);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.getTransactionPerDay=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idTrans,fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,nombreProducto,nombreCliente,nombrePago,nombreMoneda,nombreUsuario FROM transactionInformationPerDay();';
        const result=(await client.query(sql,[])).rows;        
        const final=result.map(element => {
            const fecha=element.fecha;
            const sinT=fecha.toISOString().split('T')[0];
            const tiempo=element.hora;
            return{
                idtrans:element.idtrans,
                fecha:sinT + ' ' +tiempo,
                cantidad:element.cantidad,
                preciototal:element.preciototal,
                iva:element.iva,
                subtotal:element.subtotal,
                descuento:element.descuento,
                numeroplaca:element.numeroplaca,
                nombreproducto:element.nombreproducto,
                nombrecliente:element.nombrecliente,
                nombrepago:element.nombrepago,
                nombremoneda:element.nombremoneda,
                nombreusuario:element.nombreusuario
            }
        });
        res.status(200).json(final);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.getTransactionPerYear=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idTrans,fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,nombreProducto,nombreCliente,nombrePago,nombreMoneda,nombreUsuario FROM transactionInformationPerYear();';
        const result=(await client.query(sql,[])).rows;        
        const final=result.map(element => {
            const fecha=element.fecha; 
            const sinT=fecha.toISOString().split('T')[0];
            const tiempo=element.hora;
            return{
                idtrans:element.idtrans,
                fecha:sinT + ' ' +tiempo,
                cantidad:element.cantidad,
                preciototal:element.preciototal,
                iva:element.iva,
                subtotal:element.subtotal,
                descuento:element.descuento,
                numeroplaca:element.numeroplaca,
                nombreproducto:element.nombreproducto,
                nombrecliente:element.nombrecliente,
                nombrepago:element.nombrepago,
                nombremoneda:element.nombremoneda,
                nombreusuario:element.nombreusuario
            }
        });
        res.status(200).json(final);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.insertTransaction=async(req,res)=>{
    const client=await psql.connect();
    try { 
        const {fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,idProducto,idCliente,tipoPago,moneda,idUsuario}=req.body;
        const sql='SELECT idTrans FROM insertTransaction($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);';
        const result=await client.query(sql,[fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,idProducto,idCliente,tipoPago,moneda,idUsuario]);
        
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.sendTransactionPDF=async(req,res)=>{
    const client=await psql.connect();
    try { 
        const {id}=req.body;
        const sql='select idTrans,fecha,hora,cantidad,nombreProducto,precioUnitario,nombreUnidad,precioTotal,IVA,subtotal,descuento,nombreCliente,nombreUsuario from transactionInformationPerID($1);';
        const result=await client.query(sql,[id]);
        const link=createPDF(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}