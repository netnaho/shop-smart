import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  wallet: number;
  location: number;
}

const Wallet = () => {
  const [user, setUser] = useState<User>();
  // const [wallet, setWallet] = useState<number>(0);
  const [amount, setAmount] = useState<number | string>("");

  const [form, setForm] = useState({
    amount: amount,
    currency: "ETB",
    email: user?.email,
    first_name: user?.name,
    last_name: user?.name,
    phone_number: user?.phone,
  });

  const tx_ref = `${form.first_name}-${Date.now()}`;

  const handlePaymentChapa = async () => {
    const res = await axios.post(
      "http://localhost:8000/accept-payment",
      {
        ...form,
        tx_ref,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    window.location.href = res.data.data.checkout_url;
  }
  useEffect(() => {
    try {
      const getInfo = async () => {
        const response = await axios.get(
          "http://localhost:8000/user/user-info",
          {
            withCredentials: true,
          }
        );
        console.log("userInfo", response.data[0]);
        setUser(response.data[0]);
      };
      getInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/top-up-wallet",
        { amount },
        { withCredentials: true }
      );
      console.log("after submit", response.data);
      setUser(response.data);
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <div className="text-xl">Wallet Amount</div>
      <div className="mb-7">
        <span className="font-extrabold text-9xl font-mono">
          {user?.wallet ? user?.wallet : 0}
        </span>
        <span className="text-sm">ETB</span>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(Number(e.target.value));
          }}
          type="number"
          placeholder="Enter amount to deposit"
        />
        <Button
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
        >
          Deposit into Wallet
        </Button>
      </div>
    </div>
  );
};

export default Wallet;
