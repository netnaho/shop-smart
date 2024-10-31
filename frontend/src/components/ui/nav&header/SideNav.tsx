import React, { useEffect, useState } from "react";
import Logo from "../../../assets/shopping-logo.jpg";
import Random from "../../../assets/random.jpg";
import { X, MoveRight } from "lucide-react";

const SideNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleMenuOpenClose = () => {
    setIsMenuOpen(isMenuOpen ? false : true);
  };

  return (
    <div
      className={`  ${
        isMenuOpen
          ? "w-[20%] h-screen border border-blue-200 bg-gray-50 flex flex-col drop-shadow-xl p-5"
          : "w-[3%] h-fit pt-3 "
      }`}
    >
      <div className="flex justify-end">
        {isMenuOpen ? (
          <X onClick={handleMenuOpenClose} />
        ) : (
          <MoveRight onClick={handleMenuOpenClose} />
        )}
      </div>
      <div
        className={
          !isMenuOpen ? "hidden" : "flex flex-col h-full justify-between"
        }
      >
        <div className="flex gap-2  border-b border-gray-300 pb-8">
          <img src={Logo} alt="" className="w-10" />
          <div className="text-xl font-bold bg-gradient-to-r from-[#7810e1] to-[#f97b02] bg-clip-text text-transparent">
            Shop Smart{" "}
            <div className="text-xs font-normal text-black">
              Find Your Happiness
            </div>
          </div>
        </div>

        <div className="h-[80%] flex flex-col gap-5 py-1  overflow-hidden font-bold ">
          <div className="border px-3 py-2">Find Items</div>
          <div className="border px-3 py-2">Find Items</div>
          <div className="border px-3 py-2">Wallet</div>
          <div className="border px-3 py-2">Messaging</div>
          <div className="border px-3 py-2">Find Items</div>
        </div>

        <div className="flex gap-2 border-t pt-2 border-gray-300">
          <img src={Random} alt="" className="w-10 rounded-full" />
          <div className="text-sm font-bold">
            Natnael Getachew{" "}
            <div className="text-xs font-normal">natn.@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;