import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectedDB from "./config/db.js";
import staffAuthRouter from "./staff/routes/staffAuthRoutes.js";
import cookieParser from "cookie-parser";
import staffRouter from "./staff/routes/staffRoutes.js";
import citizenAuthRouter from "./citizen/routes/citizenAuthRoutes.js";
import citizenRouter from "./citizen/routes/citizenDataRoutes.js";
import authRouter from "./auth/routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/staff/auth", staffAuthRouter);
app.use("/api/citizen/auth", citizenAuthRouter);
app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);
app.use("/api/citizen", citizenRouter);

app.listen(PORT, () => {
  connectedDB().then(() => {
    console.log(`App listening on port http://localhost:${PORT}!`);
  });
});
