import { NextResponse } from "next/server";
import { buildMockStory } from "@/lib/generate";
import { GeneratedStory, StudentInput } from "@/lib/types";

// Backend generation route.
//
// The Gemini API key lives ONLY here, read from process.env — it is never sent
// to the browser. If no key is configured, or the model call fails, we fall back
// to the deterministic mock so the app always returns a usable result.
//
// Set GEMINI_API_KEY in .env.local (local dev) and in Vercel's Environment
// Variables (production). Get a free key at https://aistudio.google.com/apikey

export const runtime = "nodejs";

const MODEL = "gemini-2.5-flash";

function buildPrompt(input: StudentInput): string {
  return `You are an expert university career coach helping a student turn ONE real experience into polished, professional career materials. Write in the student's own authentic voice — specific, grounded, and never generic or salesy. Build ONLY from the details the student provides; do not invent metrics, employers, or facts they did not give.

STUDENT INPUT (JSON):
${JSON.stringify(input, null, 2)}

Return ONLY a JSON object (no markdown, no commentary) matching EXACTLY this shape:
{
  "summary": string,                       // 2-3 sentence experience summary in first person
  "resumeBullets": string[],               // 3 strong, action-verb resume bullets
  "star": { "situation": string, "task": string, "action": string, "result": string },
  "pitch": {
    "thirtySecond": string,                // ~30s elevator pitch, first person, natural
    "careerFair": string,                  // short career-fair version
    "conversational": string,              // relaxed conversational version
    "recruiterFollowUp": string,           // post-event follow-up message
    "confidenceTips": string[]             // 3 practical delivery tips
  },
  "linkedin": string,                      // LinkedIn 'About' paragraph, first person
  "careerFairPoints": string[],            // 3 quoted talking points
  "skills": string[],                      // 6-10 concrete skills demonstrated
  "competencies": [ { "name": string, "explanation": string } ], // 7 NACE Career Readiness competencies (Communication, Critical Thinking, Professionalism, Technology, Leadership, Teamwork, Career & Self-Development), each tied to THIS experience
  "reflectionQuestions": string[],         // 5 reflective questions for the student
  "presentation": [ { "title": string, "points": string[] } ], // exactly 5 slides
  "improvements": string[]                 // up to 5 concrete ways to strengthen the story
}

Requirements:
- Use the student's real words; keep it credible for a university career center.
- ${input.tone ? `Tone: ${input.tone}.` : "Tone: professional but warm."}
- Career competencies must be the 7 NACE competencies listed above, in that order.
- Output valid JSON only.`;
}

function isValidStory(obj: unknown): obj is GeneratedStory {
  if (!obj || typeof obj !== "object") return false;
  const s = obj as Record<string, unknown>;
  return (
    typeof s.summary === "string" &&
    Array.isArray(s.resumeBullets) &&
    typeof s.star === "object" &&
    typeof s.pitch === "object" &&
    typeof s.linkedin === "string" &&
    Array.isArray(s.careerFairPoints) &&
    Array.isArray(s.skills) &&
    Array.isArray(s.competencies) &&
    Array.isArray(s.reflectionQuestions) &&
    Array.isArray(s.presentation) &&
    Array.isArray(s.improvements)
  );
}

export async function POST(req: Request) {
  let input: StudentInput;
  try {
    input = (await req.json()) as StudentInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // No key configured (e.g. before the user sets it) — use the mock so the
  // experience still works end to end.
  if (!apiKey) {
    return NextResponse.json(buildMockStory(input));
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(input) }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty model response");

    // responseMimeType=application/json should give clean JSON, but strip any
    // stray code fences just in case.
    const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    if (!isValidStory(parsed)) throw new Error("Model returned unexpected shape");

    return NextResponse.json(parsed);
  } catch (err) {
    // Any failure (rate limit, bad JSON, network) — fall back to the mock.
    console.error("Generation fell back to mock:", err);
    return NextResponse.json(buildMockStory(input));
  }
}
