import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [cartItems, setCartItems] = useState(data);

  // Increment value for a specific item
  const handleIncrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: item.value + 1 } : item
      )
    );
  };

  // Decrement value for a specific item
  const handleDecrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: Math.max(item.value - 1, 0) } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div>
        <div className="w-[80%] mx-auto">
          <h1 className="text-3xl font-semibold mt-10">Your Cart</h1>
        </div>
        {cartItems.length == 0 && (
          <div className="w-[80%] mx-auto flex justify-center items-center mt-20">
            Cart is empty
          </div>
        )}
        <div className="flex flex-col gap-y-4">
          {cartItems.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between w-[80%] mx-auto items-center px-2 py-3 rounded-[15px] shadow-md shadow-black"
              >
                <div>
                  <img className="rounded-[15px] h-16" src={item.img} alt="" />
                </div>
                <div>
                  <h2>{item.title}</h2>
                </div>
                <div className="flex justify-evenly items-center gap-x-3">
                  {/* <Button className="w-[10px] h-[30px] "></Button> */}
                  <span
                    onClick={() => {
                      handleIncrement(item.id);
                    }}
                    className="text-slate-800 cursor-pointer text-lg font-medium bg-slate-100 px-[8px] rounded-xl border-[1px] border-slate-500"
                  >
                    +
                  </span>
                  <span>{item.value}</span>
                  <span
                    onClick={() => {
                      handleDecrement(item.id);
                    }}
                    className="text-slate-800 cursor-pointer text-lg font-medium bg-slate-100 px-[10px] rounded-xl border-[1px] border-slate-500"
                  >
                    -
                  </span>
                  <div
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    className="bg-red-400 ml-10 cursor-pointer w-[50px] h-[40px] rounded-[10px] flex justify-center items-center"
                  >
                    <Trash2 className="text-white " />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-[80%] mx-auto flex justify-between items-center mt-7">
          <div>
            <span className=" font-semibold text-lg">Total Cost:</span>{" "}
            {cartItems.reduce((acc, cur) => {
              return acc + cur.price;
            }, 0)}{" "}
            ETB
          </div>
          <Link
            to="/orders"
            state={{
              orderItems: cartItems,
              date: Date.now(),
              status: "pending",
            }}
          >
            <Button className=" bg-blue-700 text-white">Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
