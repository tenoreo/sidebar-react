const {Router}=require('express');
const router=Router();
const controladorRoles=require('../controllers/controladorRoles');

router.post('/agregar',controladorRoles.insertRoles);
router.post('/obtener',controladorRoles.getRoles);

module.exports=router;