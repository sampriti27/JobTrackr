import userModel from "../models/userModel.js";
import { findRefreshToken, generateToken, removeTokenFromDb, storeRefreshToken, updateRefreshToken, verifyRefreshToken } from "../utils/index.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  //validate
  if (!name || !email || !password) {
    next("Please fill in all the details!");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      auth: false,
      message: "Email already exists!",
    });
  }
  let user;
  try {
     user = await userModel.create({ name, email, password });

  } catch (error) {
    console.log(error);
  }
 

  res.status(201).json({
    auth: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validate
  if (!email || !password) {
    next("Please provide all Fields");
  }

  //find user by email
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    next("Invalid Credentials!");
  }

  //compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    next("Invalid Credentials!");
  }

  user.password = undefined;

  // Token Generation start -----------------------

  const { accessToken, refreshToken } = generateToken({ _id: user._id });

  // storing refresh token in db
  await storeRefreshToken(refreshToken, user._id);

  // send token to cookie
  res.cookie('refreshToken', refreshToken, {
    maxAge: 1000*60*60*24*30,
    httpOnly: true,
    sameSite: "none",
    secure: true

  });

  res.cookie('accessToken', accessToken, {
    maxAge: 1000*60*60*24*30,
    httpOnly: true,
    sameSite: "none",
    secure: true

  });

  // Token Generation End -----------------------


  res.status(200).json({
    auth: true,
    message: "Login successful",
    user
  });
};

export const refresh = async (req, res) => {
   //------------ Refresh token logic start ------------------

  // 1. get refresh-token from cookies

  const {refreshToken: refreshTokenFromCookie} = req.cookies;

  //2. check validity of token
  let userData;

  try {
    userData = await verifyRefreshToken(refreshTokenFromCookie);
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Invalid Token!');
  }

  // 3. check validity of user

  let validUser;

  try {
    validUser = await userModel.findOne({_id: userData._id});

    if(!validUser){
      res.status(404);

      throw new Error('User not found!')

    }
    
  } catch (error) {
    res.status(500);
    throw new Error("Internal Error")
  }
  
  //4. Check token present in db or not
  try {
    const token = findRefreshToken(userData._id, refreshTokenFromCookie);

    if(!token){
      res.status(404);
      throw new Error('Invalid token!');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Internal Error!');
    
  }

  //5. generate new tokens
  const { accessToken, refreshToken } = generateToken({ _id: validUser._id });

  //6. update refresh token in db
    try {
      updateRefreshToken(userData._id, refreshToken);
    } catch (error) {
      res.status(500);
      throw new Error('Internal Error!')
    }

    // store in cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000*60*60*24*30,
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    res.cookie('accessToken', accessToken, {
      maxAge: 1000*60*60*24*30,
      httpOnly: true,
      sameSite: "none",
      secure: true
    })

    res.status(200).json({
      auth: true,
      validUser
    });
}

export const logoutController = async (req, res) => {

  //find user by email
  const user = await userModel.findOne({ _id: req.user._id });

  if (!user) {
    next("You can't perform this action!");
  }
    
  // get refresh-token from cookies
    const {refreshToken} = req.cookies;
    
    //remove token from db
    removeTokenFromDb(refreshToken);

    //delete cookies
    res.clearCookie('refreshToken', {sameSite: "none", secure: true});
    res.clearCookie('accessToken', {sameSite: "none", secure: true});


  res.status(200).json({
    auth: false,
    user: null,
  });
};
