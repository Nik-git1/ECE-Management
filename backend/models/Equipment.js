const mongoose = require('mongoose');

// Define the lab enumeration values
const labEnum = ["lab1", "lab2", "lab3"];

// Define the equipment schema
const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lab: {
    type: String,
    enum: labEnum,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  allotmentDays: {
    type: String,
    default: 'none',
  },
  type:{
    type:String,
    default:'Miscellaneous',
    required:true,
  }
});

// Create the equipment model
const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
