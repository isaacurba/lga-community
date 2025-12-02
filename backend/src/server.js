import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectedDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import staffRouter from "./routes/staffRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/staff/auth", authRouter);
app.use("/api/staff", staffRouter);

app.listen(PORT, () => {
  connectedDB().then(() => {
    console.log(`App listening on port http://localhost:${PORT}!`);
  });
});
