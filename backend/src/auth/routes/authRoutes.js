import express from "express";
import { logout, isAuthenticated } from "../../controllers/authController.js";
import { genericAuth } from "../../middleware/userAuth.js";

// Shared auth routes for both staff and citizens
const authRouter = express.Router();

// Shared logout endpoint
authRouter.post("/logout", logout);

// Shared auth check endpoint
authRouter.post("/is-auth", genericAuth, isAuthenticated);

export default authRouter;
