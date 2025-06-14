import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// for register user

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, isHost } = req.body;

    // validation

    if (!name) {
      return res
        .status(500)
        .json({ success: false, message: "Name is Required" });
    }

    if (!email) {
      return res
        .status(500)
        .json({ success: false, message: "Email is Required" });
    }
    if (!password) {
      return res
        .status(500)
        .json({ success: false, message: "Password is Required" });
    }
    if (!phone) {
      return res
        .status(500)
        .json({ success: false, message: "phone is Required" });
    }
    // check existing user

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "User already register , Please Login",
      });
    }

    // hashing password

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      isHost,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT || "fallback_secret",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "User Registerd Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isHost: user.isHost,
      },
    });
  } catch (error) {
    console.log("Error in Register user");
    res.status(500).json({ message: "Error in Register", error });
  }
};

// for login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation

    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "Email and password is required" });
    }

    // check existing user

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User not register with this email" });
    }

    // password metch

    const metch = await bcrypt.compare(password, user.password);

    if (!metch) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // generate token

    const token = await jwt.sign({ userId: user._id }, process.env.JWT, {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isHost: user.isHost,
      },
      message: "User loggenIn",
    });
  } catch (error) {
    console.log("Error in Register user");
    res.status(500).json({ message: "Error in Register", error });
  }
};
