import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// cors
app.use(
  cors({
    origin: true,
    methods: " GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// cookie-parser
app.use(cookieParser()); // used to set cookie in web browser

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
