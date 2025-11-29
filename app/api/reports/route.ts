import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// UPDATED SCHEMA: Added 'userId'
const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "Other" },
  location: { type: String, default: "Unknown" },
  status: { type: String, default: "Open" },
  imageUrl: String,
  userId: { type: String, required: true, index: true }, // Linked to LocalStorage ID
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

// GET: Fetch reports (Optional: filter by userId)
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // If userId is provided, return ONLY their reports.
    // If not, return ALL (Public Feed).
    const filter = userId ? { userId } : {};

    const reports = await Report.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

// POST: Create report with userId
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const newReport = await Report.create(body);
    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
