import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/staffModel.js";
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
      from: {
        name: 'LGA Community',
        address: process.env.SENDER_EMAIL
      },
      to: user.email,
      replyTo: process.env.SENDER_EMAIL,
      subject: "Welcome to LGA Community - Account Created",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50;">Welcome to LGA Community!</h2>
          <p>Dear ${user.name},</p>
          <p>Your staff account has been successfully created.</p>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="margin: 5px 0;"><strong>Role:</strong> ${user.role || 'Staff'}</p>
          </div>
          <p>You can now log in to access the staff portal and manage community services.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} LGA Community. All rights reserved.
          </p>
        </div>
      `,
      text: `Welcome to LGA Community!\n\nDear ${user.name},\n\nYour staff account has been successfully created.\n\nEmail: ${user.email}\nRole: ${user.role || 'Staff'}\n\nYou can now log in to access the staff portal.\n\n© ${new Date().getFullYear()} LGA Community`
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
      from: {
        name: 'LGA Community',
        address: process.env.SENDER_EMAIL
      },
      to: citizen.email,
      replyTo: process.env.SENDER_EMAIL,
      subject: "Welcome to LGA Community - Citizen Account Created",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50;">Welcome to LGA Community!</h2>
          <p>Dear ${citizen.firstName} ${citizen.lastName},</p>
          <p>Your citizen account has been successfully created by our staff.</p>
          <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${citizen.email}</p>
            <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${password}</p>
            <p style="margin: 5px 0; color: #856404;">⚠️ Please change your password after your first login.</p>
          </div>
          <p>You can now access community services through the citizen portal.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} LGA Community. All rights reserved.
          </p>
        </div>
      `,
      text: `Welcome to LGA Community!\n\nDear ${citizen.firstName} ${citizen.lastName},\n\nYour citizen account has been created.\n\nEmail: ${citizen.email}\nTemporary Password: ${password}\n\n⚠️ Please change your password after your first login.\n\n© ${new Date().getFullYear()} LGA Community`
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
      from: {
        name: 'LGA Community',
        address: process.env.SENDER_EMAIL
      },
      to: user.email,
      replyTo: process.env.SENDER_EMAIL,
      subject: "Verify Your Account - LGA Community",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50;">Account Verification</h2>
          <p>Dear ${user.name},</p>
          <p>Thank you for registering with LGA Community. Please verify your account using the OTP below:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
            <span style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #007bff;">${otp}</span>
          </div>
          <p><strong>This OTP will expire in 24 hours.</strong></p>
          <p>If you didn't create this account, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} LGA Community. All rights reserved.
          </p>
        </div>
      `,
      text: `Account Verification\n\nDear ${user.name},\n\nYour verification OTP is: ${otp}\n\nThis OTP will expire in 24 hours.\n\nIf you didn't create this account, please ignore this email.\n\n© ${new Date().getFullYear()} LGA Community`
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

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "User Authenticated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is Required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: {
        name: 'LGA Community',
        address: process.env.SENDER_EMAIL
      },
      to: user.email,
      replyTo: process.env.SENDER_EMAIL,
      subject: "Password Reset Request - LGA Community",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50;">Password Reset Request</h2>
          <p>Dear ${user.name},</p>
          <p>You requested to reset your password for your LGA Community account.</p>
          <p>Please use the following One-Time Password (OTP):</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
            <span style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #dc3545;">${otp}</span>
          </div>
          <p><strong>This OTP will expire in 24 hours.</strong></p>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} LGA Community. All rights reserved.
          </p>
        </div>
      `,
      text: `Password Reset Request\n\nDear ${user.name},\n\nYour password reset OTP is: ${otp}\n\nThis OTP will expire in 24 hours.\n\nIf you didn't request this, please ignore this email.\n\n© ${new Date().getFullYear()} LGA Community`
    };
    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Reset OTP sent on Email;",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP and New Password is Required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid otp" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Password Reset Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
