import React, { useEffect, useState } from "react";
import Ripple from "@/components/ui/ripple";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/cartContext";
// import SideNav from "@/components/ui/nav&header/SideNav";
//import { Button } from "@/components/ui/button";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  availableQuantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  price: number;
  value: number;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const { cart, addToCart, removeFromCart, decreaseQuantity, clearCart } =
    useCart();
  // const list = [
  //   {
  //     title: "Iphones",
  //     img: "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     price: "$5.50",
  //   },
  //   {
  //     title: "Headsets",
  //     img: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGVsZWN0cm9uaWMlMjBnYWRnZXRzfGVufDB8fDB8fHww",
  //     price: "$3.00",
  //   },
  //   {
  //     title: "NIKE",
  //     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
  //     price: "$10.00",
  //   },
  //   {
  //     title: "PS5",
  //     img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FtaW5nfGVufDB8fDB8fHww",
  //     price: "$200.30",
  //   },
  //   {
  //     title: "Computer Case",
  //     img: "https://plus.unsplash.com/premium_photo-1671439135739-96bbe677c38c?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     price: "$15.70",
  //   },
  //   {
  //     title: "Mechanical Keyboards",
  //     img: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     price: "$8.00",
  //   },
  //   {
  //     title: "Clothes",
  //     img: "https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     price: "$7.50",
  //   },
  //   {
  //     title: "Books & E-Books",
  //     img: "https://images.unsplash.com/photo-1616687551818-a9218cddd2dc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     price: "$12.20",
  //   },
  // ];

  const handleIncrement = (id: string, prodItem: Product) => {
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, value: item.value + 1 } : item
      )
    );
    addToCart(prodItem);
  };

  // Decrement value for a specific item
  const handleDecrement = (id: string, prodItem: Product) => {
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, value: Math.max(item.value - 1, 0) } : item
      )
    );
    decreaseQuantity(id);
  };

  const filteredData = search
    ? products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  useEffect(() => {
    try {
      async function fetchCategories() {
        const response = await axios.get(
          "http://localhost:8000/user/get-categories",
          { withCredentials: true }
        );
        setCategories(response.data);
        console.log(response);
      }
      async function fetchProducts() {
        const response = await axios.get(
          "http://localhost:8000/admin/all-products",
          { withCredentials: true }
        );
        setProducts(response.data);
        console.log(response.data);
      }
      fetchProducts();
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {/* hero section */}
      <div>
        <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-green-100 md:shadow-xl">
          <p className="z-10 whitespace-pre-wrap text-center text-7xl font-bold tracking-tighter text-slate-600">
            Shop Smart
          </p>
          <Ripple
            mainCircleOpacity={0.6}
            numCircles={30}
            mainCircleSize={310}
          />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-slate-600 text-center my-10">
          Products
        </h1>
        <div className="w-[90%] mx-auto">
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {categories.map((item, index) => (
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
                    alt={item?.name}
                    className="w-full object-cover h-[200px]"
                    src={item?.image}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item?.name}</b>
                  <Link to={`/category-products?cat_id=${item._id}`}>
                    <button className="text-white font-medium bg-slate-400 px-4 py-2 rounded-full">
                      Find More
                    </button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-y-4 my-5">
            <h1>All Products</h1>
            <div>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
              />
              {/* <Button></Button> */}
            </div>
            <div className="flex justify-end items-center mb-5"></div>
            <Link to="/cart" state={products.filter((item) => item.value > 0)}>
              <button className="bg-slate-500 p-3 rounded-xl relative">
                <span className="absolute bg-blue-500 text-white p-1 w-[25px] h-[25px] rounded-full flex justify-center items-center -top-1 -right-1">
                  {cart.reduce((acc, cur) => {
                    return acc + cur.value;
                  }, 0)}
                </span>
                <ShoppingCart
                  strokeWidth={2.75}
                  className="w-[28px] h-[28px] text-white"
                />
              </button>
            </Link>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
              {filteredData.map((item, index) => (
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
                      alt={item.name}
                      className="w-full object-cover h-[200px]"
                      src={item.image}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.name}</b>
                    <b>{item.description}</b>
                    <div className="flex justify-evenly items-center gap-x-3">
                      {/* <Button className="w-[10px] h-[30px] "></Button> */}
                      <span
                        onClick={() => {
                          handleIncrement(item._id, item);
                        }}
                        className="text-slate-800 text-lg font-medium bg-slate-100 px-[8px] rounded-xl border-[1px] border-slate-500"
                      >
                        +
                      </span>
                      <span>
                        {cart.filter((item2) => item2._id === item._id)[0]
                          ?.value
                          ? cart.filter((item2) => item2._id === item._id)[0]
                              ?.value
                          : 0}
                      </span>
                      <span
                        onClick={() => {
                          handleDecrement(item._id, item);
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

export default Home;
