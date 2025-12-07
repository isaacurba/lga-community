import express from "express";
import {
  register,
  login,
  logOut,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  resetPassword,
  sendResetOtp,
} from "../controllers/staffAuthController.js";
import userAuth from "../middleware/userAuth.js";
// Import citizen controllers
import {
  citizenLogin,
  registerCitizen,
  citizenResetOtp,
  citizenResetPassword,
} from "../controllers/citizenAuthController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

// Add citizen routes as specified
authRouter.post("/register-citizen", registerCitizen);
authRouter.post("/login", citizenLogin);
authRouter.post("/citizen/send-reset-otp", citizenResetOtp);
authRouter.post("/citizen/reset-password", citizenResetPassword);


export default authRouter;
