import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
dotenv.config();
import connectDB from "./config/db.js"

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));