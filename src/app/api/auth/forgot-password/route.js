import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // Always return success even if user not found — security best practice
    if (!user) {
      return NextResponse.json(
        { message: "If this email exists, a reset code has been sent." },
        { status: 200 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, { otp, otpExpiry });

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Crownledger <noreply@crownledgerapp.com>",
      to: email,
      subject: "Reset your Crownledger password",
      html: `
        <div style="font-family:'Outfit',sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="width:48px;height:48px;background:#1a56db;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              <span style="color:white;font-size:20px;font-weight:700;">C</span>
            </div>
            <h1 style="color:#0a0f1e;font-size:24px;font-weight:700;margin:0;">Password Reset</h1>
          </div>
          <p style="color:#6b7280;font-size:15px;margin-bottom:8px;">Hi ${user.firstName},</p>
          <p style="color:#6b7280;font-size:15px;margin-bottom:24px;">
            We received a request to reset your Crownledger password. Use the code below to proceed.
          </p>
          <div style="background:#f0f5ff;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
            <p style="font-size:42px;font-weight:700;color:#1a56db;letter-spacing:12px;margin:0;">${otp}</p>
          </div>
          <p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">
            This code expires in <strong>10 minutes</strong>. Do not share it with anyone.
          </p>
          <div style="background:#fff8ed;border-radius:12px;padding:16px;margin-bottom:24px;">
            <p style="color:#d97706;font-size:13px;margin:0;text-align:center;">
              ⚠️ If you did not request a password reset, please secure your account immediately.
            </p>
          </div>
          <div style="border-top:1px solid #e5e7eb;padding-top:24px;text-align:center;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">
              © 2026 Crownledger Inc. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Reset code sent successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}