// lib/store.ts
import clientPromise from "./db";

// ---------- TYPES ----------

export type IssueStatus = "open" | "in_progress" | "resolved" | "closed";

export interface Department {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Issue {
  id: number; // numeric id so we can use /api/issues/1
  title: string;
  description: string;
  location?: string;
  departmentId?: number;
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

// ---------- ADMIN TOKEN ----------

export const ADMIN_TOKEN = "fixmycampus-admin-token";
export const ADMIN_HEADER_KEY = "x-admin-token";

export function isAdmin(request: Request): boolean {
  const token = request.headers.get(ADMIN_HEADER_KEY);
  return token === ADMIN_TOKEN;
}

// ---------- DB HELPERS ----------

async function getDb() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB || "fixmycampus";
  return client.db(dbName);
}

async function getIssuesCollection() {
  const db = await getDb();
  return db.collection<Issue>("issues");
}

async function getDepartmentsCollection() {
  const db = await getDb();
  return db.collection<Department>("departments");
}

// Generate incremental numeric IDs (simple and OK for demo)
async function getNextIssueId(): Promise<number> {
  const col = await getIssuesCollection();
  const last = await col.find().sort({ id: -1 }).limit(1).toArray();
  if (last.length === 0) return 1;
  return last[0].id + 1;
}

async function getNextDepartmentId(): Promise<number> {
  const col = await getDepartmentsCollection();
  const last = await col.find().sort({ id: -1 }).limit(1).toArray();
  if (last.length === 0) return 1;
  return last[0].id + 1;
}

// ---------- ISSUE FUNCTIONS ----------

export async function createIssue(data: {
  title: string;
  description: string;
  location?: string;
  departmentId?: number;
}): Promise<Issue> {
  const col = await getIssuesCollection();
  const now = new Date().toISOString();
  const nextId = await getNextIssueId();

  const issue: Issue = {
    id: nextId,
    title: data.title,
    description: data.description,
    location: data.location,
    departmentId: data.departmentId,
    status: "open",
    createdAt: now,
    updatedAt: now,
    assignedTo: undefined,
  };

  await col.insertOne(issue);
  return issue;
}

export async function getAllIssues(): Promise<Issue[]> {
  const col = await getIssuesCollection();
  return col.find().sort({ createdAt: -1 }).toArray();
}

export async function getIssueById(id: number): Promise<Issue | null> {
  const col = await getIssuesCollection();
  return col.findOne({ id });
}

// ✅ FIXED VERSION: use updateOne + findOne
export async function updateIssueStatus(
  id: number,
  status: IssueStatus
): Promise<Issue | null> {
  const col = await getIssuesCollection();
  const now = new Date().toISOString();

  const result = await col.updateOne(
    { id }, // filter by numeric id
    { $set: { status, updatedAt: now } }
  );

  if (result.matchedCount === 0) {
    // no such issue
    return null;
  }

  const updated = await col.findOne({ id });
  return updated;
}

// ✅ FIXED VERSION: use updateOne + findOne
export async function assignIssue(
  id: number,
  assignedTo: string
): Promise<Issue | null> {
  const col = await getIssuesCollection();
  const now = new Date().toISOString();

  const result = await col.updateOne(
    { id },
    { $set: { assignedTo, updatedAt: now } }
  );

  if (result.matchedCount === 0) {
    return null;
  }

  const updated = await col.findOne({ id });
  return updated;
}

// ---------- DEPARTMENT FUNCTIONS ----------

export async function createDepartment(data: {
  name: string;
  description?: string;
}): Promise<Department> {
  const col = await getDepartmentsCollection();
  const now = new Date().toISOString();
  const nextId = await getNextDepartmentId();

  const department: Department = {
    id: nextId,
    name: data.name,
    description: data.description,
    createdAt: now,
  };

  await col.insertOne(department);
  return department;
}

export async function getAllDepartments(): Promise<Department[]> {
  const col = await getDepartmentsCollection();
  return col.find().sort({ name: 1 }).toArray();
}

// ---------- ANALYTICS ----------

export async function getAnalytics() {
  const col = await getIssuesCollection();
  const depCol = await getDepartmentsCollection();

  const [
    totalIssues,
    openIssues,
    inProgressIssues,
    resolvedIssues,
    closedIssues,
    totalDepartments,
  ] = await Promise.all([
    col.countDocuments({}),
    col.countDocuments({ status: "open" }),
    col.countDocuments({ status: "in_progress" }),
    col.countDocuments({ status: "resolved" }),
    col.countDocuments({ status: "closed" }),
    depCol.countDocuments({}),
  ]);

  return {
    totalIssues,
    openIssues,
    inProgressIssues,
    resolvedIssues,
    closedIssues,
    totalDepartments,
  };
}
