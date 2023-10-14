import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative">
      <div className="place-content-center relative z-10 flex flex-col justify-center">
        <form
          className="max-w-[700px] w-full mx-auto bg-white p-8 px-8 rounded-lg border-2"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center">
            <img
              src="/Images/ECE_logo_header_new.png"
              className="max-w-[200px]"
              alt=""
            />
          </div>
          <div className="mb-4 mt-2">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb- w-[300px]">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full py-2 px-3 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full py-2 px-3 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
                type="submit"
                className="w-full my-5 py-2 bg-[#3dafaa] shadow-lg shadow-[#3dafaa]/50 hover:shadow-[#3dafaa]/40 text-white font-semibold rounded-lg"
              >
                Sign In
              </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
