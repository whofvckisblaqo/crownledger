import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
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
        { receiverId: session.user.id },
        { senderId: session.user.id },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(); // ← returns plain JS objects with _id as string

    // Serialize _id to string
    const serialized = transactions.map((tx) => ({
      ...tx,
      _id: tx._id.toString(),
      senderId: tx.senderId?.toString() || null,
      receiverId: tx.receiverId?.toString() || null,
    }));

    return NextResponse.json({ transactions: serialized }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}