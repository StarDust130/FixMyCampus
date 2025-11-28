import { NextRequest, NextResponse } from "next/server";
import { getAllIssues, isAdmin } from "@/lib/store";

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const issues = await getAllIssues();
  return NextResponse.json({ issues });
}
