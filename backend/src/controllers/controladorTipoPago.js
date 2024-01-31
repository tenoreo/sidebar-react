const psql= require('../settings/databaseSettings');

module.exports.getPayMethod=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idPay,nombre FROM paysInformation();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.insertPayMethod=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {nombre}=req.body;
        const sql='SELECT idPay FROM insertPay($1);';
        const result=await client.query(sql,[nombre]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}