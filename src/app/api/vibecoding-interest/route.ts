import { neon } from "@neondatabase/serverless";
import {
  vibecodingAiUsageValues,
  vibecodingInterestValues,
  vibecodingTopicValues,
} from "@/lib/vibecoding-survey";

export const runtime = "nodejs";

const interestValues = new Set<string>(vibecodingInterestValues);
const topicValues = new Set<string>(vibecodingTopicValues);
const aiUsageValues = new Set<string>(vibecodingAiUsageValues);

type SurveyPayload = {
  name?: unknown;
  oikos?: unknown;
  interest?: unknown;
  topics?: unknown;
  aiUsage?: unknown;
  additionalTopic?: unknown;
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

  let payload: SurveyPayload;
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
  const oikos = typeof payload.oikos === "string" ? payload.oikos.trim() : "";
  const interest = typeof payload.interest === "string" ? payload.interest : "";
  const aiUsage = typeof payload.aiUsage === "string" ? payload.aiUsage : "";
  const additionalTopic =
    typeof payload.additionalTopic === "string" ? payload.additionalTopic.trim() : "";
  const topics = Array.isArray(payload.topics)
    ? [...new Set(payload.topics.filter((topic): topic is string => typeof topic === "string"))]
    : [];

  const isValid =
    name.length > 0 &&
    name.length <= 50 &&
    oikos.length <= 50 &&
    interestValues.has(interest) &&
    aiUsageValues.has(aiUsage) &&
    additionalTopic.length <= 200 &&
    topics.length > 0 &&
    topics.length <= vibecodingTopicValues.length &&
    topics.every((topic) => topicValues.has(topic));

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
      insert into vibecoding_interest_responses
        (name, oikos, interest, topics, ai_usage, additional_topic)
      values
        (${name}, ${oikos || null}, ${interest}, ${topics}, ${aiUsage}, ${additionalTopic || null})
    `;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to save vibecoding survey response", error);
    return Response.json({ message: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
