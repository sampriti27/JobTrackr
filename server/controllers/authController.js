import userModel from "../models/userModel.js";

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

  const user = await userModel.create({ name, email, password });

  //token
  const token = user.createJwt();

  res.status(201).json({
    auth: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(process.env.ACCESS_TOKEN_SECRET);
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
  const token = user.createJwt();
  res.status(200).json({
    auth: true,
    message: "Login successful",
    user,
    token,
  });
};

export const logoutController = async (req, res) => {
  //find user by email
  const user = await userModel.findOne({ _id: req.user.userId });

  if (!user) {
    next("You can't perform this action!");
  }

  res.status(200).json({
    auth: false,
    user: null,
  });
};
