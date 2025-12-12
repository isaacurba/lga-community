import express from "express";
import { staffAuth } from "../middleware/userAuth.js";
import { getStaffData } from "../controllers/roleDataController.js";

const staffRouter = express.Router();

staffRouter.get("/data", staffAuth, getStaffData);

export default staffRouter;