import express from "express";
import auth from "../middlewares/auth.js";
import upload from "../utils/upload.js";

import {
  loginController,
  signupController,
  getAlumniProfile,
  editAlumniProfile,
  connectAlumni, 
  getConnectedAlumni,
  getAllAlumnis,
  disconnectAlumni,
  getAlumniById
} from "../controllers/alumniController.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);

router.get("/", auth, getAlumniProfile);
router.get("/get-all",getAllAlumnis);
router.put("/update", auth, upload.single("profileImage"), editAlumniProfile);

router.post("/connect", auth, connectAlumni); // Connect with another alumni
router.post("/disconnect", auth, disconnectAlumni); // Connect with another alumni
router.get("/connections", auth, getConnectedAlumni); // Get connected alumni
router.get('/:userId', auth, getAlumniById);










export default router;
