import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { name, lastName, email, location } = req.body;

  if (!name || !email || !lastName || !location) {
    next("Please provide all fields");
  }

  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();

  const token = user.createJwt();

  res.status(200).json({
    auth: true,
    user,
    token,
  });
};

export const getAllUser = async (req, res) => {
  const users = await userModel.find();

  return res.json({ auth: true, users });
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.userId });
    res.status(200).json({
      auth: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
