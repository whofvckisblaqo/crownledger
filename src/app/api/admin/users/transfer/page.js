import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const {
      fromAccount,
      recipientName,
      recipientBank,
      routingNumber,
      accountNumber,
      amount,
      description,
    } = await req.json();

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

    if (!senderAccount) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 }
      );
    }

    if (senderAccount.balance < Number(amount)) {
      return NextResponse.json(
        { message: "Insufficient funds in your account." },
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
      description: description || `Transfer to ${recipientName}`,
      reference,
      // Store extra details in description
    });

    // Store recipient details in a way we can retrieve
    await Transaction.findByIdAndUpdate(transaction._id, {
      description: JSON.stringify({
        note: description || "",
        recipientName,
        recipientBank,
        routingNumber,
        accountNumber,
      }),
    });

    // Send pending email to user
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
            Your transfer request has been received and is currently pending approval by our team. You will be notified once it is processed.
          </p>
          <div style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="color:#92400e;font-size:13px;font-weight:600;margin:0 0 12px;">Transfer Details</p>
            <table style="width:100%;font-size:13px;color:#374151;">
              <tr><td style="padding:4px 0;color:#9ca3af;">Reference</td><td style="text-align:right;font-weight:600;">${reference}</td></tr>
              <tr><td style="padding:4px 0;color:#9ca3af;">Amount</td><td style="text-align:right;font-weight:700;color:#1a56db;font-size:18px;">$${Number(amount).toFixed(2)}</td></tr>
              <tr><td style="padding:4px 0;color:#9ca3af;">To</td><td style="text-align:right;font-weight:600;">${recipientName}</td></tr>
              <tr><td style="padding:4px 0;color:#9ca3af;">Bank</td><td style="text-align:right;font-weight:600;">${recipientBank}</td></tr>
              <tr><td style="padding:4px 0;color:#9ca3af;">Account</td><td style="text-align:right;font-weight:600;">****${accountNumber.slice(-4)}</td></tr>
              <tr><td style="padding:4px 0;color:#9ca3af;">Status</td><td style="text-align:right;"><span style="background:#fef3c7;color:#d97706;padding:2px 8px;border-radius:6px;font-weight:600;">Pending</span></td></tr>
            </table>
          </div>
          <p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">
            Transfers are typically processed within 1–2 business days. If you did not make this request, contact us immediately.
          </p>
          <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Crownledger Inc. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        message: "Transfer submitted successfully. Pending approval.",
        reference,
        transactionId: transaction._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}