const express = require('express');
const router = express.Router();
const { createRequest, acceptRequest, declineRequest, confirmTransaction, getAllRequests } = require('../controllers/transactionController');

// Create a new equipment request (Student)
router.post('/requests', createRequest);

// Accept a request (Admin)
router.put('/requests/accept/:transactionId', acceptRequest);

// Decline a request (Admin)
router.put('/requests/decline/:transactionId', declineRequest);

// Confirm a transaction (Admin)
router.put('/transactions/confirm/:transactionId', confirmTransaction);

// Get all requests (Admin)
// router.get('/requests', getAllRequests);

module.exports = router;
