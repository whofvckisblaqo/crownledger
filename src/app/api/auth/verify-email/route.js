import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required." },
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

    if (user.isVerified) {
      return NextResponse.json(
        { message: "Email is already verified." },
        { status: 400 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid verification code." },
        { status: 400 }
      );
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json(
        { message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      otp: null,
      otpExpiry: null,
    });

    return NextResponse.json(
      { message: "Email verified successfully." },
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