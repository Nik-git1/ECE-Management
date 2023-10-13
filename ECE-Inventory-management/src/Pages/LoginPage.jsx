import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate(); // Initialize the navigation function

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption === "admin") {
      // Navigate to the AdminPage if the selected option is "admin"
      navigate("/admin");
    } else if (selectedOption === "student") {
      // Navigate to the StudentPage if the selected option is "student"
      navigate("/student");
    } else {
      // Handle other roles or show an error message
    }
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url('./images/iiitdrndblock2.jpeg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="place-content-center flex flex-col justify-center">
        <div className="max-w-[700px] w-full mx-auto bg-white p-8 px-8 rounded-lg">
          <div className="flex justify-center items-center">
            <img
              src="./images/iiitd_img.png"
              className="max-w-[200px]"
              alt=""
            />
          </div>

          <div className="flex-auto mt-1 mb-4">
            <button
              className={`px-4 py-2 rounded-full cursor-pointer ${
                selectedOption === "admin"
                  ? "bg-[#3dafaa] text-white"
                  : "bg-gray-300 text-black"
              } outline-none focus:border-[#3dafaa] mx-2`}
              onClick={() => handleSelectOption("admin")}
            >
              Admin
            </button>
            <button
              className={`px-4 py-2 rounded-full cursor-pointer ${
                selectedOption === "student"
                  ? "bg-[#3dafaa] text-white"
                  : "bg-gray-300 text-black"
              } outline-none focus:border-[#3dafaa] mx-2`}
              onClick={() => handleSelectOption("student")}
            >
              Student
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col text-black py-2">
              <label>Email Id</label>
              <input
                className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 focus:bg-gray-200 focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-black py-2">
              <label>Password</label>
              <input
                className="text-black rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 focus:bg-gray-200 focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <hr className="border-2 border-[#7d7f7f]" />

            <div className="flex-auto mt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-full cursor-pointer bg-[#3dafaa] text-white outline-none focus:border-[#3dafaa]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
