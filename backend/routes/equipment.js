const express = require('express');
const {
  addEquipments,
  getEquipmentsByLab,
  updateEquipments,
  getAllEquipments,

  deleteEquipments,
} = require('../controllers/equipmentsController');
const router = express.Router();

router.post('/equipments', addEquipments);
router.get('/equipments',getAllEquipments);
router.get('/equipments/:labName', getEquipmentsByLab);
router.route('/equipments/:id').put(updateEquipments).delete(deleteEquipments);


module.exports = router;
