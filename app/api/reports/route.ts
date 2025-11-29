import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// Simple Mongoose Schema (Define inside file for portability)
const ReportSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  imageUrl: String, // Storing Base64 for simplicity (Use S3/UploadThing for production)
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const report = await Report.create(body);
    return NextResponse.json({ success: true, id: report._id });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
