import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import staffModel from "../models/staffModel.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await staffModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const user = new staffModel({
      name,
      email,
      password,
    });
    await user.save();

    // generate token for auth
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role || "staff",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Professional HTML email template for staff registration
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to LGA-Connect</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f7;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f7; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">LGA-Connect</h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Staff Portal</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Welcome to the Team, ${
                      user.name
                    }!</h2>
                    
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Your staff account has been successfully created. You now have access to the LGA-Connect Staff Portal to manage community services and support citizens.
                    </p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 20px; margin: 30px 0; border-radius: 4px;">
                      <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">Account Details</h3>
                      <table cellpadding="8" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold; width: 30%;">Email:</td>
                          <td style="color: #333333; font-size: 14px; font-family: 'Courier New', monospace;">${
                            user.email
                          }</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold;">Role:</td>
                          <td style="color: #333333; font-size: 14px; font-family: 'Courier New', monospace;">${
                            user.role || "Staff"
                          }</td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${
                        process.env.FRONTEND_URL || "http://localhost:5173"
                      }/login"
                         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(40, 167, 69, 0.3);">
                        Access Staff Portal
                      </a>
                    </div>
                    
                    <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                      If you have any questions, please contact your system administrator.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                      This is an automated message from LGA-Connect Portal.
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      © ${new Date().getFullYear()} LGA-Connect. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `
Welcome to LGA-Connect Staff Portal!

Welcome ${user.name},

Your staff account has been successfully created. You now have access to the LGA-Connect Staff Portal to manage community services and support citizens.

ACCOUNT DETAILS
===============
Email: ${user.email}
Role: ${user.role || "Staff"}

Access the Staff Portal at: ${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/login

If you have any questions, please contact your system administrator.

---
This is an automated message from LGA-Connect Portal.
© ${new Date().getFullYear()} LGA-Connect. All rights reserved.
    `.trim();

    const mailOptions = {
      from: {
        name: "LGA-Connect",
        address: process.env.SENDER_EMAIL,
      },
      to: user.email,
      subject: "Welcome to LGA-Connect Staff Portal",
      text: textContent,
      html: htmlContent,
      priority: "high",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `Staff welcome email sent to ${user.email} (MessageId: ${info.messageId})`
      );
    } catch (emailError) {
      console.error(
        `Failed to send welcome email to ${user.email}:`,
        emailError.message
      );
    }

    return res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
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
    const user = await staffModel.findOne({ email }).select("+password");

    if (!user)
      return res.json({ success: false, message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });

    // Assuming role check will be added later, for now we log them in
    const token = jwt.sign(
      { id: user._id, role: user.role || "staff" },
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
      role: user.role || "staff",
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

// send verification OTP to user email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await staffModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    // Professional HTML email template for OTP verification
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f7;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f7; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">LGA-Connect</h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Account Verification</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Verify Your Account</h2>
                    
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Dear ${user.name},
                    </p>
                    
                    <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Thank you for registering with LGA-Connect. Please use the One-Time Password (OTP) below to verify your account:
                    </p>
                    
                    <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px; border: 2px solid #007bff;">
                      <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                      <span style="font-size: 42px; letter-spacing: 12px; font-weight: bold; color: #007bff; font-family: 'Courier New', monospace;">${otp}</span>
                    </div>
                    
                    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                        <strong>⏰ Time-Sensitive:</strong> This OTP will expire in 24 hours. Please verify your account promptly.
                      </p>
                    </div>
                    
                    <p style="margin: 20px 0 0 0; color: #999999; font-size: 13px; line-height: 1.6; font-style: italic;">
                      If you didn't create an account with LGA-Connect, please ignore this email or contact our support team if you have concerns about unauthorized access.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                      This is an automated message from LGA-Connect Portal.
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      © ${new Date().getFullYear()} LGA-Connect. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `
ACCOUNT VERIFICATION - LGA-Connect

Dear ${user.name},

Thank you for registering with LGA-Connect. Please use the One-Time Password (OTP) below to verify your account:

YOUR VERIFICATION CODE
======================
${otp}

⏰ TIME-SENSITIVE: This OTP will expire in 24 hours. Please verify your account promptly.

If you didn't create an account with LGA-Connect, please ignore this email or contact our support team if you have concerns about unauthorized access.

---
This is an automated message from LGA-Connect Portal.
© ${new Date().getFullYear()} LGA-Connect. All rights reserved.
    `.trim();

    const mailOptions = {
      from: {
        name: "LGA-Connect",
        address: process.env.SENDER_EMAIL,
      },
      to: user.email,
      subject: "🔐 Verify Your LGA-Connect Account",
      text: textContent,
      html: htmlContent,
      priority: "high",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `✅ Verification OTP sent to ${user.email} (MessageId: ${info.messageId})`
      );
    } catch (emailError) {
      console.error(
        `❌ Failed to send verification OTP to ${user.email}:`,
        emailError.message
      );
      return res.json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }
    return res.json({
      success: true,
      message: "Verification OTP sent on Email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;
  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await staffModel.findById(userId);
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
    const user = await staffModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    // Professional HTML email template for password reset
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f7;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f7; padding: 20px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">LGA-Connect</h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Password Reset Request</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Password Reset Request</h2>
                    
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Dear ${user.name},
                    </p>
                    
                    <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      We received a request to reset your password for your LGA-Connect account. Please use the One-Time Password (OTP) below to proceed:
                    </p>
                    
                    <div style="background: linear-gradient(135deg, #ffe5e8 0%, #ffc7cd 100%); padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px; border: 2px solid #dc3545;">
                      <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Your Reset Code</p>
                      <span style="font-size: 42px; letter-spacing: 12px; font-weight: bold; color: #dc3545; font-family: 'Courier New', monospace;">${otp}</span>
                    </div>
                    
                    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                        <strong>⏰ Time-Sensitive:</strong> This OTP will expire in 24 hours for security reasons.
                      </p>
                    </div>
                    
                    <div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 0; color: #721c24; font-size: 14px; line-height: 1.6;">
                        <strong>🛡️ Security Alert:</strong> If you didn't request this password reset, please ignore this email and consider changing your password immediately for security. Contact our support team if you have concerns about unauthorized access.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                      This is an automated message from LGA-Connect Portal.
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      © ${new Date().getFullYear()} LGA-Connect. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `
PASSWORD RESET REQUEST - LGA-Connect

Dear ${user.name},

We received a request to reset your password for your LGA-Connect account. Please use the One-Time Password (OTP) below to proceed:

YOUR RESET CODE
================
${otp}

⏰ TIME-SENSITIVE: This OTP will expire in 24 hours for security reasons.

🛡️ SECURITY ALERT: If you didn't request this password reset, please ignore this email and consider changing your password immediately for security. Contact our support team if you have concerns about unauthorized access.

---
This is an automated message from LGA-Connect Portal.
© ${new Date().getFullYear()} LGA-Connect. All rights reserved.
    `.trim();

    const mailOptions = {
      from: {
        name: "LGA-Connect",
        address: process.env.SENDER_EMAIL,
      },
      to: user.email,
      subject: "Password Reset Request - LGA-Connect",
      text: textContent,
      html: htmlContent,
      priority: "high",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `✅ Password reset OTP sent to ${user.email} (MessageId: ${info.messageId})`
      );
    } catch (emailError) {
      console.error(
        `❌ Failed to send password reset OTP to ${user.email}:`,
        emailError.message
      );
      return res.json({
        success: false,
        message: "Failed to send password reset email. Please try again.",
      });
    }
    return res.json({
      success: true,
      message: "Reset OTP sent on Email;",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
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
    const user = await staffModel
      .findOne({ email })
      .select("+resetOtp +resetOtpExpireAt");
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
