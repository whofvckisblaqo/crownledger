import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const accounts = await Account.find({ userId: session.user.id });
    const accountNumbers = accounts.map((a) => a.accountNumber);

    const transactions = await Transaction.find({
      $or: [
        { senderAccount: { $in: accountNumbers } },
        { receiverAccount: { $in: accountNumbers } },
      ],
    }).sort({ createdAt: -1 }).limit(20);

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}