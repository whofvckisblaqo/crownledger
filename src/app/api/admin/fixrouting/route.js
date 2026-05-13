import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";

export async function POST(req) {
  try {
    const { secret } = await req.json();
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const result = await Account.updateMany(
      { routingNumber: { $exists: false } },
      { $set: { routingNumber: "031176110" } }
    );

    return NextResponse.json(
      { message: `Updated ${result.modifiedCount} accounts with routing number.` },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}