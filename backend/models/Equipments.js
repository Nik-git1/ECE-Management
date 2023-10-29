const mongoose = require('mongoose');
const {Schema} = mongoose;
const EquipmentSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    quantity: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('equipments', EquipmentSchema);