import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const user = await User.findById(session.user.id).select("-password -otp -otpExpiry");
    if (!user) return NextResponse.json({ message: "User not found." }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { type } = body;

    if (type === "profile") {
      const { firstName, lastName, phone, address, city, state, zipCode } = body;

      if (!firstName || !lastName) {
        return NextResponse.json({ message: "First and last name are required." }, { status: 400 });
      }

      const user = await User.findByIdAndUpdate(
        session.user.id,
        { firstName, lastName, phone, address, city, state, zipCode },
        { new: true }
      ).select("-password -otp -otpExpiry");

      return NextResponse.json({ message: "Profile updated successfully.", user }, { status: 200 });
    }

    if (type === "password") {
      const { currentPassword, newPassword } = body;

      if (!currentPassword || !newPassword) {
        return NextResponse.json({ message: "All password fields are required." }, { status: 400 });
      }

      if (newPassword.length < 8) {
        return NextResponse.json({ message: "New password must be at least 8 characters." }, { status: 400 });
      }

      const user = await User.findById(session.user.id);
      const isValid = await bcrypt.compare(currentPassword, user.password);

      if (!isValid) {
        return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
      }

      const hashed = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(session.user.id, { password: hashed });

      return NextResponse.json({ message: "Password changed successfully." }, { status: 200 });
    }

    if (type === "notifications") {
      const { notifications } = body;
      await User.findByIdAndUpdate(session.user.id, { notifications });
      return NextResponse.json({ message: "Notification preferences saved." }, { status: 200 });
    }

    if (type === "preferences") {
      const { preferences } = body;
      await User.findByIdAndUpdate(session.user.id, { preferences });
      return NextResponse.json({ message: "Preferences saved." }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid update type." }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}