const psql= require('../settings/databaseSettings');

module.exports.getProduct=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idProduct,nombre,unidad,precio FROM productInformation();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.insertProduct=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {nombre,unidad,precio}=req.body;
        const sql='SELECT idProduct FROM insertProduct($1,$2,$3);';
        const result=await client.query(sql,[nombre,unidad,precio]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}