import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSetUserData = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      alert("please fill the form properly");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/login",
          userData,
          { withCredentials: true }
        );
        console.log(response);
        alert(response.data.message);
        navigate("/");
      } catch (error: any) {
        alert(error.data?.response?.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={userData.email}
              name="email"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={userData.password}
              name="password"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end mb-2">
            <Link to="/otp-phone" state={userData.email}>
              <span className="text-blue-800">forgot passowrd</span>
            </Link>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
