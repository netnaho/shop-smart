import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    age: "",
  });

  const handleSetUserData = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !userData.fullname ||
      !userData.email ||
      !userData.phone ||
      !userData.location ||
      !userData.password ||
      !userData.password ||
      !userData.age
    ) {
      alert("please fill the form properly");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/register",
          userData,
          { withCredentials: true }
        );
        alert("registered");
        // alert(response.data.message);
        navigate("/login");
      } catch (error: any) {
        alert(error.data?.response?.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-fit bg-gray-100">
           {" "}
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
               {" "}
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
                       
        <div>
                   {" "}
          <div className="mb-4">
                        <label className="block mb-2">Full Name:</label>
                       {" "}
            <input
              type="text"
              value={userData.fullname}
              name="fullname"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
                     {" "}
          </div>
                   {" "}
          <div className="mb-4">
                        <label className="block mb-2">Age:</label>
                       {" "}
            <input
              type="number"
              value={userData.age}
              name="age"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
                     {" "}
          </div>
                   {" "}
          <div className="mb-4">
            // eslint-disable-next-line no-irregular-whitespace            {" "}
            <label className="block mb-2">Location:</label>
                       {" "}
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
                     {" "}
          </div>{" "}
          <div className="mb-4">
                        <label className="block mb-2">Phone Number:</label>
                       {" "}
            <input
              type="number"
              value={userData.phone}
              name="phone"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
                     {" "}
          </div>{" "}
          <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                       {" "}
            <input
              type="email"
              value={userData.email}
              name="email"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
                     {" "}
          </div>
                   {" "}
          <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                       {" "}
            <input
              type="password"
              value={userData.password}
              name="password"
              onChange={handleSetUserData}
              className="w-full px-3 py-2 border rounded-md"
            />
                     {" "}
          </div>
                             {" "}
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
}

export default SignUp;
