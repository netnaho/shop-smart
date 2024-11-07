import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ClientModel from "../schemas/userSchema";

export const registerUser = async (req: Request, res: Response) => {
  const { fullname, age, location, phone, email, password } = req.body;
  try {
    const response = await ClientModel.create({
      name: fullname,
      age,
      location,
      phone,
      email,
      password,
    });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const emailExists = await ClientModel.findOne({ email: email });
    console.log(emailExists);
    if (!emailExists) {
      throw new Error("Email doesn't exist");
    }
    const user = await ClientModel.findOne({ email });
    const userPassword = user?.password;
    if (userPassword !== undefined)
      if (password !== userPassword) {
        throw new Error("Invalid password");
      }
    res.status(200).json({ message: "login success" });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
