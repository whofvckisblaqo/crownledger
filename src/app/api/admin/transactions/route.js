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
    if (
      status === "completed" &&
      transaction.type === "transfer" &&
      transaction.status === "pending"
    ) {
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
      note = transaction.description || "";
    }

    // Get sender email — fallback to direct DB lookup
    let senderEmail = transaction.senderId?.email;
    let senderFirstName = transaction.senderId?.firstName;

    if (!senderEmail && transaction.senderId) {
      const senderUser = await User.findById(
        transaction.senderId?._id || transaction.senderId
      );
      senderEmail = senderUser?.email;
      senderFirstName = senderUser?.firstName;
    }

    console.log("📧 Sending email to:", senderEmail);

    if (senderEmail) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const isApproved = status === "completed";
      const isFailed = status === "failed";

      if (isApproved || isFailed) {
        try {
          await resend.emails.send({
            from: "Crownledger <noreply@crownledgerapp.com>",
            to: senderEmail,
            subject: isApproved
              ? `✅ Transfer of $${transaction.amount.toFixed(2)} Approved — Receipt`
              : `❌ Transfer of $${transaction.amount.toFixed(2)} Declined`,
            html: `
              <div style="font-family:'Outfit',sans-serif;max-width:520px;margin:0 auto;padding:0;background:#f9fafb;">

                <div style="background:linear-gradient(135deg,#1a56db,#0f3a8a);padding:40px 32px;text-align:center;border-radius:16px 16px 0 0;">
                  <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <span style="color:white;font-size:20px;font-weight:700;">C</span>
                  </div>
                  <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0 0 16px;">Crownledger Private Banking</p>
                  <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <span style="font-size:28px;">${isApproved ? "✅" : "❌"}</span>
                  </div>
                  <h1 style="color:white;font-size:24px;font-weight:700;margin:0 0 8px;">
                    Transfer ${isApproved ? "Approved" : "Declined"}
                  </h1>
                  <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0 0 24px;">
                    ${isApproved ? "Your funds are on their way" : "No funds were deducted"}
                  </p>
                  <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 4px;">Amount</p>
                  <p style="color:white;font-size:42px;font-weight:700;margin:0;">$${transaction.amount.toFixed(2)}</p>
                  <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:4px 0 0;">USD</p>
                </div>

                <div style="background:white;padding:0 32px;">
                  <div style="border-top:2px dashed #e5e7eb;margin:0;position:relative;">
                    <div style="position:absolute;left:-16px;top:-12px;width:24px;height:24px;background:#f9fafb;border-radius:50%;border:1px solid #e5e7eb;"></div>
                    <div style="position:absolute;right:-16px;top:-12px;width:24px;height:24px;background:#f9fafb;border-radius:50%;border:1px solid #e5e7eb;"></div>
                  </div>
                </div>

                <div style="background:white;padding:32px;border-radius:0 0 16px 16px;">
                  <p style="color:#6b7280;font-size:15px;margin:0 0 24px;">
                    Hi ${senderFirstName}, ${isApproved
                      ? `your transfer of <strong>$${transaction.amount.toFixed(2)}</strong> to <strong>${recipientName}</strong> has been approved and is on its way.`
                      : `your transfer of <strong>$${transaction.amount.toFixed(2)}</strong> to <strong>${recipientName}</strong> has been declined.`
                    }
                  </p>

                  <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:20px;">
                    <p style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">
                      Transaction Details
                    </p>
                    <table style="width:100%;font-size:13px;border-collapse:collapse;">
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Reference</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#2563eb;font-family:monospace;">${transaction.reference}</td>
                      </tr>
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Amount</td>
                        <td style="padding:8px 0;text-align:right;font-weight:700;font-size:18px;color:${isApproved ? "#16a34a" : "#dc2626"};">$${transaction.amount.toFixed(2)}</td>
                      </tr>
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Recipient</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;">${recipientName}</td>
                      </tr>
                      ${recipientBank ? `
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Bank</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;">${recipientBank}</td>
                      </tr>` : ""}
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Account</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;">****${recipientAccount.slice(-4)}</td>
                      </tr>
                      ${note ? `
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Note</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;">${note}</td>
                      </tr>` : ""}
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Transfer Fee</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#16a34a;">Free</td>
                      </tr>
                      <tr style="border-bottom:1px solid #f3f4f6;">
                        <td style="padding:8px 0;color:#9ca3af;">Status</td>
                        <td style="padding:8px 0;text-align:right;">
                          <span style="background:${isApproved ? "#dcfce7" : "#fee2e2"};color:${isApproved ? "#16a34a" : "#dc2626"};padding:3px 10px;border-radius:6px;font-weight:600;font-size:12px;">
                            ${isApproved ? "Completed" : "Declined"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#9ca3af;">Date</td>
                        <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;">
                          ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    </table>
                  </div>

                  ${isApproved ? `
                  <div style="text-align:center;margin-bottom:20px;">
                    <a href="https://www.crownledgerapp.com/dashboard/transactions"
                      style="display:inline-block;background:#2563eb;color:white;font-weight:600;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;">
                      View Receipt in Dashboard →
                    </a>
                  </div>` : ""}

                  <p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">
                    ${isApproved
                      ? "Funds typically arrive within 1–2 business days depending on the receiving bank."
                      : "No funds were deducted from your account. Contact support if you need assistance."
                    }
                  </p>

                  <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;">
                    <p style="font-size:12px;color:#16a34a;font-weight:600;margin:0 0 8px;">🔒 FDIC Insured · 256-bit Encryption</p>
                    <p style="color:#9ca3af;font-size:12px;margin:4px 0;">support@crownledgerapp.com · +1 (800) 276-9654</p>
                    <p style="color:#d1d5db;font-size:11px;margin:8px 0 0;">© 2026 Crownledger Inc. · 123 Wall Street, New York, NY 10005</p>
                  </div>
                </div>
              </div>
            `,
          });
          console.log("✅ Email sent to:", senderEmail);
        } catch (emailErr) {
          console.error("❌ Email error:", emailErr.message);
        }
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