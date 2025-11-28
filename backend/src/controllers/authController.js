import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import Citizen from "../models/citizen.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const user = new userModel({
      name,
      email,
      password,
    });
    await user.save();

    // generate token for auth
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending welcome Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to LGA-Community",
      text: `Welcome to LGA-Community your Account has been created with email id: ${user.email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    // We add .select('+password') to retrieve the password hash
    const user = await userModel.findOne({ email }).select("+password");

    if (!user)
      return res.json({ success: false, message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({ success: false, message: "Invalid Email or Password" });

    // Assuming role check will be added later, for now we log them in
    const token = jwt.sign(
      { id: user._id, role: user.role || "citizen" },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Do NOT send the password in the user object
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "citizen",
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sending token separately for frontend fetch method
    return res.json({ success: true, token, user: userResponse });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

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

    const isMatch = await bcrypt.compare(password, citizen.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    if (!citizen.is_active) {
      return res.json({ success: false, message: "Account is not active" });
    }

    const token = jwt.sign(
      { id: citizen._id, role: "citizen" },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const citizenResponse = {
      id: citizen._id,
      email: citizen.email,
      firstName: citizen.firstName,
      lastName: citizen.lastName,
      role: "citizen",
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, token, user: citizenResponse });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

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
    return res.json({ success: false, message: "Missing required details" });
  }

  try {
    // Check if staff/admin
    const staffId = req.body.userid;
    const staff = await userModel.findById(staffId);
    if (!staff || (staff.role !== "staff" && staff.role !== "admin")) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const existingCitizen = await Citizen.findOne({
      $or: [{ email }, { ninId }],
    });
    if (existingCitizen) {
      return res.json({
        success: false,
        message: "Citizen with this email or NIN already exists",
      });
    }

    const citizen = new Citizen({
      ninId,
      email,
      password,
      firstName,
      lastName,
      dob,
      currentAddress,
      originalLga,
    });

    await citizen.save();

    // Send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: citizen.email,
      subject: "Welcome to LGA-Community",
      text: `Welcome ${citizen.firstName} ${citizen.lastName} to LGA-Community. Your account has been created with email: ${citizen.email} and password: ${password}. Please log in and change your password.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Citizen registered successfully",
      citizen: {
        id: citizen._id,
        email: citizen.email,
        firstName: citizen.firstName,
        lastName: citizen.lastName,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// send verification OTP to user email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Verification OTP sent on Email;",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;
  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid otp" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
