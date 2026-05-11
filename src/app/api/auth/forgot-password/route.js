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
      from: "Crownledger <onboarding@resend.dev>",
      to: email,
      subject: "Reset your Crownledger password",
      html: `
        <div style="font-family:'Outfit',sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;">
          <h2 style="color:#1a56db;font-size:24px;margin-bottom:8px;">Password Reset</h2>
          <p style="color:#6b7280;font-size:15px;margin-bottom:24px;">Hi ${user.firstName}, use the code below to reset your password.</p>
          <div style="background:#f0f5ff;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
            <p style="font-size:36px;font-weight:700;color:#1a56db;letter-spacing:8px;margin:0;">${otp}</p>
          </div>
          <p style="color:#9ca3af;font-size:13px;">This code expires in 10 minutes. If you did not request a password reset, please ignore this email.</p>
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