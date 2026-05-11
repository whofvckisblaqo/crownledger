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
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { userId, status, role, isVerified } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "userId is required." }, { status: 400 });
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (role !== undefined) updateData.role = role;
    if (isVerified !== undefined) updateData.isVerified = isVerified;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true })
      .select("-password -otp -otpExpiry");

    return NextResponse.json({ message: "User updated.", user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "userId is required." }, { status: 400 });
    }

    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "User deleted." }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}