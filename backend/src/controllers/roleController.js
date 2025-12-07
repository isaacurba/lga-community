import staffModel from "../models/staffModel.js";
import citizenModel from "../models/citizenModel.js";

export const getStaffData = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId;
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
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCitizenData = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId;
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
      userData: {
        name: user.ninId,
        name: user.firstName,
        name: user.lastName,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

