// app/api/issues/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIssueById } from "@/lib/store";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean); // ["api","issues","1"]
  const rawId = segments[segments.length - 1];

  const numericId = Number(rawId);

  if (!Number.isFinite(numericId)) {
    return NextResponse.json(
      { error: "Invalid issue id" },
      { status: 400 }
    );
  }

  const issue = await getIssueById(numericId);

  if (!issue) {
    return NextResponse.json(
      { error: "Issue not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(issue);
}
