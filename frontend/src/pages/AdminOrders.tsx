import { useEffect, useState } from "react";
import axios from "axios";
import { Wallet } from "lucide-react";

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
  user: {
    _id: string;
    name: string;
  };
  cartItems: CartItem[];
  totalPrice: number;
  status: string;
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    order_id: string
  ) => {
    const { name, value } = e.target;
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/change-status",
        { order_id, status: value },
        { withCredentials: true }
      );
      console.log(status);
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const response = await axios.get(
          "http://localhost:8000/admin/get-orders",
          { withCredentials: true }
        );
        console.log(response);
        setOrders(response.data);
      };
      fetchOrders();
      async function fetchCategories() {
        const response = await axios.get(
          "http://localhost:8000/user/get-categories",
          { withCredentials: true }
        );
        setCategories(response.data);
      }
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div className="text-center mb-5">Orders</div>

      <div className="mx-auto w-[1200px] flex flex-col justify-center items-center ">
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="flex mx-auto w-[95%] flex-col px-3 py-4 rounded-[20px] shadow-md shadow-slate-600"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span>OrderID:</span>
                  {order._id}
                </div>
                <div className="px-2 flex justify-center items-center py-2 rounded-[15px] bg-blue-50 text-black font-medium text-lg">
                  <select
                    name="category"
                    value={order.status}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                    ) => {
                      handleChange(e, order._id);
                    }}
                  >
                    <option value="" disabled>
                      Select a status
                    </option>

                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span>OrderedBy: </span>
                  {order.user.name}
                </div>
                <div>
                  <span>UserId: </span>
                  {order.user._id}
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
              <div className="flex justify-end items-center mt-4">
                <div
                  className={`${order.status === "paid" && "bg-green-300"} ${
                    order.status === "denied" && "bg-red-300"
                  } ${order.status === "pending" && "bg-blue-300"} ${
                    order.status === "approved" && "bg-blue-300"
                  }`}
                >
                  <span className="font-semibold text-xl">Total Price:</span>{" "}
                  {order.totalPrice}
                </div>
                {/* <button className="bg-green-500 flex justify-center items-center gap-x-2 text-white text-lg font-medium rounded-[10px] px-2 py-2">
                  Pay <Wallet />
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrders;
