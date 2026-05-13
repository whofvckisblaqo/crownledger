import mongoose from "mongoose";

const CryptoWalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    balances: {
      BTC:   { type: Number, default: 0 },
      ETH:   { type: Number, default: 0 },
      USDT:  { type: Number, default: 0 },
      BNB:   { type: Number, default: 0 },
      SOL:   { type: Number, default: 0 },
      XRP:   { type: Number, default: 0 },
      USDC:  { type: Number, default: 0 },
      ADA:   { type: Number, default: 0 },
      AVAX:  { type: Number, default: 0 },
      DOGE:  { type: Number, default: 0 },
      TRX:   { type: Number, default: 0 },
      LINK:  { type: Number, default: 0 },
      DOT:   { type: Number, default: 0 },
      MATIC: { type: Number, default: 0 },
      SHIB:  { type: Number, default: 0 },
      LTC:   { type: Number, default: 0 },
      BCH:   { type: Number, default: 0 },
      UNI:   { type: Number, default: 0 },
      ATOM:  { type: Number, default: 0 },
      XLM:   { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.CryptoWallet || mongoose.model("CryptoWallet", CryptoWalletSchema);