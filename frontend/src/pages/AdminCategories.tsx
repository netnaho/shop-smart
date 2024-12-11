import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
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

interface Category {
  _id: string;
  name: string;
  image: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryImg, setNewCategoryImg] = useState<File | null>(null);
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
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewCategoryImg(e.target.files[0]); // Update the file state with the first selected file
    } else {
      setNewCategoryImg(null); // Reset file state if no file is selected
    }
  };

  const formData = new FormData();

  formData.append("name", newCategoryName);
  formData.append("image", newCategoryImg);

  const handleSubmit = async () => {
    // console.log(newCategoryName, newCategoryImg);
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/post-category",
        formData
      );
      console.log(response);
      setCategories(response.data);
      setNewCategoryName("");
      setNewCategoryImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryDelete = async (category_id: string) => {
    console.log(category_id);
    try {
      const response = await axios.post(
        `http://localhost:8000/admin/delete-category/${category_id}`,
        { params: { category_id } }
      );
      setCategories(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-10">
      <div>
        <h1 className="text-3xl font-semibold text-center mt-6 mb-10">
          Our Categories
        </h1>
      </div>
      <div className="w-[90%] mx-auto mb-4 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>ADD NEW CATEGORY</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Fill out informatin about the category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Category Name
                </Label>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewCategoryName(e.target.value)
                  }
                  value={newCategoryName}
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileChange(e)
                  }
                  id="image"
                  type="file"
                  className="col-span-3"
                />
              </div>
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
          {categories.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="relative overflow-visible p-0">
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
                    handleCategoryDelete(item._id);
                  }}
                  className="absolute z-50 right-0 top-0 w-[45px] h-[45px] rounded-xl bg-red-500/80 flex justify-center items-center"
                >
                  <Trash2 className="text-white " />
                </div>
              </CardBody>
              <CardFooter className="text-small flex items-center justify-between">
                <b>{item.name}</b>
                <Link to={`/admin/products?cat_id=${item._id}`}>
                  <Button className="text-white font-medium bg-slate-400 px-4 py-2 rounded-full">
                    Find More <ChevronRight />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
