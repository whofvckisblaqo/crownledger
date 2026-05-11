import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ["checking", "savings"], required: true },
    balance: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["active", "frozen", "closed"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);