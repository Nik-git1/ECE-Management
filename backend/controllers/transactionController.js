const Transaction = require('../models/Transaction');
const Equipment = require('../models/Equipment');
const Student = require('../models/Student');

//create a request
const createRequest = async (req, res) => {
    try {
      const { studentId, equipmentId, quantity, daysToUse, lab } = req.body;
  
      const equipment = await Equipment.findById(equipmentId);
      if (!equipment) {
        return res.status(400).json({ error: 'Equipment not found' });
      }
  
      // Check if equipment quantity is sufficient for the request
      if (equipment.quantity < quantity) {
        return res.status(400).json({ error: 'Not enough equipment available' });
      }
  
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }
  
      // Calculate the return date based on the number of days to use
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + daysToUse);
  
      const request = new Transaction({
        student: studentId,
        equipment: equipmentId,
        quantity,
        returnDate,
        lab,
        status: 'requested',
      });
  
      await request.save();
  
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the request' });
    }
  };
  

// Accept a request (Admin)
const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Transaction.findById(requestId);
    if (!request) {
      return res.status(400).json({ error: 'Request not found' });
    }

    // Check if the request status is 'requested' before accepting
    if (request.status !== 'requested') {
      return res.status(400).json({ error: 'Invalid request status' });
    }

    request.status = 'active';

    const equipment = await Equipment.findById(request.equipment);
    equipment.quantity -= request.quantity;

    await Promise.all([request.save(), equipment.save()]);

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while accepting the request' });
  }
};

// Decline a request (Admin)
const declineRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Transaction.findById(requestId);
    if (!request) {
      return res.status(400).json({ error: 'Request not found' });
    }

    // Check if the request status is 'requested' before declining
    if (request.status !== 'requested') {
      return res.status(400).json({ error: 'Invalid request status' });
    }
    request.status = 'declined';
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while declining the request' });
  }
};

// Confirm a transaction (Admin)
const confirmTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ error: 'Transaction not found' });
    }

    // Check if the transaction status is 'active' before confirming
    if (transaction.status !== 'active') {
      return res.status(400).json({ error: 'Invalid transaction status' });
    }

    transaction.status = 'ended';

    const equipment = await Equipment.findById(transaction.equipment);
    equipment.quantity += transaction.quantity;

    await Promise.all([transaction.save(), equipment.save()]);

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while confirming the transaction' });
  }
};

module.exports = { createRequest, acceptRequest, declineRequest, confirmTransaction };
