const mongoose = require('mongoose');

// Define the transaction schema (which also acts as a request)
const transactionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment', // Reference to the Equipment model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now, // Default to the current date and time
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  lab: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'declined', 'active', 'ended'],
    default: 'requested', // Default to 'requested'
    required: true,
  },
  // You can add additional fields if needed, such as admin comments or transaction-specific details.
  adminComments: {
    type: String,
  },
});

// Create the transaction (request) model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
