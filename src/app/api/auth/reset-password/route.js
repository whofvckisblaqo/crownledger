import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email." },
        { status: 404 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid reset code." },
        { status: 400 }
      );
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json(
        { message: "Reset code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
    });

    return NextResponse.json(
      { message: "Password reset successfully." },
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