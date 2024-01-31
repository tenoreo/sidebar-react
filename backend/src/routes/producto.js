const {Router}=require('express');
const router=Router();
const controladorProducto=require('../controllers/controladorProducto');

router.post('/agregar',controladorProducto.insertProduct);
router.post('/obtener',controladorProducto.getProduct);

module.exports=router;