import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "smart-shop-token";
export const getAccessToken = async (user: any) => {
  try {
    const accessToken = generateAccessToken(user);
    console.log(user);
    return accessToken;
  } catch (error: any) {
    console.log(error);
    throw error.message;
  }
};

// generates the access token for the admin and super admin
const generateAccessToken = (user: any) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  });
};
