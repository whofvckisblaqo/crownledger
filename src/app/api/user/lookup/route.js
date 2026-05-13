import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Account from "@/models/Account";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    // Search by email or account number
    let user = null;
    let account = null;

    // Try account number first
    account = await Account.findOne({
      accountNumber: query,
      type: "checking",
    }).populate("userId", "firstName lastName email");

    if (account) {
      user = account.userId;
    } else {
      // Try email
      user = await User.findOne({
        email: { $regex: query, $options: "i" },
        role: "user",
        status: "active",
        _id: { $ne: session.user.id },
      }).select("firstName lastName email _id");

      if (user) {
        account = await Account.findOne({
          userId: user._id,
          type: "checking",
        });
      }
    }

    if (!user || !account) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    // Don't return own account
    if (user._id.toString() === session.user.id) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    return NextResponse.json({
      users: [{
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountNumber: account.accountNumber,
        routingNumber: account.routingNumber,
      }],
    }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}