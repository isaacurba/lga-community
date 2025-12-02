// Fix: Correct the bcrypt import typo
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Fixed typo: was "bycriptjs"

const citizenSchema = new mongoose.Schema(
  {
    ninId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    currentAddress: {
      type: String,
    },
    originalLga: {
      type: String,
      required: true,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    verifyOtpExpireAt: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

citizenSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

citizenSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Citizen = mongoose.model("Citizen", citizenSchema);

// Fix: Use ES Module export syntax
export default Citizen;
