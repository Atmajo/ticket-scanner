import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/db";
import { ticketSchema } from "@/schema/schema";
import mongoose from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  await connect();
  
  const Ticket =
    mongoose.models.ticket || mongoose.model("ticket", ticketSchema);
  
  const ticket = new Ticket(body);
  ticket.save();
  
  console.log("Ticket Generated");
  return NextResponse.json({ message: "Ticket Generated" }, { status: 200 });
}
