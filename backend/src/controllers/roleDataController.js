
import staffModel from "../models/staffModel.js";
import citizenModel from "../models/citizenModel.js";
import User from "../models/userModel.js";

export const getStaffData = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({
        success: false,
        message: "Missing userId",
      });
    }
    // FIX: userId now refers to shared User; fetch staff profile by userId
    const user = await User.findById(userId);
    const staffProfile = await staffModel.findOne({ userId });

    if (!user || !staffProfile) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,  
      staffData: {
        name: staffProfile.name,
        isAccountVerified: user.isAccountVerified,
        role: user.role || "staff",
      },
    });
  } catch (error) {
    console.error("Error in getStaffData:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// --- NEW FUNCTION: Get All Citizens ---
export const getAllCitizens = async (req, res) => {
    try {
        // Fetch all documents from the Citizen collection
        // sort({ createdAt: -1 }) puts the newest registrations first
        const citizens = await citizenModel.find({}).sort({ createdAt: -1 });

        res.json({
            success: true,
            citizens
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getCitizenData = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({
        success: false,
        message: "Missing userId",
      });
    }
    // FIX: userId now refers to shared User; fetch citizen profile by userId
    const user = await User.findById(userId);
    const citizenProfile = await citizenModel.findOne({ userId });

    if (!user || !citizenProfile) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      citizenData: {
        ninId: citizenProfile.ninId,
        name: citizenProfile.firstName,
        lastName: citizenProfile.lastName,
        isAccountVerified: user.isAccountVerified,
        role: user.role || "citizen",
      },
    });
  } catch (error) {
    console.error("Error in getCitizenData:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
