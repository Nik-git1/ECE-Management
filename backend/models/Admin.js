const mongoose = require('mongoose');

// Define the lab enumeration values
const labEnum = ["lab1", "lab2", "lab3","lab4"];

// Define the admin schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  lab: {
    type: String,
    enum: labEnum,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensure unique email addresses
  },
  // You can add more fields like full name, contact information, permissions, etc.
  // For example:
  fullName: {
    type: String,
  },
});

// Create the admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
