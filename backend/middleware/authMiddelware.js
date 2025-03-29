import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      console.log("JWT Secret:", process.env.JWT_SECRET);
      console.log("Received Token:", token);  

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); 

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.log("JWT Verification Error:", error);
      if (error.name === "TokenExpiredError") {
        res.status(401).send("Token has expired");
      } else {
        res.status(401);
        throw new Error("Not Authorized, token failed");
      }
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

export default protect;
