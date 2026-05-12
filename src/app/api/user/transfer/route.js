import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import Notification from "@/models/Notification";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    console.log("🔐 Session:", session?.user?.id);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    console.log("✅ MongoDB connected");

    const body = await req.json();
    console.log("📦 Body:", body);

    const {
      fromAccount,
      recipientName,
      recipientBank,
      routingNumber,
      accountNumber,
      amount,
      description,
    } = body;

    if (!fromAccount || !recipientName || !recipientBank || !routingNumber || !accountNumber || !amount) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than zero." },
        { status: 400 }
      );
    }

    // Get sender account
    const senderAccount = await Account.findOne({
      userId: session.user.id,
      type: fromAccount,
    });

    console.log("💳 Sender account:", senderAccount);

    if (!senderAccount) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 }
      );
    }

    if (senderAccount.balance < Number(amount)) {
      return NextResponse.json(
        { message: `Insufficient funds. Available: $${senderAccount.balance.toFixed(2)}` },
        { status: 400 }
      );
    }

    if (senderAccount.status !== "active") {
      return NextResponse.json(
        { message: "Your account is not active." },
        { status: 400 }
      );
    }

    // Generate reference
    const reference = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Create pending transaction
    const transaction = await Transaction.create({
      senderId: session.user.id,
      senderAccount: senderAccount.accountNumber,
      receiverAccount: accountNumber,
      amount: Number(amount),
      type: "transfer",
      status: "pending",
      description: JSON.stringify({
        note: description || "",
        recipientName,
        recipientBank,
        routingNumber,
        accountNumber,
      }),
      reference,
    });

    console.log("✅ Transaction created:", transaction._id);

    // Create notification for user
    await Notification.create({
      userId: session.user.id,
      title: "Transfer Submitted",
      message: `Your transfer of $${Number(amount).toFixed(2)} to ${recipientName} is pending approval.`,
      type: "transfer",
      link: "/dashboard/transactions",
    });

    // Send pending email
    try {
      const user = await User.findById(session.user.id);
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Crownledger <noreply@crownledgerapp.com>",
        to: user.email,
        subject: "Transfer Request Received — Pending Approval",
        html: `
          <div style="font-family:'Outfit',sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="width:48px;height:48px;background:#1a56db;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                <span style="color:white;font-size:20px;font-weight:700;">C</span>
              </div>
              <h1 style="color:#0a0f1e;font-size:22px;font-weight:700;margin:0;">Transfer Request Received</h1>
            </div>
            <p style="color:#6b7280;font-size:15px;margin-bottom:8px;">Hi ${user.firstName},</p>
            <p style="color:#6b7280;font-size:15px;margin-bottom:24px;">
              Your transfer request has been received and is pending approval by our team.
            </p>
            <div style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:20px;margin-bottom:24px;">
              <table style="width:100%;font-size:13px;color:#374151;">
                <tr><td style="padding:4px 0;color:#9ca3af;">Reference</td><td style="text-align:right;font-weight:600;">${reference}</td></tr>
                <tr><td style="padding:4px 0;color:#9ca3af;">Amount</td><td style="text-align:right;font-weight:700;color:#1a56db;font-size:18px;">$${Number(amount).toFixed(2)}</td></tr>
                <tr><td style="padding:4px 0;color:#9ca3af;">To</td><td style="text-align:right;font-weight:600;">${recipientName}</td></tr>
                <tr><td style="padding:4px 0;color:#9ca3af;">Bank</td><td style="text-align:right;font-weight:600;">${recipientBank}</td></tr>
                <tr><td style="padding:4px 0;color:#9ca3af;">Account</td><td style="text-align:right;font-weight:600;">****${accountNumber.slice(-4)}</td></tr>
                <tr><td style="padding:4px 0;color:#9ca3af;">Status</td><td style="text-align:right;"><span style="background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:6px;font-weight:600;">Pending</span></td></tr>
              </table>
            </div>
            <p style="color:#9ca3af;font-size:13px;text-align:center;">
              You will receive another email once your transfer is approved or declined.
            </p>
            <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;margin-top:24px;">
              <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Crownledger Inc. All rights reserved.</p>
            </div>
          </div>
        `,
      });
      console.log("✅ Email sent");
    } catch (emailErr) {
      console.error("⚠️ Email failed but transfer created:", emailErr.message);
      // Don't fail the whole request if email fails
    }

    return NextResponse.json(
      {
        message: "Transfer submitted successfully. Pending approval.",
        reference,
        transactionId: transaction._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Transfer error:", err.message);
    return NextResponse.json(
      { message: err.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}