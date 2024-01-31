const {Router}=require('express');
const router=Router();
const controladorTransaccion=require('../controllers/controladorTransaccion');

router.post('/agregar',controladorTransaccion.insertTransaction);
router.post('/obtener',controladorTransaccion.getTransaction);
router.post('/obtenerDia',controladorTransaccion.getTransactionPerDay);
router.post('/obtenerMes',controladorTransaccion.getTransactionPerMonth);
router.post('/obtenerAno',controladorTransaccion.getTransactionPerYear);
router.post('/pdf',controladorTransaccion.sendTransactionPDF);


module.exports=router;