import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// Define/Get Schema
const ReportSchema = new mongoose.Schema(
  {
    votes: { type: Number, default: 0 },
  },
  { strict: false }
); // strict: false allows us to update just 'votes' without defining the whole schema again

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    // Increment votes by 1
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    );

    if (!updatedReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ votes: updatedReport.votes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upvote" }, { status: 500 });
  }
}
