import React, { useEffect } from "react";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const [value, setValue] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    try {
      const sendOtp = async () => {
        const response = await axios.post(
          "http://localhost:8000/user/send-otp",
          {
            email: data,
          }
        );
        console.log(response.data);
      };
      sendOtp();
      alert("Otp has been sent to your phone");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOtpSend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/verify-otp",
        {
          email: data,
          otp: value,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <div>Enter the Otp sent to your number</div>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => {
          setValue(value);
          console.log(value);
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <button
        onClick={() => {
          handleOtpSend();
        }}
      >
        click
      </button>
    </div>
  );
};

export default OtpLogin;
