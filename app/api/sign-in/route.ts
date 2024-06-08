import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import { v4 as uuid } from "uuid";
import mongoose, { model } from "mongoose";
import { adminSchema } from "@/schema/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  await connect();
  
  const Admin = mongoose.models.admin || model("Admin", adminSchema);

  let admin = await Admin.findOne({ email: body.email });
  
  if (!admin) {
    return NextResponse.json({ message: "Admin not found" }, { status: 404 });
  }

  const match = bcrypt.compare(body.password, admin.password);

  if (!match) {
    return NextResponse.json(
      { message: "Password does not match" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Logged in", token: uuid(), id: admin.id },
    { status: 200 }
  );
}
