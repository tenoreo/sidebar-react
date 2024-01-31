const {Router}=require('express');
const router=Router();
const controladorMoneda=require('../controllers/controladorMoneda');

router.post('/agregar',controladorMoneda.insertCurrency);
router.post('/obtener',controladorMoneda.getCurrency);

module.exports=router;