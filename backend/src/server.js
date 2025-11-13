import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectedDB from "../config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.listen(PORT, () => {
  connectedDB().then(() => {
    console.log(`App listening on port http://localhost:${PORT}!`);
  });
}); 