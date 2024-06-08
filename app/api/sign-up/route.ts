import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/db";
import { adminSchema } from "@/schema/schema";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const updatedBody = { ...body, password: hashedPassword };
  await connect();

  const Admin = mongoose.models.admin || mongoose.model("Admin", adminSchema);
  
  const admin = new Admin(updatedBody);
  admin.save();

  console.log("Admin created");
  return NextResponse.json({ message: "Admin Created" }, { status: 200 });
}
