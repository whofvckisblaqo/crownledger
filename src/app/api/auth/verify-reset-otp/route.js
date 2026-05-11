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

    return NextResponse.json(
      { message: "OTP verified." },
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