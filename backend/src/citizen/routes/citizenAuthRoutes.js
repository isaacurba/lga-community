import express from "express";
import {
  citizenLogin,
  sendVerifyOtp,
  verifyEmail,
  citizenResetOtp,
  citizenResetPassword,
} from "../auth/citizenAuthController.js";
import { isAuthenticated } from "../../controllers/authController.js";
import { citizenAuth, genericAuth } from "../../middleware/userAuth.js";
import { logout } from "../../controllers/authController.js";

const citizenAuthRouter = express.Router();

citizenAuthRouter.post("/login", citizenLogin);
citizenAuthRouter.post("/send-verify-otp", citizenAuth, sendVerifyOtp);
citizenAuthRouter.post("/verify-account", citizenAuth, verifyEmail);
citizenAuthRouter.post("/send-reset-otp", citizenResetOtp);
citizenAuthRouter.post("/reset-password", citizenResetPassword);
citizenAuthRouter.post("/logout", logout);
// FIX: avoid sending multiple responses; isAuthenticated already replies on success
citizenAuthRouter.post("/is-auth", genericAuth, isAuthenticated);

export default citizenAuthRouter;
