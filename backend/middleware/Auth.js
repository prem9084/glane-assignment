import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);

    req.user = await userModel.findById(decoded.userId);
    next();
  } catch (error) {
    console.error("JWT verify failed:", error.message); // 👈 Important
    return res.status(403).json({ error: "Invalid token" });
  }
};
