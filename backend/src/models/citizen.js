import mongoose from "mongoose"
import bcrypt from "bycriptjs" // Must require bcrypt for password hashing

const CitizenSchema = new mongoose.Schema({
  ninId: {
    type: String,
    required: [true, 'NIN ID is required.'],
    unique: true,
    minlength: 11,
    maxlength: 11,
    trim: true,
  },
  // We add a password field so the citizen can log in later
  password: { 
    type: String,
    required: [true, 'Password is required for portal access.'],
    minlength: 6,
    select: false, // Prevents password from being returned in query results
  },
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  currentAddress: {
    type: String,
    required: false,
  },
  originalLga: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true
});

// Middleware to hash password before saving (PRE-SAVE HOOK)
CitizenSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password for Citizen Login
CitizenSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Citizen = mongoose.model('Citizen', CitizenSchema);
module.exports = Citizen;