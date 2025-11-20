import express from "express";
import {
  login,
  logOut,
  register,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userauth.js";

const authRouter = express.Router();

// @route   POST /api/v1/auth/login
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logOut", logOut);
authRouter.post("/verify-email", userAuth, sendVerifyOtp);
authRouter.post("/send-verify-otp", userAuth, verifyEmail);
export default authRouter;
