import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Account from "@/models/Account";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export async function POST(req) {
  try {
    console.log("📩 Register route hit");
    await connectDB();
    console.log("✅ MongoDB connected");

    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    // Auto create checking and savings accounts
    await Account.create([
      {
        userId: user._id,
        accountNumber: generateAccountNumber(),
        type: "checking",
        balance: 0,
        currency: "USD",
        status: "active",
      },
      {
        userId: user._id,
        accountNumber: generateAccountNumber(),
        type: "savings",
        balance: 0,
        currency: "USD",
        status: "active",
      },
    ]);

    console.log("✅ User and accounts created:", user._id);

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Crownledger <noreply@crownledgerapp.com>",
      to: email,
      subject: "Verify your Crownledger account",
      html: `
        <div style="font-family:'Outfit',sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="width:48px;height:48px;background:#1a56db;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              <span style="color:white;font-size:20px;font-weight:700;">C</span>
            </div>
            <h1 style="color:#0a0f1e;font-size:24px;font-weight:700;margin:0;">Welcome to Crownledger</h1>
          </div>
          <p style="color:#6b7280;font-size:15px;margin-bottom:8px;">Hi ${firstName},</p>
          <p style="color:#6b7280;font-size:15px;margin-bottom:24px;">
            Thank you for signing up. Use the code below to verify your email address.
          </p>
          <div style="background:#f0f5ff;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
            <p style="font-size:42px;font-weight:700;color:#1a56db;letter-spacing:12px;margin:0;">${otp}</p>
          </div>
          <p style="color:#9ca3af;font-size:13px;text-align:center;margin-bottom:24px;">
            This code expires in <strong>10 minutes</strong>. Do not share it with anyone.
          </p>
          <div style="border-top:1px solid #e5e7eb;padding-top:24px;text-align:center;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">
              If you did not create a Crownledger account, you can safely ignore this email.
            </p>
            <p style="color:#9ca3af;font-size:12px;margin:8px 0 0;">
              © 2026 Crownledger Inc. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Account created. Please verify your email." },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Register error:", err.message);
    return NextResponse.json(
      { message: err.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}