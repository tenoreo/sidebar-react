const psql= require('../settings/databaseSettings');

module.exports.getCurrency=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT idCurrency,nombre FROM currencyInformation();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.insertCurrency=async(req,res)=>{
    const client=await psql.connect();
    try {
        const {nombre}=req.body;
        const sql='SELECT idCurrency FROM clientInformation($1);';
        const result=await client.query(sql,[nombre]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}