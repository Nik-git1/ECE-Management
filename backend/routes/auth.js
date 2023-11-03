// authRoutes.js

const express = require('express');
const router = express.Router();
const { adminLogin, studentLogin, registerStudent } = require('../controllers/authController');
const { verifyToken } = require('../auth'); // Assuming you have a token verification middleware
router.post('/admin', adminLogin);

router.post('/student', studentLogin);
router.post('/addStudent', registerStudent);

// Example of a protected route for admins (requires a valid token)
router.get('/admin-protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Admin-protected route accessed successfully' });
});

// Example of a protected route for students (requires a valid token)
router.get('/student-protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Student-protected route accessed successfully' });
});

module.exports = router;
