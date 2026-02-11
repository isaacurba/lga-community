import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Shared auth model for both staff and citizens
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      // FIX: normalize email for consistent lookups and uniqueness
      lowercase: true,
      trim: true,
      // FIX: basic email format guard (keep lenient for real-world emails)
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      // FIX: minimum password length (actual strength enforced at controller/UI if needed)
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["staff", "admin", "citizen"],
      required: true,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0,
    },
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
