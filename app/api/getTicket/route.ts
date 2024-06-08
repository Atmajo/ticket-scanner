import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/db";
import { ticketSchema } from "@/schema/schema";
import mongoose from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  await connect();
  const body = await req.json();

  const Ticket =
    mongoose.models.ticket || mongoose.model("ticket", ticketSchema);

  const ticketData = await Ticket.find({
    id: body.id,
  });

  return NextResponse.json({ ticketData }, { status: 200 });
}
