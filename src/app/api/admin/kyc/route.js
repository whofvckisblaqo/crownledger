import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import KYC from "@/models/KYC";
import Notification from "@/models/Notification";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const kycs = await KYC.find({})
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ kycs }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { kycId, status, rejectionReason } = await req.json();

    if (!kycId || !status) {
      return NextResponse.json(
        { message: "kycId and status are required." },
        { status: 400 }
      );
    }

    const kyc = await KYC.findByIdAndUpdate(
      kycId,
      {
        status,
        rejectionReason: rejectionReason || "",
        reviewedAt: new Date(),
      },
      { new: true }
    );

    if (!kyc) {
      return NextResponse.json({ message: "KYC not found." }, { status: 404 });
    }

    // Notify user
    await Notification.create({
      userId: kyc.userId,
      title: status === "approved" ? "KYC Approved ✅" : "KYC Rejected ❌",
      message: status === "approved"
        ? "Your identity has been verified successfully. Your account is now fully verified."
        : `Your KYC was rejected. Reason: ${rejectionReason || "Does not meet requirements"}. Please resubmit.`,
      type: status === "approved" ? "success" : "warning",
      link: "/dashboard/kyc",
    });

    // Send email
    try {
      const user = await User.findById(kyc.userId);
      if (user?.email) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Crownledger <noreply@crownledgerapp.com>",
          to: user.email,
          subject: status === "approved"
            ? "Identity Verification Approved — Crownledger"
            : "Identity Verification Rejected — Crownledger",
          html: `
            <div style="font-family:'Outfit',sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
              <div style="text-align:center;margin-bottom:24px;">
                <div style="width:48px;height:48px;background:#1a56db;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="color:white;font-size:20px;font-weight:700;">C</span>
                </div>
                <h1 style="color:#0a0f1e;font-size:22px;font-weight:700;margin:0;">
                  KYC ${status === "approved" ? "Approved" : "Rejected"}
                </h1>
              </div>
              <p style="color:#6b7280;font-size:15px;margin-bottom:16px;">Hi ${user.firstName},</p>
              <p style="color:#6b7280;font-size:15px;margin-bottom:24px;">
                ${status === "approved"
                  ? "Great news! Your identity verification has been approved. Your Crownledger account is now fully verified."
                  : `Your identity verification was rejected. Reason: <strong>${rejectionReason || "Does not meet requirements"}</strong>. Please log in and resubmit your documents.`
                }
              </p>
              <div style="text-align:center;margin-bottom:24px;">
                <a href="https://www.crownledgerapp.com/dashboard/kyc"
                  style="display:inline-block;background:#2563eb;color:white;font-weight:600;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;">
                  ${status === "approved" ? "Go to Dashboard" : "Resubmit Documents"} →
                </a>
              </div>
              <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;">
                <p style="color:#9ca3af;font-size:12px;margin:0;">© 2026 Crownledger Inc. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email error:", emailErr.message);
    }

    return NextResponse.json({ message: "KYC updated.", kyc }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}