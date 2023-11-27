const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  graduationType: {
    type: String,
    enum: ['btech', 'mtech', 'phd'],
    required: true
  },
  contactNumber: {
    type: String,
  },
  branch: {
    type: String,
    enum: ['cse', 'csb', 'csam', 'csd', 'ece', 'csss', 'vlsi','csai'],
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
});

// Create the student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
