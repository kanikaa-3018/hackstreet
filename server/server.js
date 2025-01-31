import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());