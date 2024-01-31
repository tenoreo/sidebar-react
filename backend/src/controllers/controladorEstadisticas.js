const psql= require('../settings/databaseSettings');

module.exports.getPerYear=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT ano,total,cantidad FROM perYear();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.getPerMonth=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT mesNumero,Mes,total,cantidad FROM perMonth();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.getPerDay=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql='SELECT total,cantidad FROM perDay();';
        const result=await client.query(sql,[]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}

module.exports.getTodo=async(req,res)=>{
    const client=await psql.connect();
    try {
        const sql1='SELECT total,cantidad FROM perDay();';
        const sql2='SELECT mes,total,cantidad FROM perMonth();';
        const sql3='SELECT ano,total,cantidad FROM perYear();';
        const conjunto=[sql1,sql2,sql3];
        const resultadoFinal=await Promise.all(conjunto.map(res=>{
            return new Promise((resolve)=>{
                resolve(client.query(res,[]))
            })
        })).catch(err=>{
            console.log(err)
        })
        res.status(200).json(resultadoFinal.rows);
    } catch (error) {
        console.log(error);
        res.status(409).json(error);
    }finally{
        client.release();
    }
}