import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, accountType, amount, description } = await req.json();

    if (!userId || !accountType || !amount) {
      return NextResponse.json(
        { message: "userId, accountType and amount are required." },
        { status: 400 }
      );
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than zero." },
        { status: 400 }
      );
    }

    // Find the account
    const account = await Account.findOne({ userId, type: accountType });
    if (!account) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 }
      );
    }

    // Update balance
    const updatedAccount = await Account.findByIdAndUpdate(
      account._id,
      { $inc: { balance: Number(amount) } },
      { new: true }
    );

    // Create transaction record
    const reference = `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    await Transaction.create({
      receiverId: userId,
      receiverAccount: account.accountNumber,
      amount: Number(amount),
      type: "deposit",
      status: "completed",
      description: description || "Admin deposit",
      reference,
    });

    return NextResponse.json(
      {
        message: "Account credited successfully.",
        newBalance: updatedAccount.balance,
        reference,
      },
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