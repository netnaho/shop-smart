import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/userRoute";
import { adminRoutes } from "./routes/adminRoutes";

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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/test", (req, res) => {
  //listOfDrivers(); // Assuming listOfDrivers is defined elsewhere
  res.send("Test Success");
});

const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY;
app.post("/accept-payment", async (req: Request, res: Response) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
  } = req.body;
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: tx_ref,
      return_url: "http://localhost:5173/wallet", // Set your return URL
    };
    let resp: any = "";
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {
        resp = response;
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(400).json({
          message: error,
        });
      });
    res.status(200).json(resp.data);
  } catch (e: any) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
});

//routes
app.use("/user", userRouter);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
