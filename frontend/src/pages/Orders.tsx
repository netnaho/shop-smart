import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Orders = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div>
      <div className="w-[70%] mx-auto mb-5 mt-4">
        <h1 className="font-semibold text-4xl">Orders</h1>
      </div>

      <div className="flex w-[70%] mx-auto flex-col px-3 py-4 rounded-[20px] shadow-md shadow-slate-600">
        <h1 className="">
          <span className="font-semibold">OrderId:</span>{" "}
          6752157393de104fe4fc1679
        </h1>
        <h1>
          <span className="font-semibold">OrderDate:</span>{" "}
          {data.date.toString()}
        </h1>
        <h1>
          <span className="font-semibold">OrderStatus:</span> {data.status}
        </h1>
      </div>
    </div>
  );
};

export default Orders;
