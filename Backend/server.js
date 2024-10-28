import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/DB.js";
import authRoutes from "./Routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`http://localhost:${PORT}`);
});
