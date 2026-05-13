import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import CryptoWallet from "@/models/CryptoWallet";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();

    let wallet = await CryptoWallet.findOne({ userId: session.user.id });

    if (!wallet) {
      wallet = await CryptoWallet.create({ userId: session.user.id });
    }

    return NextResponse.json({ wallet }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}