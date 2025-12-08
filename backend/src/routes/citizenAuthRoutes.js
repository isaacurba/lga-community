import express from "express";
import {
  citizenLogin,
  citizenLogOut,
  citizenResetOtp,
  citizenResetPassword,
} from "../controllers/citizenAuthController.js";

const citizenAuthRouter = express.Router();

citizenAuthRouter.post("/login", citizenLogin);
citizenAuthRouter.post("/logout", citizenLogOut);
citizenAuthRouter.post("/send-reset-otp", citizenResetOtp);
citizenAuthRouter.post("/reset-password", citizenResetPassword);

export default citizenAuthRouter;