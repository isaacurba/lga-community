import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getStaffData } from "../controllers/staffController.js";

const staffRouter = express.Router();

staffRouter.get("/data", userAuth, getStaffData);

export default staffRouter;
