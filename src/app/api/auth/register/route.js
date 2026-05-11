import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    console.log("📩 Register route hit");

    await connectDB();
    console.log("✅ MongoDB connected");

    const body = await req.json();
    console.log("📦 Body received:", body);

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
      isVerified: true, // temporary for testing — remove when Resend domain is ready
    });

    console.log("✅ User created:", user._id);

    return NextResponse.json(
      { message: "Account created successfully." },
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