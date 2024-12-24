import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Wallet } from "lucide-react";
import jsPDF from "jspdf";

interface CartItem {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
}
interface Order {
  _id: string;
  cartItems: CartItem[];
  totalPrice: number;
  status: string;
}

interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  wallet: number;
  location: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const response = await axios.get(
          "http://localhost:8000/user/get-user-orders",
          { withCredentials: true }
        );
        console.log(response);
        setOrders(response.data);
      };
      fetchOrders();
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

  // const generatePDF = (order: Order) => {
  //   const doc = new jsPDf();

  //   doc.setFontSize(18);
  //   doc.setTextColor(0, 102, 204);
  //   doc.text("order summery", doc.internal.pageSize.width / 2, 20, {
  //     align: "center",
  //   });

  //   doc.setFontSize(12);
  //   doc.text("Order ID:", 10, marginY);
  // };

  const handleOrderPayment = async (
    order_id: string,
    status: string,
    total_price: number
  ) => {
    try {
      if (status === "pending") {
        alert("Please wait until order is approved by system Admin.");
        return;
      }
      if (user) {
        if (total_price > user?.wallet) {
          alert("Insufficient balance");
          return;
        }
      }
      const response = await axios.post(
        "http://localhost:8000/user/pay-for-order",
        { order_id, order_price: total_price },
        { withCredentials: true }
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-[70%] mx-auto mb-5 mt-4">
        <h1 className="font-semibold text-4xl">Orders</h1>
      </div>
      {orders.map((order, index) => {
        return (
          <div
            key={index}
            className="flex w-[70%] mx-auto flex-col px-3 py-4 rounded-[20px] shadow-md shadow-slate-600"
          >
            <div className="flex justify-between items-center">
              <div>
                <span>OrderID:</span>
                {order._id}
              </div>
              <div className="px-2 flex justify-center items-center py-2 rounded-[15px] bg-blue-400 text-white font-medium text-lg">
                {order.status}
              </div>
            </div>
            <div className="mt-5">
              {order.cartItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b-[1px] border-slate-300 pb-1"
                  >
                    <div className="">
                      <img
                        src={item.product.image}
                        className="object-cover w-full h-[80px] rounded-[10px]"
                        alt=""
                      />
                    </div>
                    <div>{item.product.name}</div>
                    <div>
                      {item.product.price} x {item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span>Total Price:</span> {order.totalPrice}
              </div>
              {order.status == "denied" && (
                <div className="bg-red-500 px-2 py-2 flex justify-center items-center rounded-[15px]">
                  Order Canceled
                </div>
              )}
              {order.status !== "denied" && order.status !== "paid" && (
                <button
                  onClick={() => {
                    handleOrderPayment(
                      order._id,
                      order.status,
                      order.totalPrice
                    );
                  }}
                  className="bg-green-500 flex justify-center items-center gap-x-2 text-white text-lg font-medium rounded-[10px] px-2 py-2"
                >
                  Pay <Wallet />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
