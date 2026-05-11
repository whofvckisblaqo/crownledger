import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({})
      .select("-password -otp -otpExpiry")
      .sort({ createdAt: -1 });

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const { userId, status } = await req.json();

    if (!userId || !status) {
      return NextResponse.json(
        { message: "userId and status are required." },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(userId, { status });

    return NextResponse.json(
      { message: "User status updated." },
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