import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
  {
    // FIX: link citizen profile to shared User auth record
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ninId: {
      type: String,
      required: true,
      unique: true,
      // FIX: NIN must be exactly 11 digits (future NIMC API validation can be added at service layer)
      minlength: 11,
      maxlength: 11,
      match: [/^\d{11}$/, "NIN must be exactly 11 digits"],
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
    // NOTE: auth fields moved to User model
  },
  { timestamps: true }
);

const Citizen = mongoose.model("Citizen", citizenSchema);

export default Citizen;
