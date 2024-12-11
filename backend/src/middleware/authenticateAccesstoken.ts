import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: Object | JwtPayload;
}

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "smart-shop-token";

export const userAuthenticateAccessToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Please Login First" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Incorrectly Info" });
  }

  // jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) return res.status(403).json("Token is not authenticated");
  //   req.user = user;
  //   next();
  // });
};
