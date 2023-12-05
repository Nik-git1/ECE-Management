const express = require('express');
const {
  addEquipments,
  getEquipmentsByLab,
  updateEquipments,
  getAllEquipments,

  deleteEquipments,
} = require('../controllers/equipmentsController');
const router = express.Router();

const adminAuthMiddleware =require('../middleware/adminAuth');

router.post('/equipments',adminAuthMiddleware, addEquipments);
router.get('/equipments',getAllEquipments);
router.get('/equipments/:labName', getEquipmentsByLab);
router.put('/equipments/:id', adminAuthMiddleware, updateEquipments);
router.delete('/equipments/:id', adminAuthMiddleware, deleteEquipments);


module.exports = router;
