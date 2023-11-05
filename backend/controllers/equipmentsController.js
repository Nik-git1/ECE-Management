const Equipment = require('../models/Equipment'); // Assuming you have the Equipment model

// Add Equipment
const addEquipments = async (req, res) => {
  try {
    const { name, lab, description, quantity, allotmentDays } = req.body;
    const newEquipment = new Equipment({ name, lab, description, quantity, allotmentDays });
    await newEquipment.save();
    res.status(201).json({ message: 'Equipment created successfully', equipment: newEquipment });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the equipment' });
  }
};

// Retrieve Equipment by Lab
const getEquipmentsByLab = async (req, res) => {
  try {
    const labName = req.params.labName;
    const equipmentList = await Equipment.find({ lab: labName });
    res.json(equipmentList);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching equipment data by lab' });
  }
};

// Retrieve All Equipment
const getAllEquipments = async (req, res) => {
  try {
    const allEquipment = await Equipment.find();
    res.json(allEquipment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all equipment' });
  }
};

// Update Equipment by ID
const updateEquipments = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const { name, lab, description, quantity, allotmentDays } = req.body;
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      equipmentId,
      { name, lab, description, quantity, allotmentDays },
      { new: true }
    );
    res.json({ message: 'Equipment updated successfully', equipment: updatedEquipment });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the equipment' });
  }
};

// Delete Equipment by ID
const deleteEquipments = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    await Equipment.findByIdAndRemove(equipmentId);
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the equipment' });
  }
};


module.exports = { deleteEquipments, getEquipmentsByLab, addEquipments, updateEquipments, getAllEquipments};
