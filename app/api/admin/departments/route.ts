import { NextRequest, NextResponse } from "next/server";
import {
  createDepartment,
  getAllDepartments,
  isAdmin,
} from "@/lib/store";

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const { name, description } = body as { name?: string; description?: string };

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const department = await createDepartment({ name, description });
  return NextResponse.json(department, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const departments = await getAllDepartments();
  return NextResponse.json({ departments });
}
