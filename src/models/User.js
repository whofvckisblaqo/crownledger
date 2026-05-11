import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    otp: { type: String },
    otpExpiry: { type: Date },

    // Profile extras
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },

    // Notification preferences
    notifications: {
      emailTransfers: { type: Boolean, default: true },
      emailDeposits: { type: Boolean, default: true },
      emailSecurity: { type: Boolean, default: true },
      emailMarketing: { type: Boolean, default: false },
      smsTransfers: { type: Boolean, default: false },
      smsDeposits: { type: Boolean, default: false },
    },

    // Preferences
    preferences: {
      currency: { type: String, default: "USD" },
      language: { type: String, default: "English" },
      timezone: { type: String, default: "America/New_York" },
      twoFactorEnabled: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);