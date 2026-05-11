import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find({})
      .populate("senderId", "firstName lastName email")
      .populate("receiverId", "firstName lastName email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ transactions }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { transactionId, status } = await req.json();

    if (!transactionId || !status) {
      return NextResponse.json({ message: "transactionId and status are required." }, { status: 400 });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status },
      { new: true }
    );

    return NextResponse.json({ message: "Transaction updated.", transaction }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}