import express from "express";
import {
  citizenLogin,
  citizenResetOtp,
  citizenResetPassword,
  isAuthenticated
} from "../controllers/citizenAuthController.js";
import citizenAuth from "../middleware/userAuth.js";

const citizenAuthRouter = express.Router();

citizenAuthRouter.post("/login", citizenLogin);
citizenAuthRouter.get("/is-auth", citizenAuth, isAuthenticated);
citizenAuthRouter.post("/send-reset-otp", citizenResetOtp);
citizenAuthRouter.post("/reset-password", citizenResetPassword);

export default citizenAuthRouter;