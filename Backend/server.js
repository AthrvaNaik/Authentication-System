import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/DB.js";
import authRoutes from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors({origin: "http://localhost:5173",credentials:true}));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use(express.json()); //req.body
app.use(cookieParser()); //allows to parse incoming cookies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`http://localhost:${PORT}`);
});
