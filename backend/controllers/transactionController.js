const Transaction = require("../models/Transaction");
const Equipment = require("../models/Equipment");
const Student = require("../models/Student");

//create a borrow request
const createRequest = async (req, res) => {
  try {
    const { studentId, equipmentId, quantity, daysToUse, lab } = req.body;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(400).json({ error: "Equipment not found" });
    }

    // Check if equipment quantity is sufficient for the request
    if (equipment.quantity < quantity) {
      return res.status(400).json({ error: "Not enough equipment available" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({ error: "Student not found" });
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
      status: "requested",
    });

    await request.save();

    res.status(201).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the request" });
  }
};

// Accept a borrow request (Admin)
const acceptRequest = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const request = await Transaction.findById(transactionId);
    if (!request) {
      return res.status(400).json({ error: "Request not found" });
    }

    // Check if the request status is 'requested' before accepting
    if (request.status !== "requested") {
      return res.status(400).json({ error: "Invalid request status" });
    }

    request.status = "accepted";

    const equipment = await Equipment.findById(request.equipment);
    equipment.quantity -= request.quantity;

    await Promise.all([request.save(), equipment.save()]);

    res.status(200).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while accepting the request" });
  }
};

// Decline a borrow request (Admin)
const declineRequest = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const request = await Transaction.findById(transactionId);
    if (!request) {
      return res.status(400).json({ error: "Request not found" });
    }

    // Check if the request status is 'requested' before declining
    if (request.status !== "requested") {
      return res.status(400).json({ error: "Invalid request status" });
    }
    request.status = "declined";
    await request.save();

    res.json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while declining the request" });
  }
};

// Fetch all requests
const getAllRequests = async (req, res) => {
  try {
    const Rrequests = await Transaction.find({ status: "requested" });

    // Assuming that each request has a reference to student and equipment by _id
    const studentIds = Rrequests.map((request) => request.student);
    const equipmentIds = Rrequests.map((request) => request.equipment);

    const students = await Student.find({ _id: { $in: studentIds } });
    const equipments = await Equipment.find({ _id: { $in: equipmentIds } });

    res.status(200).json({ Rrequests, students, equipments });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching requests" });
  }
};

// Fetch borrow requests by student id and request status
const getRequestByStudentIDs = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { status } = req.query;

    // Create a base query with the student ID
    const baseQuery = { student: studentId };

    // If a status is provided in the query, split it into an array and add it to the query conditions
    if (status) {
      const statusArray = status.split(","); // Split the comma-separated string into an array
      baseQuery.status = { $in: statusArray }; // Use $in operator to match any of the provided statuses
    }

    // Fetch requests based on the modified query
    const requests = await Transaction.find(baseQuery);

    const equipmentIds = requests.map((request) => request.equipment);

    // Fetch all equipments based on the array of equipment IDs
    const equipments = [];
    for (const equipmentId of equipmentIds) {
      const equipment = await Equipment.findById(equipmentId);
      if (equipment) {
        equipments.push(equipment);
      }
    }

    res.status(200).json({ requests, equipments });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching requests" });
  }
};

// Confirm a transaction (Admin)
const confirmTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ error: "Transaction not found" });
    }

    // Check if the transaction status is 'active' before confirming
    if (transaction.status !== "active") {
      return res.status(400).json({ error: "Invalid transaction status" });
    }

    transaction.status = "ended";

    const equipment = await Equipment.findById(transaction.equipment);
    equipment.quantity += transaction.quantity;

    await Promise.all([transaction.save(), equipment.save()]);

    res.json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while confirming the transaction" });
  }
};

// Create Return request (Student)
const createReturnRequest = async (req, res) => {
  try {
    const { studentId, transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ error: "Transaction not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({ error: "Student not found" });
    }

    if (transaction.status !== "accepted") {
      return res.status(400).json({ error: "Invalid request status" });
    }

    transaction.status = "returning";
    await transaction.save(); // Use await directly on the save method

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error returning equipment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while returning the equipment" });
  }
};

module.exports = {
  createRequest,
  acceptRequest,
  declineRequest,
  confirmTransaction,
  getAllRequests,
  getRequestByStudentIDs,
  createReturnRequest,
};
