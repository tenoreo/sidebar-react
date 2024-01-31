const {Router}=require('express');
const router=Router();
const controladorEstadistica=require('../controllers/controladorEstadisticas');

router.post('/ano',controladorEstadistica.getPerYear);
router.post('/mes',controladorEstadistica.getPerMonth);
router.post('/dia',controladorEstadistica.getPerDay);
router.post('/todo',controladorEstadistica.getTodo);
module.exports=router;