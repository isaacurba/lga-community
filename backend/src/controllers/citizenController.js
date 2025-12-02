import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Citizen from "../models/citizenModel.js";
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
// @route   POST /api/staff/auth/citizen/login
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

    // Professional HTML email template
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
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">LGA-Connect</h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Citizen Portal</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">Welcome, ${firstName} ${lastName}!</h2>
                    
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                      Your citizen account has been successfully created by our authorized staff. We're excited to have you join the LGA-Connect Portal.
                    </p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
                      <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">Your Login Credentials</h3>
                      <table cellpadding="8" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold; width: 30%;">Email:</td>
                          <td style="color: #333333; font-size: 14px; font-family: 'Courier New', monospace;">${email}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold;">NIN ID:</td>
                          <td style="color: #333333; font-size: 14px; font-family: 'Courier New', monospace;">${ninId}</td>
                        </tr>
                        <tr>
                          <td style="color: #666666; font-size: 14px; font-weight: bold;">Password:</td>
                          <td style="color: #333333; font-size: 14px; font-family: 'Courier New', monospace;">${password}</td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                        <strong>⚠️ Important Security Notice:</strong> Please log in to your account and change your password immediately. Keep your credentials secure and never share them with anyone.
                      </p>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/citizen/login"
                         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                        Access Citizen Portal
                      </a>
                    </div>
                    
                    <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                      If you have any questions or need assistance, please don't hesitate to contact our support team.
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

    // Plain text fallback for email clients that don't support HTML
    const textContent = `
Welcome to LGA-Connect Portal!

Dear ${firstName} ${lastName},

Your citizen account has been successfully created by our authorized staff. We're excited to have you join the LGA-Connect Portal.

YOUR LOGIN CREDENTIALS
=======================
Email: ${email}
NIN ID: ${ninId}
Password: ${password}

IMPORTANT SECURITY NOTICE
=========================
Please log in to your account and change your password immediately. Keep your credentials secure and never share them with anyone.

Access the Citizen Portal at: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/citizen/login

If you have any questions or need assistance, please don't hesitate to contact our support team.

---
This is an automated message from LGA-Connect Portal.
© ${new Date().getFullYear()} LGA-Connect. All rights reserved.
    `.trim();

    const mailOptions = {
      from: {
        name: 'LGA-Connect',
        address: process.env.SENDER_EMAIL
      },
      to: email,
      subject: ' Welcome to LGA-Connect - Your Account Credentials',
      text: textContent,
      html: htmlContent,
      priority: 'high',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent successfully to ${email} (MessageId: ${info.messageId})`);
    } catch (emailError) {
      console.error(`Failed to send welcome email to ${email}:`, emailError.message);
      // Continue execution - don't fail registration if email fails
      // You might want to implement a retry queue or notification system here
    }

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
