const express = require('express');
const router = express.Router();
const { createRequest, acceptRequest, declineRequest, confirmTransaction, getAllRequests, getRequestByStudentIDs } = require('../controllers/transactionController');

// Create a new equipment request (Student)
router.post('/requests', createRequest);

// Accept a request (Admin)
router.put('/accept/:transactionId', acceptRequest);

// Decline a request (Admin)
router.put('/decline/:transactionId', declineRequest);

// Confirm a transaction (Admin)
router.put('/transactions/confirm/:transactionId', confirmTransaction);

// Fetch all requests (Admin)
router.get('/requests', getAllRequests);

// Fetch requests of a stuent
router.get('/srequests/:studentId', getRequestByStudentIDs);
// // Get all requests (Admin)
// router.get('/requests', getAllRequests);

module.exports = router;
