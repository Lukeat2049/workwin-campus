import {
  Competency,
  ElevatorPitch,
  GeneratedStory,
  PresentationSlide,
  StarStory,
  StudentInput,
} from "./types";

/**
 * Career-story generator.
 *
 * `generateStory` (the public API the UI awaits) POSTs to the backend route
 * `/api/generate`, which calls Google Gemini when a key is configured. If the
 * route is unavailable or errors, it falls back to `buildMockStory` below so the
 * demo always works.
 *
 * `buildMockStory` is deterministic string assembly that weaves the student's
 * actual inputs into specific, grammatical output (no model involved). The
 * guiding rule: build from the student's OWN words, never invent details. The
 * backend route imports it as its own fallback when no API key is set.
 */

// ---------- small text helpers ----------

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const lowerFirst = (s: string) =>
  s ? s.charAt(0).toLowerCase() + s.slice(1) : s;

// Choose the correct indefinite article for a phrase.
const aOrAn = (word: string) =>
  /^[aeiou]/i.test((word || "").trim()) ? "an" : "a";

// Trim and drop a single trailing period so fields can be recomposed.
const clean = (s: string) => (s || "").trim().replace(/\.$/, "");

// Split a comma / "and" separated list field into clean items.
const splitList = (s: string): string[] =>
  (s || "")
    .split(/[,;]|\band\b/gi)
    .map((x) => x.trim())
    .filter(Boolean);

// Split free text into clause-sized chunks (keeps verbs intact, unlike splitList).
const splitClauses = (s: string): string[] =>
  (s || "")
    .split(/,|\band\b/gi)
    .map((x) => x.trim().replace(/^,/, "").trim())
    .filter((x) => x.length > 1);

const firstItem = (s: string, fallback: string) => splitList(s)[0] || fallback;

// Remove a leading first-person subject so a clause can follow a verb or "I".
// "I compared prices" -> "compared prices"; "My team analyzed data" -> "analyzed data".
const stripSubject = (s: string) =>
  clean(s)
    .replace(/^(and|then)\s+/i, "")
    .replace(/^my team\s+/i, "")
    .replace(/^(i|we)\s+/i, "");

