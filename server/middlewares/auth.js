import jwt from "jsonwebtoken";
import alumniModel from "../models/alumniModel.js"; // Adjust the path

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied", success: false });
    }

    // Extract Bearer token if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch alumni from DB and attach to request
    const alumni = await alumniModel.findById(decoded.id).select("-password");
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found", success: false });
    }

    req.alumni = alumni;
    req.token = token; // Attach token to request

    next(); // Proceed to next middleware
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed", success: false });
  }
};

export default auth;
