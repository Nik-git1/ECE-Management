const Admin = require('../models/Admin')
const Student = require('../models/Student'); // Assuming you have the Student model

const secretKey = 'your-secret-key'; // Replace with your actual secret key

// Function to generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Register a new student
// Student Login
const registerStudent = async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
  
    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }
  
    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    const tokenPayload = {
      id: student._id,
      email: student.email,
    };
  
    const token = generateToken(tokenPayload);
  
    res.status(200).json({ token, message: 'Student login successful' });
  };
  

// Assuming you have an Admin model for admins



// Student Login
const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  const student = await User.findOne({ username });

  if (!student) {
    return res.status(401).json({ message: 'Student not found' });
  }

  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const tokenPayload = {
    id: student._id,
    username: student.email,
  };

  const token = generateToken(tokenPayload);

  res.status(200).json({ token, message: 'Student login successful' });
};

// Admin Login
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(401).json({ message: 'Admin not found' });
  }

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const tokenPayload = {
    id: admin._id,
    username: admin.username,
    lab : admin.lab,
  
  };

  const token = generateToken(tokenPayload);

  res.status(200).json({ token, message: 'Admin login successful' });
};


module.exports = { studentLogin, adminLogin, registerStudent };