// Pull the skill phrase out of a "strength" sentence.
// "I'm good at organizing information" -> "organizing information".
const stripStrengthLead = (s: string) =>
  clean(s)
    .replace(/^i('m| am)\s+(really\s+|very\s+)?(good|skilled|strong|great)\s+at\s+/i, "")
    .replace(/^i('m| am)\s+/i, "")
    .replace(/^i\s+/i, "");

const hasGoodAt = (s: string) => /good at|skilled at|strong at|great at/i.test(s || "");

// Replace a leading "We" with "the team" so result sentences read in third person.
const deWe = (s: string) => clean(s).replace(/^we\s+/i, "the team ");

const join = (items: string[]): string => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

// Common spreadsheet/BI tools we treat as "tools" rather than transferable
// skills when describing strengths in a pitch.
const HARD_TOOLS = new Set([
  "excel",
  "tableau",
  "sql",
  "power bi",
  "powerpoint",
  "word",
  "python",
  "spss",
  "r",
  "sheets",
  "google sheets",
  "canva",
  "figma",
]);

// Build a short, noun-like list of transferable strengths for pitches/LinkedIn,
// preferring skill words from "tools" then the "strength" sentence.
function transferableStrengths(input: StudentInput): string {
  const fromTools = splitList(input.tools).filter(
    (t) => !HARD_TOOLS.has(t.toLowerCase())
  );
  const fromStrength = hasGoodAt(input.strength)
    ? splitList(stripStrengthLead(input.strength))
    : [];
  const pool = [...fromTools, ...fromStrength].map((s) => s.toLowerCase());
  const uniq = Array.from(new Set(pool)).slice(0, 3);
  if (uniq.length < 2) return "communication, problem-solving, and teamwork";
  return join(uniq);
}

// Career interests are stored as the student typed them (often sentence-case
// like "Data analytics"). These render them naturally mid-sentence.
const inlineInterest = (s: string, fallback: string) =>
  lowerFirst(firstItem(s, fallback));
const inlineInterests = (s: string, fallback: string) =>
  s
    ? join(splitList(s).slice(0, 2).map(lowerFirst))
    : fallback;

// Natural phrasing for an experience type used as a noun ("an internship",
// "volunteer work") vs. as a verb phrase ("completed an internship").
function experienceNoun(type: string): string {
  switch (type) {
    case "Internship":
      return "an internship";
    case "Class project":
      return "a class project";
    case "Campus job":
      return "a campus job";
    case "Part-time job":
      return "a part-time job";
    case "Volunteer work":
      return "volunteer work";
    case "Student organization":
      return "a student organization";
    case "Leadership role":
      return "a leadership role";
    case "Capstone project":
      return "a capstone project";
    case "Research project":
      return "a research project";
    default:
      return "a project";
  }
}

function recentExperience(type: string): string {
  const n = experienceNoun(type);
  return /^an? /i.test(n) ? `a recent ${n.replace(/^an? /i, "")}` : `recent ${n}`;
}

function experienceVerbPhrase(type: string): string {
  switch (type) {
    case "Internship":
      return "completed an internship";
    case "Class project":
      return "worked on a class project";
    case "Campus job":
      return "worked a campus job";
    case "Part-time job":
      return "worked a part-time job";
    case "Volunteer work":
      return "did volunteer work";
    case "Student organization":
      return "got involved in a student organization";
    case "Leadership role":
      return "took on a leadership role";
    case "Capstone project":
      return "worked on a capstone project";
    case "Research project":
      return "worked on a research project";
    default:
      return "took on a project";
  }
}

// Translate the target-opportunity dropdown into a natural phrase.
function opportunityPhrase(target: string): string {
  switch (target) {
    case "Internship":
      return "an internship";
    case "Full-time job":
      return "a full-time role";
    case "Graduate school":
      return "the right graduate program";
    case "Networking conversation":
      return "people I can learn from in this field";
    case "Career fair":
      return "opportunities to connect with employers";
    case "Informational interview":
      return "people open to a short conversation about their work";
    case "Speaking with a recruiter":
      return "teams that are hiring";
    default:
      return "an opportunity";
  }
}

// ---------- section builders ----------

function buildSummary(input: StudentInput): string {
  const role = input.role || "student";
  const roleIsStudent = /student$/i.test(role);
  const notes = stripSubject(input.notes);
  const impact = clean(input.impact);
  const interest = inlineInterest(input.careerInterests, "my field");

  let s = `As ${aOrAn(role)} ${role}${
    input.major && !roleIsStudent ? ` and ${input.major} student` : ""
  }, I ${notes || "took on meaningful, hands-on work"}.`;

  if (impact) {
    s += ` ${cap(deWe(impact))}.`;
  }

  s += ` The experience connects directly to my interest in ${interest} and the kind of work I want to do next.`;
  return s;
}

function buildResumeBullets(input: StudentInput): string[] {
  const clauses = splitClauses(input.notes).map(stripSubject).filter(Boolean);
  const tools = splitList(input.tools);
  const impact = clean(input.impact);
  const goal = clean(input.goal);
  const bullets: string[] = [];

  if (clauses.length > 0) {
    // Lead bullet: the student's primary action + the tools they used.
    bullets.push(
      `${cap(clauses[0])}${
        tools.length ? ` using ${join(tools.slice(0, 3))}` : ""
      }.`
    );
  }

  if (clauses.length > 1) {
    // Second bullet: the remaining concrete actions, in their own words.
    bullets.push(`${cap(join(clauses.slice(1)))}.`);
  }

  // Closing bullet: an outcome-focused (accomplishment) statement.
  if (impact) {
    bullets.push(`Helped ensure ${lowerFirst(deWe(impact))}.`);
  } else if (goal) {
    bullets.push(`Contributed to the team's goal: ${cap(goal)}.`);
  }

  // Fallbacks so we always return three useful bullets.
  while (bullets.length < 3) {
    if (goal && !bullets.some((b) => b.includes(goal))) {
      bullets.push(`Worked toward the goal of ${lowerFirst(goal)}.`);
    } else {
      bullets.push(
        "Took initiative on hands-on work and followed through on the details."
      );
    }
  }

  return bullets.slice(0, 3);
}

function buildStar(input: StudentInput): StarStory {
  const type = (input.experienceType || "experience").toLowerCase();
  const role = input.role || "team member";
  const roleIsStudent = /student$/i.test(role);
  const goal = clean(input.goal);
  const action = stripSubject(input.notes);
  const tools = splitList(input.tools);
  const impact = clean(input.impact);
  const interest = inlineInterest(input.careerInterests, "my career");
  const strengthVerb = hasGoodAt(input.strength)
    ? stripStrengthLead(input.strength)
    : null;

  return {
    situation: `During my ${type} as ${aOrAn(role)} ${role}${
      input.major && !roleIsStudent ? ` (${input.major})` : ""
    }, ${
      goal
        ? `the goal was to ${lowerFirst(goal)}`
        : "our team had an important objective to reach"
    }.`,
    task: strengthVerb
      ? `I took ownership of my part of the work, drawing on my strength in ${strengthVerb}.`
      : `As ${aOrAn(
          role
        )} ${role}, I took ownership of my part of the work and followed it through.`,
    action: `I ${
      action || "broke the work into clear steps and followed through carefully"
    }${tools.length ? `, drawing on ${join(tools.slice(0, 4))}` : ""}.`,
    result: `As a result, ${lowerFirst(deWe(impact)) ||
      "the team reached a clearer outcome"}. Along the way, I strengthened skills I can bring to ${interest}.`,
  };
}

function buildPitch(input: StudentInput): ElevatorPitch {
  const study = input.major ? `studying ${input.major}` : "a motivated student";
  const interest = inlineInterest(input.careerInterests, "my field");
  const interestsAll = inlineInterests(input.careerInterests, "my field");
  const verbPhrase = experienceVerbPhrase(input.experienceType);
  const noun = experienceNoun(input.experienceType);
  const notesNoSubj = stripSubject(input.notes);
  const firstClause = stripSubject(splitClauses(input.notes)[0] || "");
  const strengths = transferableStrengths(input);
  const opp = opportunityPhrase(input.targetOpportunity);

  const thirtySecond = `Hi, my name is [Your name], and I'm ${study} with an interest in ${interestsAll}. Recently, I ${verbPhrase} where I ${
    notesNoSubj || "took on hands-on, real-world work"
  }. That experience helped me strengthen my ${strengths}. Right now I'm looking for ${opp} where I can keep building on this and contribute to work I care about.`;

  const careerFair = `Hi, I'm ${study} interested in ${interest}. I recently ${
    firstClause || "completed a hands-on project in this area"
  }, and I'd love to hear more about opportunities on your team.`;

  const conversational = `So I'm ${study}, and I'm really interested in ${interest}. The thing I'm probably most proud of lately is ${noun} where I ${
    firstClause || "got to do real, hands-on work"
  } — it taught me a lot about ${strengths}. Right now I'm trying to find ${opp} where I can keep growing.`;

  const recruiterFollowUp = `Hi [Recruiter's name], it was great speaking with you at [event] about [team or role]. I really enjoyed learning about [something specific they mentioned]. As ${
    input.major ? `${aOrAn(input.major)} ${input.major} student` : "a student"
  } interested in ${interest}, I'd love to stay in touch about ${
    opp === "an opportunity" ? "future opportunities" : opp
  }. I've attached my resume — thank you again for your time.`;

  const confidenceTips = [
    "Practice out loud 3–5 times until it sounds like you talking, not like a script you're reciting.",
    "Lead with one specific experience instead of listing everything — a single clear story is what people remember.",
    "End with what you're looking for, then pause. Let it turn into a conversation rather than a monologue.",
  ];

  return {
    thirtySecond,
    careerFair,
    conversational,
    recruiterFollowUp,
    confidenceTips,
  };
}

function buildLinkedin(input: StudentInput): string {
  const lead = input.major ? `${input.major} student` : "Student";
  const interests = inlineInterests(input.careerInterests, "building real-world skills");
  const exp = stripSubject(input.notes);
  const impact = clean(input.impact);
  const strengths = transferableStrengths(input);
  const opp = opportunityPhrase(input.targetOpportunity);

  let s = `${lead} focused on ${interests}.`;
  if (exp) s += ` During ${recentExperience(input.experienceType)}, I ${exp}.`;
  if (impact) s += ` ${cap(deWe(impact))}.`;
  s += ` I enjoy work that draws on ${strengths}, and I'm always glad to connect with people doing meaningful work in this space.`;
  if (opp !== "an opportunity") s += ` Open to ${opp}.`;
  return s;
}

function buildCareerFairPoints(input: StudentInput): string[] {
  const interest = inlineInterest(input.careerInterests, "this field");
  const study = input.major ? `${input.major} student` : "student";
  const firstClause = stripSubject(splitClauses(input.notes)[0] || "");
  const impact = clean(input.impact);

  return [
    `"I'm ${aOrAn(study)} ${study} focused on ${interest} — I recently ${
      firstClause || "worked on a hands-on project in this area"
    }."`,
    impact
      ? `"Something I'm proud of is that ${lowerFirst(deWe(impact))}."`
      : `"I'm proud of the progress my team made and what I learned in the process."`,
    `"I'd love to learn how your team approaches ${interest} — what kinds of projects might someone in my position get to work on?"`,
  ];
}

function buildSkills(input: StudentInput): string[] {
  const set = new Set<string>();
  splitList(input.tools).forEach((t) => set.add(cap(t)));
  if (hasGoodAt(input.strength)) {
    splitList(stripStrengthLead(input.strength)).forEach((t) => set.add(cap(t)));
  }

  // Inferred skills by experience type so the list reaches 6–10.
  const inferred: Record<string, string[]> = {
    Internship: ["Professionalism", "Workplace communication", "Time management"],
    "Class project": [
      "Collaboration",
      "Presentation skills",
      "Analytical thinking",
    ],
    "Campus job": ["Customer service", "Reliability", "Organization"],
    "Part-time job": ["Reliability", "Customer service", "Adaptability"],
    "Volunteer work": ["Empathy", "Community engagement", "Initiative"],
    "Student organization": ["Leadership", "Event planning", "Teamwork"],
    "Leadership role": ["Leadership", "Decision-making", "Conflict resolution"],
    "Capstone project": ["Project management", "Research", "Critical thinking"],
    "Research project": ["Research", "Attention to detail", "Data analysis"],
    Other: ["Adaptability", "Communication", "Problem-solving"],
  };
  (inferred[input.experienceType] || inferred.Other).forEach((s) => set.add(s));

  ["Communication", "Problem-solving", "Teamwork"].forEach((s) => set.add(s));

  return Array.from(set).slice(0, 10);
}

function buildCompetencies(input: StudentInput): Competency[] {
  const work = stripSubject(input.notes) || "your work in this experience";
  const impact = clean(input.impact) || "a clearer outcome for the team";
  const tools = splitList(input.tools);
  const goal = clean(input.goal);

  return [
    {
      name: "Communication",
      explanation: `You translated your work — ${lowerFirst(
        work
      )} — into updates others could understand and act on.`,
    },
    {
      name: "Critical Thinking",
      explanation: goal
        ? `You worked toward ${lowerFirst(
            goal
          )}, weighing information to reach ${lowerFirst(deWe(impact))}.`
        : `You made judgment calls under real constraints to reach ${lowerFirst(
            deWe(impact)
          )}.`,
    },
    {
      name: "Professionalism",
      explanation: `You followed through on real responsibilities in a ${(
        input.experienceType || "real"
      ).toLowerCase()} setting, showing reliability and ownership.`,
    },
    {
      name: "Technology",
      explanation: tools.length
        ? `You applied tools like ${join(
            tools.slice(0, 3)
          )} to do the work effectively.`
        : `Naming the specific tools or systems you used would strengthen this competency — it signals hands-on capability.`,
    },
    {
      name: "Leadership",
      explanation: `By driving your part of the work forward, you showed initiative and helped move things toward ${lowerFirst(
        deWe(impact)
      )}.`,
    },
    {
      name: "Teamwork",
      explanation: `You contributed within a team context, supporting shared goals and the people working alongside you.`,
    },
    {
      name: "Career & Self-Development",
      explanation: `You're reflecting on this experience to grow — connecting it to ${inlineInterest(
        input.careerInterests,
        "your career goals"
      )} and your next step.`,
    },
  ];
}

function buildReflectionQuestions(input: StudentInput): string[] {
  const interest = inlineInterest(input.careerInterests, "your career interests");
  const type = (input.experienceType || "experience").toLowerCase();
  return [
    `What part of this ${type} are you most proud of, and why does it matter to you?`,
    `Who benefited from your work, and how would they describe the difference you made?`,
    `Which skills did you rely on most, and which one do you most want to strengthen next?`,
    `How does this experience connect to your interest in ${interest}?`,
    `If you did this again, what would you measure or document so the impact is even clearer?`,
  ];
}

function buildPresentation(input: StudentInput): PresentationSlide[] {
  return [
    {
      title: "Background",
      points: [
        `My role: ${input.role || "—"}${input.major ? ` (${input.major})` : ""}`,
        `Context: ${input.experienceType || "Experience"}`,
      ],
    },
    {
      title: "Problem or Goal",
      points: [clean(input.goal) || "The challenge or objective we set out to address"],
    },
    {
      title: "What I Did",
      points: [
        clean(input.notes) || "The specific actions I took",
        splitList(input.tools).length
          ? `Tools / skills: ${join(splitList(input.tools))}`
          : "Tools and skills I applied",
      ],
    },
    {
      title: "What I Learned",
      points: [
        hasGoodAt(input.strength)
          ? `Strengthened: ${stripStrengthLead(input.strength)}`
          : "Key skills and lessons from the experience",
        "How this shaped the way I work",
      ],
    },
    {
      title: "Impact & Next Steps",
      points: [
        clean(input.impact) || "The difference the work made",
        `How this connects to ${inlineInterest(
          input.careerInterests,
          "my career goals"
        )}`,
      ],
    },
  ];
}

function buildImprovements(input: StudentInput): string[] {
  const tips: string[] = [];

  if (!/\d/.test(input.impact + input.notes)) {
    tips.push(
      "Add a number or rough metric where you can — hours saved, people helped, items reviewed. Even an estimate makes impact concrete."
    );
  }
  if (!clean(input.impact)) {
    tips.push(
      "Spell out what changed because of your work. Recruiters remember outcomes, not just tasks."
    );
  }
  if (splitList(input.tools).length < 2) {
    tips.push(
      "Name the specific tools or methods you used; specifics signal real, hands-on experience."
    );
  }
  tips.push(
    "Say who benefited — a manager, a team, students, a community — so the value is clear to a reader."
  );
  tips.push(
    `Connect this experience to a larger goal by tying it back to ${inlineInterest(
      input.careerInterests,
      "your career direction"
    )}.`
  );

  return tips.slice(0, 5);
}

// ---------- mock fallback ----------

/**
 * Deterministic, no-AI story built entirely from the student's own words.
 * Used as the fallback when the backend route or model is unavailable.
 */
export function buildMockStory(input: StudentInput): GeneratedStory {
  return {
    summary: buildSummary(input),
    resumeBullets: buildResumeBullets(input),
    star: buildStar(input),
    pitch: buildPitch(input),
    linkedin: buildLinkedin(input),
    careerFairPoints: buildCareerFairPoints(input),
    skills: buildSkills(input),
    competencies: buildCompetencies(input),
    reflectionQuestions: buildReflectionQuestions(input),
    presentation: buildPresentation(input),
    improvements: buildImprovements(input),
  };
}

// ---------- public API ----------

/**
 * Generate a full career story from the student's input.
 * Calls the backend route (which uses Gemini when a key is configured) and
 * falls back to the local mock builder if the request fails for any reason.
 */
export async function generateStory(
  input: StudentInput
): Promise<GeneratedStory> {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return (await res.json()) as GeneratedStory;
  } catch {
    // Network error / route unavailable — keep the demo working.
    return buildMockStory(input);
  }
}
