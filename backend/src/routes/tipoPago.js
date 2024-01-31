const {Router}=require('express');
const router=Router();
const controladorTipoPago=require('../controllers/controladorTipoPago');

router.post('/agregar',controladorTipoPago.insertPayMethod);
router.post('/obtener',controladorTipoPago.getPayMethod);

module.exports=router;