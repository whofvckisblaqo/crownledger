import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { firstName, lastName, email, phone, password, adminSecret } = await req.json();

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { message: "Invalid admin secret code." },
        { status: 401 }
      );
    }

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

    await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    return NextResponse.json(
      { message: "Admin account created successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}