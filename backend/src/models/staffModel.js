import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // FIX: link staff profile to shared User auth record
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      // FIX: normalize and constrain staff name length
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
