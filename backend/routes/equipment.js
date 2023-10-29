const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipments');
const { body, validationResult } = require('express-validator');

// Add new equipment
router.post('/', [
    body('name', "Name can't be empty").isLength({ min: 1 }),
    body('quantity', "Quantity field can't be empty").isLength({ min: 1 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Equipment.create({
        name: req.body.name,
        quantity: req.body.quantity
    })
    .then(equip => {
        res.json({ equip, message: "Added Successfully!" }); 
    })
    .catch(err => {
        res.status(500).json({ error: 'An error occurred while adding the equipment.' });
    });
});

// Fetch all equipment data
router.get('/', (req, res) => {
    Equipment.find()
        .then(equipments => {
            res.json(equipments);
        })
        .catch(err => {
            res.status(500).json({ error: 'An error occurred while fetching equipment data.' });
        });
});

module.exports = router;
