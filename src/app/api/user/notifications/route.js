import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();

    const notifications = await Notification.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    const unreadCount = await Notification.countDocuments({
      userId: session.user.id,
      read: false,
    });

    return NextResponse.json({ notifications, unreadCount }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const { notificationId, markAllRead } = await req.json();

    if (markAllRead) {
      await Notification.updateMany(
        { userId: session.user.id, read: false },
        { read: true }
      );
      return NextResponse.json({ message: "All marked as read." }, { status: 200 });
    }

    if (notificationId) {
      await Notification.findByIdAndUpdate(notificationId, { read: true });
      return NextResponse.json({ message: "Marked as read." }, { status: 200 });
    }

    return NextResponse.json({ message: "Nothing to update." }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const { notificationId, deleteAll } = await req.json();

    if (deleteAll) {
      await Notification.deleteMany({ userId: session.user.id });
      return NextResponse.json({ message: "All notifications deleted." }, { status: 200 });
    }

    if (notificationId) {
      await Notification.findByIdAndDelete(notificationId);
      return NextResponse.json({ message: "Notification deleted." }, { status: 200 });
    }

    return NextResponse.json({ message: "Nothing to delete." }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}