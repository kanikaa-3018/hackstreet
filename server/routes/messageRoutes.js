import express from "express";
import auth from "../middlewares/auth.js";
import { sendMessage, getChatMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", auth, sendMessage);
router.get("/:userId", auth, getChatMessages); 

export default router;
