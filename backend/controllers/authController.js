const Admin = require('../models/Admin');
const Student = require('../models/Student');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const nodemailer = require( 'nodemailer' );
const otpGenerator = require( 'otp-generator' );
const otpStorage = new Map();
const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Function to generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Function to generate and store OTP
const generateAndStoreOTP = (email, otp) => {
  const expirationTime = 3 * 60 * 1000; // OTP valid for 5 minutes
  // Store the OTP along with its expiration time
  otpStorage.set(email, otp);
  console.log(otpStorage);

  setTimeout(() => {
    otpStorage.delete(email);
  }, expirationTime); // Remove OTP after 5 minutes
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'arnav20363@iiitd.ac.in',
    pass: 'meatiiitdelhi@123', // use env file for this data , also kuch settings account ki change krni padti vo krliyo
  },
});

const sendOtp = async (req, res) => {
  const { email_id } = req.body;
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  generateAndStoreOTP(email_id, otp);

  // Create an HTML file with the OTP and other data
  const htmlContent = `
    <html>
      <head>
        <style>
          /* Add your styles here */
        </style>
      </head>
      <body>
        <h1>OTP Verification</h1>
        <p>Your OTP for verification is: <strong>${otp}</strong></p>
      </body>
    </html>
  `;

  // Send OTP via email with the HTML content
  const mailOptions = {
    from: 'btp3517@gmail.com',
    to: email_id,
    subject: 'OTP Verification',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

const verifyOtp = async (req, res) => {
  const { email, enteredOTP } = req.body;
  console.log('Entered OTP:', enteredOTP);
  const storedOTP = otpStorage.get(email);
  console.log('Stored OTP:', storedOTP);

  if (!storedOTP || storedOTP.toString() !== enteredOTP.toString()) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  res.status(200).json({ success: true, message: 'OTP verified successfully' });
};



// Register a new student
const addStudent = async (req, res) => {
  try {
    const { email, password, fullName, rollNumber, enrollmentDate, contactNumber } = req.body;

    // Check if student with the same email or rollNumber already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with the same email or rollNumber already exists' });
    }

    // Hash the password using Argon2 before saving it to the database
    const hashedPassword = await argon2.hash(password);

    // Create a new student instance
    const newStudent = new Student({
      email,
      password: hashedPassword,
      fullName,
      rollNumber,
      enrollmentDate,
      contactNumber,
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Student Login
const studentLogin = async (req, res) => {
  console.log("student")
  const { email, password } = req.body;
  const student = await Student.findOne({ email });

  if (!student) {
    return res.staturss(401).json({ message: 'Student not found' });
  }

  const validPassword = await argon2.verify(student.password, password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const tokenPayload = {
    id: student._id,
    email: student.email,
    role: 'student',
  };

  const authtoken = generateToken(tokenPayload);
  const success = true;

  res.status(200).json({ success, authtoken, message: 'Student login successful' });
};

// Admin Login
const adminLogin = async (req, res) => {
  console.log("admin login initiated")
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: 'Admin not found' });
  }

  const validPassword = await argon2.verify(admin.password, password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const tokenPayload = {
    id: admin._id,
    username: admin.username,
    lab: admin.lab,
    role: 'admin',
  };

  const authtoken = generateToken(tokenPayload);
  const success = true;

  res.status(200).json({ success,authtoken, message: 'Admin login successful' });
};

const addAdmin = async (req, res) => {
  try {
    const { username, password, lab, email, fullName } = req.body;
    // Check if admin with the same username or email already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with the same username or email already exists' });
    }
    // Hash the password using Argon2 before saving it to the database
    const hashedPassword = await argon2.hash(password);
    // Create a new admin instance
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      lab,
      email,
      fullName,
    });
    // Save the new admin to the database
    await newAdmin.save();
    res.status(201).json({ message: 'Admin added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { studentLogin, adminLogin, addStudent, addAdmin,sendOtp, verifyOtp };
