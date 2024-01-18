import jwt from "jsonwebtoken";
import RefreshModel from "../models/refresh-model.js";

// Retrieve the access and refresh secret tokens from environment variables

const generateToken = (payload) => {
  // Generate the access token with a 1-hour expiration time

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  // Generate the refresh token with a 1-year expiration time
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
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

//verify the access-token
const verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

//verify the refresh-token
const verifyRefreshToken = async (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

//find refresh token in db
const findRefreshToken = async (userId, token) => {
  return await RefreshModel.findOne({userId: userId, token: token});
}

//update refresh token in db
const updateRefreshToken = async (userId, token) => {
  return await RefreshModel.updateOne({
    userId: userId,
   
  },{
    token: token
  })
}

//remove token from db
const removeTokenFromDb = async (refreshToken) => {
  return await RefreshModel.deleteOne({token: refreshToken});
}

export { generateToken, storeRefreshToken, verifyAccessToken, verifyRefreshToken, findRefreshToken, updateRefreshToken, removeTokenFromDb};
