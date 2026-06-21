"use client";

import { useRef, useState } from "react";
import { Loader2, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { StudentInput, GeneratedStory } from "@/lib/types";
import { generateStory } from "@/lib/generate";
import { EMPTY_INPUT, SAMPLE_EXPERIENCES } from "@/lib/samples";
import {
  DESIRED_OUTPUTS,
  EXPERIENCE_TYPES,
  TARGET_OPPORTUNITIES,
  TONES,
} from "@/lib/options";
import StoryOutput from "./StoryOutput";

type Status = "idle" | "loading" | "done";

export default function StudentTool() {
  const [input, setInput] = useState<StudentInput>({ ...EMPTY_INPUT });
  const [status, setStatus] = useState<Status>("idle");
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof StudentInput>(key: K, value: string) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const loadSample = (id: string) => {
    const sample = SAMPLE_EXPERIENCES.find((s) => s.id === id);
    if (sample) {
      setInput({ ...sample.input });
      setStatus("idle");
      setStory(null);
    }
  };

  const clearForm = () => {
    setInput({ ...EMPTY_INPUT });
    setStatus("idle");
    setStory(null);
  };

  const handleGenerate = async () => {
    setStatus("loading");
    setStory(null);
    // Simulated processing delay for a tasteful loading state. Swapping to a
    // real API call later means just awaiting the network request here.
    await new Promise((r) => setTimeout(r, 1400));
    const result = await generateStory(input);
    setStory(result);
    setStatus("done");
    // Scroll output into view on the next tick.
    setTimeout(
      () => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80
    );
  };

  const canGenerate =
    input.experienceType.trim() !== "" &&
    input.role.trim() !== "" &&
    input.notes.trim() !== "";

  return (
    <section id="student-tool" className="section-pad scroll-mt-20">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Wand2 className="h-3.5 w-3.5" />
            The student tool
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Student Experience Reflection Tool
          </h2>
          <p className="mt-4 text-base text-ink-600">
            Enter one real experience. WorkWin translates it into resume bullets,
            an interview story, an elevator pitch, and more — in your own voice.
          </p>
        </div>

        {/* Ethical AI note */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:flex-row sm:items-start">
          <ShieldCheck className="h-6 w-6 shrink-0 text-brand-600" />
          <div className="text-sm text-ink-700">
            <p>
              <strong className="text-ink-900">
                WorkWin Campus is designed to help students communicate real
                experience, not invent accomplishments.
              </strong>{" "}
              Students should review, edit, and personalize every output before
              using it.
            </p>
            <p className="mt-1.5 font-medium text-brand-700">
              Built for career readiness, not shortcutting.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* ---------- Form ---------- */}
          <div className="card p-5 sm:p-7 lg:col-span-2 lg:self-start lg:sticky lg:top-20">
            {/* Sample selector */}
            <div className="mb-6">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                Try a sample experience
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_EXPERIENCES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => loadSample(s.id)}
                    className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearForm}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-400 hover:text-ink-600"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="Experience type" required>
                <select
                  className="field-input"
                  value={input.experienceType}
                  onChange={(e) => update("experienceType", e.target.value)}
                >
                  <option value="">Select an experience type…</option>
                  {EXPERIENCE_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Student role or title" required>
                <input
                  className="field-input"
                  value={input.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="Marketing Intern, Student Senator, MIS Student, Pricing Intern…"
                />
              </Field>

              <Field label="Major or field of study">
                <input
                  className="field-input"
                  value={input.major}
                  onChange={(e) => update("major", e.target.value)}
                  placeholder="Management Information Systems, Marketing, Finance, Nursing…"
                />
              </Field>

              <Field label="Career interests">
                <input
                  className="field-input"
                  value={input.careerInterests}
                  onChange={(e) => update("careerInterests", e.target.value)}
                  placeholder="Data analytics, marketing, healthcare, consulting, finance…"
                />
              </Field>

              <Field label="Target opportunity">
                <select
                  className="field-input"
                  value={input.targetOpportunity}
                  onChange={(e) => update("targetOpportunity", e.target.value)}
                >
                  <option value="">Select a target…</option>
                  {TARGET_OPPORTUNITIES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Personal strength or differentiator">
                <input
                  className="field-input"
                  value={input.strength}
                  onChange={(e) => update("strength", e.target.value)}
                  placeholder="I'm good at explaining complex ideas, solving problems, analyzing data…"
                />
              </Field>

              <Field label="Experience notes" required>
                <textarea
                  className="field-input min-h-[110px] resize-y"
                  value={input.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Example: I helped compare competitor prices, updated a spreadsheet, found pricing gaps, and summarized the results for my manager."
                />
              </Field>

              <Field label="What was the goal?">
                <textarea
                  className="field-input min-h-[70px] resize-y"
                  value={input.goal}
                  onChange={(e) => update("goal", e.target.value)}
                  placeholder="Example: Help the team better understand how our prices compared to competitors."
                />
              </Field>

              <Field label="What changed because of your work?">
                <textarea
                  className="field-input min-h-[70px] resize-y"
                  value={input.impact}
                  onChange={(e) => update("impact", e.target.value)}
                  placeholder="Example: The team had a clearer view of pricing gaps and could decide what to review next."
                />
              </Field>

              <Field label="Tools or skills used">
                <input
                  className="field-input"
                  value={input.tools}
                  onChange={(e) => update("tools", e.target.value)}
                  placeholder="Excel, Tableau, SQL, communication, research, teamwork, leadership…"
                />
              </Field>

              <Field label="Desired output goal">
                <select
                  className="field-input"
                  value={input.desiredOutput}
                  onChange={(e) => update("desiredOutput", e.target.value)}
                >
                  <option value="">Select an output…</option>
                  {DESIRED_OUTPUTS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Tone">
                <select
                  className="field-input"
                  value={input.tone}
                  onChange={(e) => update("tone", e.target.value)}
                >
                  <option value="">Select a tone…</option>
                  {TONES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate || status === "loading"}
              className="btn-primary mt-6 w-full"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate My Career Story
                </>
              )}
            </button>
            {!canGenerate && (
              <p className="mt-2 text-center text-xs text-ink-400">
                Add an experience type, role, and experience notes to generate.
              </p>
            )}
          </div>

          {/* ---------- Output ---------- */}
          <div ref={outputRef} className="lg:col-span-3">
            {status === "idle" && <EmptyState />}
            {status === "loading" && <LoadingState />}
            {status === "done" && story && <StoryOutput story={story} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label">
        {label}
        {required && <span className="ml-0.5 text-accent-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
        <Sparkles className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink-900">
        Your career story will appear here
      </h3>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        Fill in the form — or load a sample experience — then click{" "}
        <span className="font-medium text-ink-700">
          Generate My Career Story
        </span>{" "}
        to see resume bullets, an interview story, an elevator pitch, and more.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-ink-100 bg-white p-8 text-center shadow-card">
      <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
      <p className="mt-5 text-base font-medium text-ink-800">
        Translating experience into career-ready language…
      </p>
      <p className="mt-1.5 text-sm text-ink-500">
        Mapping your work to skills, competencies, and clear professional stories.
      </p>
      <div className="mt-6 w-full max-w-sm space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2 rounded-xl border border-ink-100 p-3">
            <div className="h-3 w-1/3 animate-pulse rounded bg-ink-100" />
            <div className="h-2.5 w-full animate-pulse rounded bg-ink-100" />
            <div className="h-2.5 w-4/5 animate-pulse rounded bg-ink-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
