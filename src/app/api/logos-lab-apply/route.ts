import { neon } from "@neondatabase/serverless";
import {
  logosLabActivityValues,
  logosLabAiToolValues,
  logosLabFirstSessionValues,
} from "@/lib/logos-lab";

export const runtime = "nodejs";

const activityValues = new Set<string>(logosLabActivityValues);
const aiToolValues = new Set<string>(logosLabAiToolValues);
const firstSessionValues = new Set<string>(logosLabFirstSessionValues);
const phonePattern = /^[0-9+\-\s()]{8,20}$/;

type ApplyPayload = {
  name?: unknown;
  phone?: unknown;
  oikos?: unknown;
  activities?: unknown;
  aiTool?: unknown;
  firstSession?: unknown;
  note?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    const requestHosts = [
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim(),
      request.headers.get("host"),
      process.env.VERCEL_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
    ].filter(Boolean);

    try {
      if (!requestHosts.includes(new URL(origin).host)) {
        return Response.json({ message: "잘못된 요청입니다." }, { status: 403 });
      }
    } catch {
      return Response.json({ message: "잘못된 요청입니다." }, { status: 403 });
    }
  }

  let payload: ApplyPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "입력 내용을 확인해 주세요." }, { status: 400 });
  }

  // Bots commonly fill visually hidden fields. Return success without storing it.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const oikos = typeof payload.oikos === "string" ? payload.oikos.trim() : "";
  const aiTool = typeof payload.aiTool === "string" ? payload.aiTool : "";
  const firstSession = typeof payload.firstSession === "string" ? payload.firstSession : "";
  const note = typeof payload.note === "string" ? payload.note.trim() : "";
  const activities = Array.isArray(payload.activities)
    ? [...new Set(payload.activities.filter((a): a is string => typeof a === "string"))]
    : [];

  const isValid =
    name.length > 0 &&
    name.length <= 50 &&
    phonePattern.test(phone) &&
    oikos.length <= 50 &&
    aiToolValues.has(aiTool) &&
    firstSessionValues.has(firstSession) &&
    note.length <= 200 &&
    activities.length > 0 &&
    activities.length <= logosLabActivityValues.length &&
    activities.every((a) => activityValues.has(a));

  if (!isValid) {
    return Response.json({ message: "입력 내용을 확인해 주세요." }, { status: 400 });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not configured");
    return Response.json({ message: "잠시 후 다시 시도해 주세요." }, { status: 500 });
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      insert into logos_lab_applications
        (name, phone, oikos, activities, ai_tool, first_session, note)
      values
        (${name}, ${phone}, ${oikos || null}, ${activities}, ${aiTool}, ${firstSession}, ${note || null})
    `;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to save logos lab application", error);
    return Response.json({ message: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
