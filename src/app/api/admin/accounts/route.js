import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};

    const accounts = await Account.find(query)
      .populate("userId", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({ accounts }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { accountId, status } = await req.json();

    if (!accountId || !status) {
      return NextResponse.json(
        { message: "accountId and status are required." },
        { status: 400 }
      );
    }

    const account = await Account.findByIdAndUpdate(
      accountId,
      { status },
      { new: true }
    );

    return NextResponse.json({ message: "Account updated.", account }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}