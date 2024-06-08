import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/db";
import { userSchema } from "@/schema/schema";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const updatedBody = { ...body, password: hashedPassword };
  await connect();

  const User = mongoose.models.user || mongoose.model("user", userSchema);

  const user = new User(updatedBody);
  user.save();

  console.log("User created");
  return NextResponse.json({ message: "User Created" }, { status: 200 });
}
