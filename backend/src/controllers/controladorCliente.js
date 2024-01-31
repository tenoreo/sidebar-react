const psql= require('../settings/databaseSettings');

module.exports.getClient=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idClient,identificador,nombre,apellido1,apellido2,correo,tipoIdentificacion,direccion,numeroTelefonico FROM clientInformation();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release(); 
    }
}


module.exports.getClientPerID=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {identificador}=req.body;
        const sql='SELECT idClient as id,CONCAT(nombre,\' \',apellido1,\' \',apellido2) AS nombre FROM clientes WHERE identificador=$1;';
        const result=await client.query(sql,[identificador]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release(); 
    }
}

module.exports.insertClient=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {identificador,nombre,apellido1,apellido2,correo,tipoIdentificacion,provincia,distrito,canton,descripcion,numero}=req.body;
        const sql='SELECT idClient FROM insertClient($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);';
        const result=await client.query(sql,[identificador,nombre,apellido1,apellido2,correo,tipoIdentificacion,provincia,distrito,canton,descripcion,numero]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

