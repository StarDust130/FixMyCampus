import { NextRequest, NextResponse } from "next/server";
import { getAnalytics, isAdmin } from "@/lib/store";

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const analytics = await getAnalytics();
  return NextResponse.json(analytics);
}
