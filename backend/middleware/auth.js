import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ success: false, message: "Token not provided" });
  }
  
  // Extract token from "Bearer <token>"
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default auth;
