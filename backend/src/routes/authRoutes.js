import express from "express";
import { register, login, logOut, sendVerifyOtp, verifyEmail } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
// Import citizen controllers
import { citizenLogin, registerCitizen } from "../controllers/citizenController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

// Add citizen routes as specified
authRouter.post("/citizen/login", citizenLogin);
authRouter.post("/staff/register-citizen", registerCitizen);

export default authRouter;