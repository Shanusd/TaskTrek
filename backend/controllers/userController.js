import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", 
      });

      res.cookie("jwt", token, {
        httpOnly: true, 
        secure: false, 
        sameSite: "strict", 
        maxAge: 24 * 60 * 60 * 1000, 
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "User not found or invalid password" });
    }
});

const logout = asyncHandler(async (req, res) => {

  res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });

});

export { createUser, authUser, logout };
