import express from "express";
import { logout } from "../controllers/authController.js";
import { genericAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/logout", logout);
router.post("/is-auth", genericAuth, (req, res) => res.json({ success: true }));

export default router;
