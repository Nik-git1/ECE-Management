const express = require("express");
const router = express.Router();
const {
  createRequest,
  acceptRequest,
  declineRequest,
  confirmTransaction,
  getAllRequests,
  getRequestByStudentIDs,
  createReturnRequest,
} = require("../controllers/transactionController");

// Create a new equipment request (Student)
router.post("/requests", createRequest);

// Accept a borrow request (Admin)
router.put("/accept/:transactionId", acceptRequest);

// Decline a borrow request (Admin)
router.put("/decline/:transactionId", declineRequest);

// Confirm a borrow transaction (Admin)
router.put("/transactions/confirm/:transactionId", confirmTransaction);

// Fetch all borrow requests (Admin)
router.get("/requests", getAllRequests);

// Fetch borrow requests of a student
router.get("/srequests/:studentId", getRequestByStudentIDs);

// Create a return request (Student)
router.post("/return", createReturnRequest);

module.exports = router;
