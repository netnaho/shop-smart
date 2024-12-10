import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Wallet = () => {
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="number" placeholder="Enter amount to deposit" />
        <Button type="submit">Deposit into Wallet</Button>
      </div>
    </div>
  );
};

export default Wallet;
