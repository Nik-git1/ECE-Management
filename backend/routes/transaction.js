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
  deleteRequest
} = require("../controllers/transactionController");
const transactionAuthMiddleware = require("../middleware/transactionAuth")

router.post("/requests",transactionAuthMiddleware, createRequest);
router.delete("/requests/delete",transactionAuthMiddleware, deleteRequest); 
router.get("/srequests/:studentId",transactionAuthMiddleware, getRequestByStudentIDs);
router.post("/return",transactionAuthMiddleware, createReturnRequest);

router.put("/accept/:transactionId", acceptRequest);
router.put("/decline/:transactionId", declineRequest);
router.put("/transactions/confirm/:transactionId", confirmTransaction);
router.get("/requests/:status/:lab", getAllRequests);



module.exports = router;
