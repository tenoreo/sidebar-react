const psql= require('../settings/databaseSettings');

module.exports.getUsers=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idUser,nombre,apellido1,apellido2,correo,telefono,rolNombre,fechaRegistro FROM userInformation();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.insertUsers=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {nombre,apellido1,apellido2,correo,telefono,rol,contrasena,puesto}=req.body;
        const sql='SELECT idUser FROM insertUser($1,$2,$3,$4,$5,$6,$7,$8);';
        const result=await client.query(sql,[nombre,apellido1,apellido2,correo,telefono,rol,contrasena,puesto]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.verifyUser=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {correo,contrasena}=req.body;
        const sql='SELECT idUser FROM verifyUser($1,$2);';
        const result=await client.query(sql,[correo,contrasena]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}