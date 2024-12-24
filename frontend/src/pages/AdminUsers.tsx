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

interface User {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  wallet: number;
  location: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    try {
      async function fetchCategories() {
        const response = await axios.get(
          "http://localhost:8000/admin/get-users",
          { withCredentials: true }
        );
        setUsers(response.data);
        console.log(response);
      }
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-[1200px]">
      <div>Users</div>
      <div className="flex flex-col gap-y-5 mx-auto">
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className="w-[90%] mx-auto flex flex-col rounded-[20px] px-3 py-2 shadow-slate-700 shadow-md"
            >
              <div className="flex justify-between items-center">
                <h2>UserId:{user._id}</h2>
                <h2>Location: {user.location}</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Name: {user.name}</h2>
                <h2>Age: {user.age}</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2>Email: {user.email}</h2>
                <h2>Phone: {user.phone}</h2>
              </div>
              <div>Wallet: {user.wallet}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsers;
