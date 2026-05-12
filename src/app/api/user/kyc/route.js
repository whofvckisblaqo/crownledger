import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import KYC from "@/models/KYC";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const kyc = await KYC.findOne({ userId: session.user.id });
    return NextResponse.json({ kyc }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();

    // Check if already submitted
    const existing = await KYC.findOne({ userId: session.user.id });
    if (existing) {
      return NextResponse.json(
        { message: "KYC already submitted." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      documentType,
      documentNumber,
      documentFront,
      documentBack,
      selfie,
      dateOfBirth,
      address,
      city,
      country,
    } = body;

    if (!documentType || !documentNumber || !documentFront || !dateOfBirth || !address || !city || !country) {
      return NextResponse.json(
        { message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const kyc = await KYC.create({
      userId: session.user.id,
      documentType,
      documentNumber,
      documentFront,
      documentBack: documentBack || "",
      selfie: selfie || "",
      dateOfBirth,
      address,
      city,
      country,
      status: "pending",
    });

    // Notify user
    await Notification.create({
      userId: session.user.id,
      title: "KYC Submitted",
      message: "Your identity verification documents have been submitted and are under review.",
      type: "info",
      link: "/dashboard/kyc",
    });

    return NextResponse.json(
      { message: "KYC submitted successfully.", kyc },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}