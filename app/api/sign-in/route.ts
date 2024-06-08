import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import { v4 as uuid } from "uuid";
import mongoose, { model } from "mongoose";
import { userSchema } from "@/schema/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  await connect();

  const User = mongoose.models.User || model("User", userSchema);

  let user = await User.findOne({ email: body.email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const match = bcrypt.compare(body.password, user.password);

  if (!match) {
    return NextResponse.json(
      { message: "Password does not match" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Logged in", token: uuid(), id: user.id },
    { status: 200 }
  );
}
