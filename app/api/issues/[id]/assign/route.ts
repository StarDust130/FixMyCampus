// app/api/issues/[id]/assign/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assignIssue } from "@/lib/store";

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean); // ["api","issues","1","assign"]
  const rawId = segments[segments.length - 2];

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

  const { assignedTo } = body as { assignedTo?: string };

  if (!assignedTo || typeof assignedTo !== "string") {
    return NextResponse.json(
      { error: "assignedTo (string) is required" },
      { status: 400 }
    );
  }

  const issue = await assignIssue(numericId, assignedTo);

  if (!issue) {
    return NextResponse.json(
      { error: "Issue not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(issue);
}
