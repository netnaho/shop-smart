import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useCart } from "@/hooks/cartContext";

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

const CategoryProducts = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity, clearCart } =
    useCart();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("cat_id");

  useEffect(() => {
    try {
      async function fetchCategories() {
        const response = await axios.get(
          "http://localhost:8000/user/get-products",
          { params: { category_id }, withCredentials: true }
        );
        setProducts(response.data);
        console.log(response.data);
      }
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Increment value for a specific item
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

  return (
    <div>
      <div
        className="h-[400px] bg-black flex justify-center items-center"
        style={{
          backgroundImage: `url(${products[0]?.category?.image})`,
          backgroundSize: "cover",
          // opacity: 0.7,
          backgroundColor: "black",
        }}
      >
        <h1 className="z-20 text-white text-5xl font-medium">
          {products[0]?.category?.name}
        </h1>
      </div>
      <div>
        <div>
          <div className="w-[90%] mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-semibold text-slate-600 text-center my-10">
              {products[0]?.category?.name}
            </h1>
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
                      alt={item.name}
                      className="w-full object-cover h-[200px]"
                      src={item.image}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.name}</b>
                    
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

export default CategoryProducts;
