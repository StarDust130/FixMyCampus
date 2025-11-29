import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

// Reuse the schema (ensure strict is false so we can update fields freely)
const ReportSchema = new mongoose.Schema({}, { strict: false });
const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

// --- 1. GET Single Report (Optional but good practice) ---
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const report = await Report.findById(params.id);
    if (!report)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

// --- 2. UPDATE Report (Edit) ---
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();

    // Update the report
    const updatedReport = await Report.findByIdAndUpdate(
      params.id,
      body,
      { new: true } // Return the updated document
    );

    if (!updatedReport)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updatedReport);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// --- 3. DELETE Report ---
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedReport = await Report.findByIdAndDelete(params.id);

    if (!deletedReport)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
