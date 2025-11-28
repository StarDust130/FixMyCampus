// app/api/issues/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateIssueStatus, IssueStatus } from "@/lib/store";

const ALLOWED_STATUSES: IssueStatus[] = [
  "open",
  "in_progress",
  "resolved",
  "closed",
];

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean); 
    // ["api","issues","4","status"]
    const rawId = segments[segments.length - 2]; // "4"

    const numericId = Number(rawId);

    if (!Number.isFinite(numericId)) {
      return NextResponse.json(
        { error: "Invalid issue id" },
        { status: 400 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { status } = body as { status?: IssueStatus };

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${ALLOWED_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const issue = await updateIssueStatus(numericId, status);

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(issue);
  } catch (err) {
    console.error("PATCH /api/issues/[id]/status error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
