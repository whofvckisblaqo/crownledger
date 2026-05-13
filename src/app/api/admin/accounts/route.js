import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";
import User from "@/models/User";
import Notification from "@/models/Notification";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};
    const accounts = await Account.find(query)
      .populate("userId", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({ accounts }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { accountId, status } = await req.json();

    if (!accountId || !status) {
      return NextResponse.json(
        { message: "accountId and status are required." },
        { status: 400 }
      );
    }

    const account = await Account.findByIdAndUpdate(
      accountId,
      { status },
      { new: true }
    );

    if (!account) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 }
      );
    }

    const isFrozen = status === "frozen";

    // Get user details
    const user = await User.findById(account.userId);

    if (user) {
      // Send notification
      await Notification.create({
        userId: account.userId,
        title: isFrozen ? "Account Frozen ❄️" : "Account Unfrozen ✅",
        message: isFrozen
          ? `Your ${account.type} account ending in ****${account.accountNumber?.slice(-4)} has been frozen. Contact support for assistance.`
          : `Your ${account.type} account ending in ****${account.accountNumber?.slice(-4)} has been unfrozen and is now active.`,
        type: isFrozen ? "warning" : "success",
        link: "/dashboard/accounts",
      });

      // Send email
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Crownledger Private Banking <noreply@crownledgerapp.com>",
          to: user.email,
          subject: isFrozen
            ? `Your Account Has Been Frozen | Crownledger`
            : `Your Account Has Been Unfrozen | Crownledger`,
          html: `
            <div style="font-family:'Outfit',sans-serif;max-width:520px;margin:0 auto;padding:0;background:#f9fafb;">

              <div style="background:linear-gradient(135deg,${isFrozen ? "#dc2626,#991b1b" : "#1a56db,#0f3a8a"});padding:40px 32px;text-align:center;border-radius:16px 16px 0 0;">
                <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="color:white;font-size:20px;font-weight:700;">C</span>
                </div>
                <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0 0 16px;">Crownledger Private Banking</p>
                <div style="width:64px;height:64px;background:rgba(255,255,255,0.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="font-size:28px;">${isFrozen ? "❄️" : "✅"}</span>
                </div>
                <h1 style="color:white;font-size:24px;font-weight:700;margin:0 0 8px;">
                  Account ${isFrozen ? "Frozen" : "Unfrozen"}
                </h1>
                <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0;">
                  ${isFrozen
                    ? "Your account has been temporarily frozen"
                    : "Your account has been restored and is active"
                  }
                </p>
              </div>

              <div style="background:white;padding:0 32px;">
                <div style="border-top:2px dashed #e5e7eb;margin:0;position:relative;">
                  <div style="position:absolute;left:-16px;top:-12px;width:24px;height:24px;background:#f9fafb;border-radius:50%;border:1px solid #e5e7eb;"></div>
                  <div style="position:absolute;right:-16px;top:-12px;width:24px;height:24px;background:#f9fafb;border-radius:50%;border:1px solid #e5e7eb;"></div>
                </div>
              </div>

              <div style="background:white;padding:32px;border-radius:0 0 16px 16px;">
                <p style="color:#6b7280;font-size:15px;margin:0 0 24px;">
                  Hi ${user.firstName}, ${isFrozen
                    ? "your account has been <strong>temporarily frozen</strong> by our security team. During this time, you will not be able to make transfers or withdrawals."
                    : "your account has been <strong>unfrozen</strong> and restored to full active status. You can now make transfers and use all banking features."
                  }
                </p>

                <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:20px;">
                  <p style="color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">Account Details</p>
                  <table style="width:100%;font-size:13px;border-collapse:collapse;">
                    <tr style="border-bottom:1px solid #f3f4f6;">
                      <td style="padding:8px 0;color:#9ca3af;">Account Type</td>
                      <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;text-transform:capitalize;">${account.type}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f3f4f6;">
                      <td style="padding:8px 0;color:#9ca3af;">Account Number</td>
                      <td style="padding:8px 0;text-align:right;font-weight:600;color:#374151;">****${account.accountNumber?.slice(-4)}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f3f4f6;">
                      <td style="padding:8px 0;color:#9ca3af;">Status</td>
                      <td style="padding:8px 0;text-align:right;">
                        <span style="background:${isFrozen ? "#fee2e2" : "#dcfce7"};color:${isFrozen ? "#dc2626" : "#16a34a"};padding:3px 10px;border-radius:6px;font-weight:600;font-size:12px;">
                          ${isFrozen ? "Frozen" : "Active"}
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

                ${isFrozen ? `
                <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px;margin-bottom:20px;">
                  <p style="color:#dc2626;font-size:13px;font-weight:600;margin:0 0 8px;">What does this mean?</p>
                  <ul style="color:#6b7280;font-size:13px;margin:0;padding-left:16px;line-height:1.8;">
                    <li>You cannot make outgoing transfers</li>
                    <li>Your balance is safe and secured</li>
                    <li>Contact support to resolve this</li>
                  </ul>
                </div>` : ""}

                <div style="text-align:center;margin-bottom:20px;">
                  <a href="${isFrozen ? "mailto:support@crownledgerapp.com" : "https://www.crownledgerapp.com/dashboard"}"
                    style="display:inline-block;background:${isFrozen ? "#dc2626" : "#2563eb"};color:white;font-weight:600;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;">
                    ${isFrozen ? "Contact Support →" : "Go to Dashboard →"}
                  </a>
                </div>

                <p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">
                  ${isFrozen
                    ? "If you believe this is a mistake, please contact our support team immediately."
                    : "Your account is now fully restored. Thank you for banking with Crownledger."
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
        console.log("✅ Account freeze email sent to:", user.email);
      } catch (emailErr) {
        console.error("❌ Freeze email error:", emailErr.message);
      }
    }

    return NextResponse.json(
      { message: `Account ${status} successfully.` },
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