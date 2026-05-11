import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";

function generateAccountNumber() {
  const prefix = "4532";
  const random = Math.floor(Math.random() * 1000000000000).toString().padStart(12, "0");
  return prefix + random;
}

export async function POST(req) {
  try {
    const { secret } = await req.json();

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const accounts = await Account.find({});
    const updated = [];

    for (const acc of accounts) {
      if (acc.accountNumber.length < 16) {
        const newNumber = generateAccountNumber();
        await Account.findByIdAndUpdate(acc._id, { accountNumber: newNumber });
        updated.push({
          id: acc._id,
          old: acc.accountNumber,
          new: newNumber,
          type: acc.type,
        });
      }
    }

    return NextResponse.json(
      { message: `Updated ${updated.length} accounts.`, updated },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}