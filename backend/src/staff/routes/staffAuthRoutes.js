import express from "express";
import {
  register,
  login,
  sendVerifyOtp,
  verifyEmail,
  resetPassword,
  sendResetOtp,
} from "../auth/staffAuthController.js";
import { isAuthenticated } from "../../controllers/authController.js";
import { registerCitizen } from "../../citizen/auth/citizenAuthController.js";
import { staffAuth } from "../../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/send-verify-otp", staffAuth, sendVerifyOtp);
authRouter.post("/verify-account", staffAuth, verifyEmail);
authRouter.get("/is-auth", staffAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

// Staff-only route to register a new citizen
authRouter.post("/register-citizen", staffAuth, registerCitizen);

export default authRouter;
