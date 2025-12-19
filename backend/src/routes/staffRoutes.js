import express from "express";
import { staffAuth } from "../middleware/userAuth.js";
import { getAllCitizens, getStaffData } from "../controllers/roleDataController.js";

const staffRouter = express.Router();

staffRouter.get("/data", staffAuth, getStaffData);
staffRouter.get("/citizens", staffAuth, getAllCitizens);

export default staffRouter;