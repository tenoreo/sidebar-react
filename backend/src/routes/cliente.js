const {Router}=require('express');
const router=Router();
const controladorCliente=require('../controllers/controladorCliente');

router.post('/agregar',controladorCliente.insertClient);
router.post('/obtener',controladorCliente.getClient);
router.post('/porID',controladorCliente.getClientPerID)
module.exports=router;