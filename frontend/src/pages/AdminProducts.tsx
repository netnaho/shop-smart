import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  _id: string;
  name: string;
  image: string;
  availableQuantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  price: number;
  value: number;
}

interface NewProduct {
  name: string;
  image: File | null;
  availableQuantity: number;
  category: string;
  price: number;
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("cat_id");
  // new product state
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    image: null,
    availableQuantity: 0,
    category: category_id.toString(),
    price: 0,
  });
  useEffect(() => {
    try {
      async function fetchProducts() {
        const response = await axios.get(
          "http://localhost:8000/user/get-products",
          { params: { category_id }, withCredentials: true }
        );
        setProducts(response.data);
        console.log(response);
      }
      fetchProducts();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setNewProduct((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && e.target.files[0] !== null) {
      setNewProduct((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      })); // Update the file state with the first selected file
    } else {
      setNewProduct((prevState) => ({
        ...prevState,
        image: null,
      })); // Reset file state if no file is selected
    }
  };

  const formData = new FormData();

  formData.append("name", newProduct.name);
  formData.append("image", newProduct.image);
  formData.append("availableQuantity", newProduct.availableQuantity);
  formData.append("category", newProduct.category);
  formData.append("price", newProduct.price);
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/post-product",
        formData
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDelete = async (
    category_id: string,
    product_id: string
  ) => {
    console.log(category_id, product_id);
    try {
      const response = await axios.post(
        `http://localhost:8000/admin/delete-product/${product_id}/${category_id}`
      );
      setProducts(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold text-center mt-6 mb-10">
          Products
        </h1>
      </div>
      <div className="w-[90%] mx-auto mb-4 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>ADD NEW PRODUCT</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Fill out informatin about the product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Product Name
                </Label>
                <Input
                  name="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  value={newProduct.name}
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  name="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileChange(e)
                  }
                  id="image"
                  type="file"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Available Quantity
                </Label>
                <Input
                  name="availableQuantity"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  value={newProduct.availableQuantity}
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  price
                </Label>
                <Input
                  name="price"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  value={newProduct.price}
                  id="name"
                  className="col-span-3"
                />
              </div>
              {/* <div>
                <Label htmlFor="name" className="text-right mr-4">
                  Category
                </Label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                  ) => {
                    handleChange(e);
                  }}
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {categories.map((category, index) => {
                    return (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleSubmit}>
                  ADD
                </Button>
                {/* <Button type="button" variant="secondary">
                  Close
                </Button> */}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              <CardBody className=" relative overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.name}
                  className="w-full object-cover h-[200px]"
                  src={item.image}
                />
                <div
                  onClick={() => {
                    handleProductDelete(item.category._id, item._id);
                  }}
                  className="absolute z-50 right-0 top-0 w-[45px] h-[45px] rounded-xl bg-red-500/80 flex justify-center items-center"
                >
                  <Trash2 className="text-white " />
                </div>
              </CardBody>
              <CardFooter className="text-small flex items-center justify-between">
                <b>{item.name}</b>
                <div className="flex flex-col w-[150px] justify-between items-end">
                  <span>
                    <span className="text-md font-semibold">available:</span>{" "}
                    {item.availableQuantity}
                  </span>
                  <span>
                    <span className="text-md font-semibold">price:</span>{" "}
                    {item.price}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
