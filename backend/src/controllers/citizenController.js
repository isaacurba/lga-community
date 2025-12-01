import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Citizen from "../models/citizen.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

// Helper function to handle cookie and token response
const sendAuthResponse = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: "citizen" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const userResponse = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    ninId: user.ninId,
    originalLga: user.originalLga,
    isVerified: user.isVerified,
    role: "citizen", // Explicitly set role for frontend consumption
  };

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ success: true, token, user: userResponse });
};

// @desc    Citizen Login
// @route   POST /api/v1/auth/citizen/login
export const citizenLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    const citizen = await Citizen.findOne({ email }).select("+password");

    if (!citizen) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await citizen.comparePassword(password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    return sendAuthResponse(res, citizen);
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// @desc    Staff registers a new citizen
// @route   POST /api/v1/auth/staff/register-citizen
export const registerCitizen = async (req, res) => {
  const {
    ninId,
    email,
    password,
    firstName,
    lastName,
    dob,
    currentAddress,
    originalLga,
  } = req.body;

  if (
    !ninId ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !originalLga
  ) {
    return res.json({ success: false, message: "Missing required fields" });
  }

  try {
    const existingCitizen = await Citizen.findOne({ ninId });
    if (existingCitizen) {
      return res.json({
        success: false,
        message: "Citizen with this NIN ID already exists",
      });
    }

    const newCitizen = new Citizen({
      ninId,
      email,
      password,
      firstName,
      lastName,
      dob,
      currentAddress,
      originalLga,
      isVerified: true,
    });
    await newCitizen.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to LGA-Connect Citizen Portal",
      text: `Your account for the LGA-Connect Citizen Portal has been created. 
               You can log in with your email/NIN ID and the provided password.`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Citizen registered successfully",
      citizen: { ninId: newCitizen.ninId, email: newCitizen.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "A user with this email or NIN ID already exists.",
      });
    }
    return res.json({ success: false, message: error.message });
  }
};

// FIX: Export missing functions to match imports in routes file
export const citizenFunctions = { citizenLogin, registerCitizen };
