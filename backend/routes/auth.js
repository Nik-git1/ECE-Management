// authRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin, studentLogin, addStudent,addAdmin,sendOtp,verifyOtp } = require('../controllers/authController');
 // Assuming you have a token verification middleware
router.post('/admin', adminLogin);
router.post('/student', studentLogin);
router.post('/addStudent', addStudent);
router.post('/addAdmin',addAdmin)
router.route( '/sendotp' ).post( sendOtp )
router.route( '/verifyotp' ).post( verifyOtp )



module.exports = router;
