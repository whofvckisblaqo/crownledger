import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderAccount: { type: String },
    receiverAccount: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["transfer", "deposit", "withdrawal", "payment"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    description: { type: String },
    reference: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);