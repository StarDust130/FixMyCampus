// app/api/issues/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createIssue, getAllIssues } from "@/lib/store";

export async function POST(request: NextRequest) {
  // 1) Only handle JSON parsing here
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { title, description, location, departmentId } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "title and description are required" },
      { status: 400 }
    );
  }

  // 2) DB errors handled separately
  try {
    const issue = await createIssue({
      title,
      description,
      location,
      departmentId:
        typeof departmentId === "number" ? departmentId : undefined,
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (err) {
    console.error("POST /api/issues DB error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const issues = await getAllIssues();
    return NextResponse.json({ issues });
  } catch (err) {
    console.error("GET /api/issues DB error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
