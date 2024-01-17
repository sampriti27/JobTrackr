import jwt from "jsonwebtoken";
import RefreshModel from "../models/refresh-model.js";

// Retrieve the access and refresh secret tokens from environment variables
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateToken = async (payload) => {
  // Generate the access token with a 1-hour expiration time
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "1h",
  });

  // Generate the refresh token with a 1-year expiration time
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "1y",
  });

  // Return the generated tokens as an object
  return { accessToken, refreshToken };
};

// Store the refresh-token in database
const storeRefreshToken = async (token, userId) => {
  try {
    await RefreshModel.create({ token, userId });
  } catch (error) {
    console.log(error.message);
  }
};

export { generateToken, storeRefreshToken };
