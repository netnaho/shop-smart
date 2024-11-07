import React, { useState } from "react";
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
          "http://localhost:8000/user/register",
          userData,
          { withCredentials: true }
        );
        alert(response.data.message);
        navigate("/pages/");
      } catch (error: any) {
        alert(error.data?.response?.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form>
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
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
