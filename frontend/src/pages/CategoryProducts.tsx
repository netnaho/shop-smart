import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
const CategoryProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 0,
      title: "Iphones",
      img: "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 5.5,
      value: 0,
    },
    {
      id: 1,
      title: "Headsets",
      img: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGVsZWN0cm9uaWMlMjBnYWRnZXRzfGVufDB8fDB8fHww",
      price: 3.0,
      value: 0,
    },
    {
      id: 2,
      title: "NIKE",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: 6000.0,
      value: 0,
    },
    {
      id: 3,
      title: "PS5",
      img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FtaW5nfGVufDB8fDB8fHww",
      price: 20000.3,
      value: 0,
    },
    {
      id: 4,
      title: "Computer Case",
      img: "https://plus.unsplash.com/premium_photo-1671439135739-96bbe677c38c?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 150000.7,
      value: 0,
    },
    {
      id: 5,
      title: "Mechanical Keyboards",
      img: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 8000.0,
      value: 0,
    },
    {
      id: 6,
      title: "Clothes",
      img: "https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 2000.5,
      value: 0,
    },
    {
      id: 7,
      title: "Books & E-Books",
      img: "https://images.unsplash.com/photo-1616687551818-a9218cddd2dc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 1200.2,
      value: 0,
    },
  ]);

  useEffect(() => {
    try {
      async function fetchCategories() {
        const response = await axios.get(
          "http://localhost:8000/user/get-categories"
        );
        console.log(response);
      }
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Increment value for a specific item
  const handleIncrement = (id: string) => {
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: item.value + 1 } : item
      )
    );
  };

  // Decrement value for a specific item
  const handleDecrement = (id: string) => {
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: Math.max(item.value - 1, 0) } : item
      )
    );
  };

  return (
    <div>
      <div
        className="h-[400px] bg-black flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          // opacity: 0.7,
          backgroundColor: "black",
        }}
      >
        <h1 className=" z-20 text-white text-5xl font-medium">Electronics</h1>
      </div>
      <div>
        <div>
          <div className="w-[90%] mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-semibold text-slate-600 text-center my-10">
              Electronics
            </h1>
            <Link to="/cart" state={products.filter((item) => item.value > 0)}>
              <button className="bg-slate-500 p-3 rounded-xl relative">
                <span className="absolute bg-blue-500 text-white p-1 w-[25px] h-[25px] rounded-full flex justify-center items-center -top-1 -right-1">
                  {products.reduce((acc, cur) => {
                    return acc + cur.value;
                  }, 0)}
                </span>
                <ShoppingCart
                  strokeWidth={2.75}
                  className="w-[28px] h-[28px] text-white"
                />
              </button>
            </Link>
          </div>

          <div className="w-[90%] mx-auto">
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
              {products.map((item, index) => (
                <Card
                  shadow="sm"
                  key={index}
                  isPressable
                  onPress={() => console.log("item pressed")}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="w-full object-cover h-[200px]"
                      src={item.img}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.title}</b>
                    <div className="flex justify-evenly items-center gap-x-3">
                      {/* <Button className="w-[10px] h-[30px] "></Button> */}
                      <span
                        onClick={() => {
                          handleIncrement(item.id);
                        }}
                        className="text-slate-800 text-lg font-medium bg-slate-100 px-[8px] rounded-xl border-[1px] border-slate-500"
                      >
                        +
                      </span>
                      <span>{item.value}</span>
                      <span
                        onClick={() => {
                          handleDecrement(item.id);
                        }}
                        className="text-slate-800 text-lg font-medium bg-slate-100 px-[10px] rounded-xl border-[1px] border-slate-500"
                      >
                        -
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
