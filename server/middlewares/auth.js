import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided.", success: false });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.alumni = verified; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid Token", success: false });
  }
};

export default auth;
