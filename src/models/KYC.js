import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    documentType: {
      type: String,
      enum: ["passport", "drivers_license", "national_id", "residence_permit"],
      required: true,
    },
    documentNumber: { type: String, required: true },
    documentFront: { type: String, required: true }, // Cloudinary URL
    documentBack: { type: String, default: "" },     // Cloudinary URL
    selfie: { type: String, default: "" },           // Cloudinary URL
    dateOfBirth: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    rejectionReason: { type: String, default: "" },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.KYC || mongoose.model("KYC", KYCSchema);