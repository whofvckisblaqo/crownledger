import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find({})
      .populate("senderId", "firstName lastName email")
      .populate("receiverId", "firstName lastName email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ transactions }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { transactionId, status } = await req.json();

    if (!transactionId || !status) {
      return NextResponse.json(
        { message: "transactionId and status are required." },
        { status: 400 }
      );
    }

    const transaction = await Transaction.findById(transactionId)
      .populate("senderId", "firstName lastName email");

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found." },
        { status: 404 }
      );
    }

    // If approving a transfer — deduct from sender account
    if (status === "completed" && transaction.type === "transfer" && transaction.status === "pending") {
      const senderAccount = await Account.findOne({
        accountNumber: transaction.senderAccount,
      });

      if (senderAccount) {
        if (senderAccount.balance < transaction.amount) {
          return NextResponse.json(
            { message: "Insufficient funds in sender account." },
            { status: 400 }
          );
        }
        await Account.findByIdAndUpdate(senderAccount._id, {
          $inc: { balance: -transaction.amount },
        });
      }
    }

    // Update transaction status
    await Transaction.findByIdAndUpdate(transactionId, { status });

    // Parse recipient details from description
    let recipientName = "Recipient";
    let recipientBank = "";
    let recipientAccount = transaction.receiverAccount || "";
    let note = "";

    try {
      const parsed = JSON.parse(transaction.description);
      recipientName = parsed.recipientName || recipientName;
      recipientBank = parsed.recipientBank || "";
      recipientAccount = parsed.accountNumber || recipientAccount;
      note = parsed.note || "";
    } catch (e) {
      // description is plain text
      note = transaction.description || "";
    }

    // Send email to sender
    if (transaction.senderId?.email) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const isApproved = status === "completed";
      const isFailed = status === "failed";

      if (isApproved || isFailed) {
        await resend.emails.send({
          from: "Crownledger <noreply@crownledgerapp.com>",
          to: transaction.senderId.email,
          subject: isApproved
            ? `Transfer of $${transaction.amount.toFixed(2)} Approved ✅`
            : `Transfer of $${transaction.amount.toFixed(2)} Declined ❌`,
          html: `
            <div style="font-family:'Outfit',sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
              <div style="text-align:center;margin-bottom:24px;">
                <div style="width:48px;height:48px;background:${isApproved ? "#16a34a" : "#dc2626"};border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="color:white;font-size:20px;">C</span>
                </div>
                <h1 style="color:#0a0f1e;font-size:22px;font-weight:700;margin:0;">
                  Transfer ${isApproved ? "Approved" : "Declined"}
                </h1>
              </div>
              <p style="color:#6b7280;font-size:15px;margin-bottom:8px;">
                Hi ${transaction.senderId.firstName},
              </p>
              <p style="color:#6b7280;font-size:15px;margin-bottom:24px;">
                ${isApproved
                  ? `Your transfer of <strong>$${transaction.amount.toFixed(2)}</strong> to <strong>${recipientName}</strong> has been approved and is on its way.`
                  : `We're sorry, your transfer of <strong>$${transaction.amount.toFixed(2)}</strong> to <strong>${recipientName}</strong> has been declined. No funds have been deducted from your account.`
                }
              </p>
              <div style="background:${isApproved ? "#f0fdf4" : "#fef2f2"};border:1px solid ${isApproved ? "#bbf7d0" : "#fecaca"};border-radius:12px;padding:20px;margin-bottom:24px;">
                <table style="width:100%;font-size:13px;color:#374151;">
                  <tr><td style="padding:4px 0;color:#9ca3af;">Reference</td><td style="text-align:right;font-weight:600;">${transaction.reference}</td></tr>
                  <tr><td style="padding:4px 0;color:#9ca3af;">Amount</td><td style="text-align:right;font-weight:700;font-size:18px;color:${isApproved ? "#16a34a" : "#dc2626"};">$${transaction.amount.toFixed(2)}</td></tr>
                  <tr><td style="padding:4px 0;color:#9ca3af;">To</td><td style="text-align:right;font-weight:600;">${recipientName}</td></tr>
                  ${recipientBank ? `<tr><td style="padding:4px 0;color:#9ca3af;">Bank</td><td style="text-align:right;font-weight:600;">${recipientBank}</td></tr>` : ""}
                  <tr><td style="padding:4px 0;color:#9ca3af;">Account</td><td style="text-align:right;font-weight:600;">****${recipientAccount.slice(-4)}</td></tr>
                  ${note ? `<tr><td style="padding:4px 0;color:#9ca3af;">Note</td><td style="text-align:right;font-weight:600;">${note}</td></tr>` : ""}
                  <tr><td style="padding:4px 0;color:#9ca3af;">Status</td><td style="text-align:right;"><span style="background:${isApproved ? "#dcfce7" : "#fee2e2"};color:${isApproved ? "#16a34a" : "#dc2626"};padding:2px 8px;border-radius:6px;font-weight:600;">${isApproved ? "Completed" : "Declined"}</span></td></tr>
                  <tr><td style="padding:4px 0;color:#9ca3af;">Date</td><td style="text-align:right;font-weight:600;">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td></tr>
                </table>
              </div>
              ${isApproved
                ? `<p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">Funds typically arrive within 1–2 business days depending on the receiving bank.</p>`
                : `<p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">If you believe this was a mistake, please contact our support team immediately.</p>`
              }
              <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;">
                <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Crownledger Inc. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      }
    }

    return NextResponse.json(
      { message: "Transaction updated." },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}