import express from "express"
import userAuth from "../middleware/userAuth.js"
import { getCitizenData } from "../controllers/roleDataController.js"

const citizenRouter = express.Router();

citizenRouter.get("/data", userAuth, getCitizenData);

export default citizenRouter;