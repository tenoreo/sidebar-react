const {Router}=require('express');
const router=Router();
const controladorUsuario=require('../controllers/controladorUsuario');

router.post('/agregar',controladorUsuario.insertUsers);
router.post('/obtener',controladorUsuario.getUsers);
router.post('/verificar',controladorUsuario.verifyUser);

module.exports=router;