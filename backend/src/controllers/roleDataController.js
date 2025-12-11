import staffModel from "../models/staffModel.js";
import citizenModel from "../models/citizenModel.js";

export const getStaffData = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({
        success: false,
        message: "Missing userId",
      });
    }
    const user = await staffModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,  
      staffData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
        role: "staff",
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

export const getCitizenData = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({
        success: false,
        message: "Missing userId",
      });
    }
    const user = await citizenModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      citizenData: {
        ninId: user.ninId,
        firstName: user.firstName,
        lastName: user.lastName,
        isAccountVerified: user.isAccountVerified,
        role: "citizen",
      },
    });
  } catch (error) {
    console.error("Error in getCitizenData:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
