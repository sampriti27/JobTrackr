import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getAllUser,
  getUser,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

//routes
//GET USERS || GET
router.get("/get-all-users", userAuth, getAllUser);

//UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

//GET USER-DETAILS || GET
router.get("/get-user", userAuth, getUser);

export default router;
