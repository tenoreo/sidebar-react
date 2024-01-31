const {Router}=require('express');
const router=Router();
const controladorUnidad=require('../controllers/controladorUnidad');

router.post('/agregar',controladorUnidad.insertUnits);
router.post('/obtener',controladorUnidad.getUnits);

module.exports=router;