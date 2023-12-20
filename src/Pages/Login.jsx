import React, { useState ,useContext ,useEffect} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {jwtDecode }from 'jwt-decode'; 
import AuthContext from '../Context/AuthContext';
import ClipLoader from "react-spinners/ClipLoader";

const LoginPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInButton, setSignInButton] = useState(false);
  const [registerStudentOption, setRegisterStudentOption] = useState(false);
  const [OtpSent, setOtpSent] = useState(false);
  const [Otp, setOtp] = useState("");
  const navigate = useNavigate();
  const host = "";
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState();

  const startLoader = () => {
    setLoading(true);
  };

  const stopLoader = () => {
    setLoading(false);
  };

  useEffect(() => {
    startLoader(); stopLoader();
  }, []);

  const handleLoginOptionClick = (option) => {
    if (option === "Register") {
      setRegisterStudentOption(true);
    } else {
      setRegisterStudentOption(false);
      setOtpSent(false);
    }
    setSelectedOption(option);
  };

  const handleSignIn = () => {
    setSignInButton(true);
  };

  const handleAdminLogin = async (e) => {
    console.log("admin tried");
    // // Handle admin login logic here
    if (email && password) {
      const response = await fetch(`${host}/api/auth/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const json = await response.json();
      console.log(json);
    
      if (json.success) {
        
        localStorage.setItem("token",json.authtoken)
        console.log(json.authtoken)
        let decodedToken = jwtDecode(json.authtoken); // Decode the JWT token
        let userData = {
          role:decodedToken['role'],
          id: decodedToken['id'],
          lab: decodedToken['lab'],
          username:decodedToken['username'],
          email:decodedToken['email']
        };
        console.log(userData)
        login(userData);
        navigate('/admin');
      } else {
        alert('Invalid Credentials');
      }
    } else {
      alert("Please fill in both email and password fields.");
    }
  };

  const handleStudentLogin = async () => {
    console.log("Student  tried");
    if (email && password) {
      const response = await fetch(`${host}/api/auth/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const json = await response.json();
      console.log(json);
    
      if (json.success) {
        
        localStorage.setItem("token",json.authtoken)
        console.log(json.authtoken)
        const decodedToken = jwtDecode(json.authtoken); // Decode the JWT token
        const userData = {
          role:decodedToken['role'],
          id: decodedToken['id'],
          email:decodedToken['email']
        };
        console.log(userData)
        login(userData);
        navigate('/student');
      } else {
        alert('Invalid Credentials');
      }
    } else {
      alert("Please fill in both email and password fields.");
    }
  };
  

  

  const handleStudentForm = () => {
    if (email) {
      console.log(email);
    }
  };
  const handleSendOTP = async () => {
    if (email) {
      startLoader();
      const response = await fetch(`${host}/api/auth/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_id: email }),
      });

      const json = await response.json();
      if (json.success) {
        setOtpSent(true);
        setTimeout(() => {
          stopLoader();
        }, 1500);
      } else {
        stopLoader();
        alert("Failed to send OTP.");
      }
    } else {
      alert("Please enter an email address.");
    }
  };
  const handleVerifyOTP = async () => {
    if (email && Otp) {
      const response = await fetch(`${host}/api/auth/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, enteredOTP: Otp }),
      });

      const json = await response.json();
      if (json.success) {
        navigate("/register", { state: { email } }); 
        // Redirect to the appropriate page after OTP verification
      } else {
        alert("Invalid OTP.");
      }
    } else {
      alert("Please enter an email and OTP.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signInButton) {
      console.log(selectedOption);
      switch (selectedOption) {
        case "admin":
          handleAdminLogin();
          break;
        case "student":
          handleStudentLogin();
          break;
        case "Register":
          handleStudentForm();
          break;
        default:
          alert("Please select an option: Admin, Department, Professor.");
          break;
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative">
      <img
        src="/Images/iiitdrndblock2.jpeg"
        className="h-full w-auto object-contain filter blur-sm absolute inset-0"
        alt="Sample image"
      />
      <div className="place-content-center relative z-10 flex flex-col justify-center w-[350px]">
        <form
          className="max-w-[700px] w-full mx-auto bg-white p-8 px-8 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <img
              src="/Images/ECE_logo_header_new.png"
              className='h-20 inline'
              alt="Sample image"
            />
          </div>
          <div>
            <button
              className="w-full my-2 py-2 bg-[#3dafaa] shadow-lg shadow-[#3dafaa]/50 hover:shadow-[#3dafaa]/40 text-white font-semibold rounded-lg"
              onClick={() => handleLoginOptionClick("Register")}
              type="button"
              disabled={OtpSent}
            >
              Register Student
            </button>
          </div>
          {!registerStudentOption ? (
          <>
          <hr className="border-2 border-[#7d7f7f]" />
          <p className="text-gray-600 text-xs mt-2">Log in as:</p>
          <div className="flex mt-1 justify-around">
            <button
              className={`px-4 py-2 rounded-full cursor-pointer border ${
                selectedOption === "admin"
                  ? "bg-[#3dafaa] text-white"
                  : "border-[#3dafaa] hover:bg-[#3dafaa] hover:text-white"
              } outline-none focus:border-[#3dafaa]`}
              onClick={() => handleLoginOptionClick("admin")}
              type="button"
            >
              Admin
            </button>
            <button
              className={`px-4 py-2 rounded-full cursor-pointer border ${
                selectedOption === "student"
                  ? "bg-[#3dafaa] text-white"
                  : "border-[#3dafaa] hover:bg-[#3dafaa] hover:text-white"
              } outline-none focus:border-[#3dafaa]`}
              onClick={() => handleLoginOptionClick("student")}
              type="button"
            >
              Student
            </button>
          </div>
          </>):(null)}
          <div className="justify-center items-center"></div>

          {!OtpSent ? (
            loading ? (
              <div className="flex justify-center">
                <ClipLoader
                  color={'#3dafaa'}
                  loading={loading}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
            <div className="flex flex-col text-black py-2">
              <label>Email Id</label>
              <input
                className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 focus:bg-gray-200 focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )) : (
            <div className="flex flex-col text-black py-2">
              <label>Enter Otp</label>
              <input
                className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 focus:bg-gray-200 focus:outline-none"
                type="Otp"
                value={Otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          {!registerStudentOption ? (
            <>
              <div className="flex flex-col text-black py-2">
                <label>Password</label>
                <input
                  className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 focus:bg-gray-200 focus:outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between text-gray-600 py-2">
                <a href="/forgotpassword">Forgot Password?</a>
              </div>
              <button
                type="submit"
                className="w-full my-5 py-2 bg-[#3dafaa] shadow-lg shadow-[#3dafaa]/50 hover:shadow-[#3dafaa]/40 text-white font-semibold rounded-lg"
                onClick={handleSignIn}
                disabled={!email || !password} 
              >
                Sign In
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="w-full my-5 py-2 bg-[#3dafaa] shadow-lg shadow-[#3dafaa]/50 hover:shadow-[#3dafaa]/40 text-white font-semibold rounded-lg"
              onClick={OtpSent ? handleVerifyOTP : handleSendOTP}
            >
              {OtpSent ? "Verify OTP" : "Send OTP"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;