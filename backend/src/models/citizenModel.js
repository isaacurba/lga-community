import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      lowercase: true,
      trim: true,
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
    otherName: {
      type: String,
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
    role: {
      type: String,
      enum: ["citizen", "staff"],
      default: "citizen",
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    sendResetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpireAt: {
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

export default Citizen;
