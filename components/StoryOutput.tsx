"use client";

import {
  Award,
  FileText,
  Layers,
  Lightbulb,
  ListChecks,
  Megaphone,
  MessagesSquare,
  Presentation,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { GeneratedStory } from "@/lib/types";
import OutputCard from "./OutputCard";
import CopyButton from "./CopyButton";

// Renders the 11 generated output cards. Kept separate from StudentTool so the
// form logic and the result rendering stay readable.
export default function StoryOutput({ story }: { story: GeneratedStory }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* 1. Experience Summary */}
      <OutputCard
        title="Experience Summary"
        icon={<Sparkles className="h-4 w-4" />}
        helper="Use this as a quick description of your experience in conversations or applications."
        copyText={story.summary}
        className="lg:col-span-2"
      >
        <p>{story.summary}</p>
      </OutputCard>

      {/* 2. Resume Bullets */}
      <OutputCard
        title="Resume Bullets"
        icon={<FileText className="h-4 w-4" />}
        helper="Drop these straight into your resume — edit the wording to match your real numbers."
        copyText={story.resumeBullets.map((b) => `• ${b}`).join("\n")}
      >
        <ul className="space-y-2.5">
          {story.resumeBullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </OutputCard>

      {/* 3. Interview STAR Story */}
      <OutputCard
        title="Interview STAR Story"
        icon={<Target className="h-4 w-4" />}
        helper="Use this structure to answer behavioral interview questions clearly."
        copyText={`Situation: ${story.star.situation}\nTask: ${story.star.task}\nAction: ${story.star.action}\nResult: ${story.star.result}`}
      >
        <dl className="space-y-3">
          {(
            [
              ["Situation", story.star.situation],
              ["Task", story.star.task],
              ["Action", story.star.action],
              ["Result", story.star.result],
            ] as const
          ).map(([label, text]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {label}
              </dt>
              <dd className="mt-0.5">{text}</dd>
            </div>
          ))}
        </dl>
      </OutputCard>

      {/* 4. Elevator Pitch (multi-part) */}
      <OutputCard
        title="Elevator Pitch"
        icon={<Megaphone className="h-4 w-4" />}
        helper="Practice these out loud until they sound like you — natural beats polished."
        copyText={[
          `30-Second Pitch:\n${story.pitch.thirtySecond}`,
          `Career Fair Version:\n${story.pitch.careerFair}`,
          `Conversational Version:\n${story.pitch.conversational}`,
          `Recruiter Follow-Up:\n${story.pitch.recruiterFollowUp}`,
          `Confidence Tips:\n${story.pitch.confidenceTips
            .map((t) => `• ${t}`)
            .join("\n")}`,
        ].join("\n\n")}
        className="lg:col-span-2"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PitchBlock label="A. 30-Second Pitch" text={story.pitch.thirtySecond} />
          <PitchBlock
            label="B. Short Career Fair Version"
            text={story.pitch.careerFair}
          />
          <PitchBlock
            label="C. Conversational Version"
            text={story.pitch.conversational}
          />
          <PitchBlock
            label="D. Recruiter Follow-Up Version"
            text={story.pitch.recruiterFollowUp}
          />
        </div>
        <div className="mt-4 rounded-xl bg-brand-50/60 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
            E. Confidence Tips
          </p>
          <ul className="space-y-1.5">
            {story.pitch.confidenceTips.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </OutputCard>

      {/* 5. LinkedIn Summary */}
      <OutputCard
        title="LinkedIn Summary"
        icon={<MessagesSquare className="h-4 w-4" />}
        helper="Paste into your LinkedIn 'About' section and adjust to your voice."
        copyText={story.linkedin}
      >
        <p>{story.linkedin}</p>
      </OutputCard>

      {/* 6. Career Fair Talking Points */}
      <OutputCard
        title="Career Fair Talking Points"
        icon={<MessagesSquare className="h-4 w-4" />}
        helper="Keep these in mind when walking up to a recruiter's table."
        copyText={story.careerFairPoints.map((p) => `• ${p}`).join("\n")}
      >
        <ul className="space-y-2.5">
          {story.careerFairPoints.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </OutputCard>

      {/* 7. Skills Demonstrated */}
      <OutputCard
        title="Skills Demonstrated"
        icon={<Award className="h-4 w-4" />}
        helper="Mention these in interviews and weave them into your resume and LinkedIn."
        copyText={story.skills.join(", ")}
      >
        <div className="flex flex-wrap gap-2">
          {story.skills.map((s, i) => (
            <span
              key={i}
              className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
            >
              {s}
            </span>
          ))}
        </div>
      </OutputCard>

      {/* 8. Career Competency Mapping */}
      <OutputCard
        title="Career Competency Mapping"
        icon={<ListChecks className="h-4 w-4" />}
        helper="Aligned to the NACE Career Readiness Competencies — the framework most career centers and employers use. Use these to explain the transferable value of your experience."
        copyText={story.competencies
          .map((c) => `${c.name}: ${c.explanation}`)
          .join("\n")}
        className="lg:col-span-2"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {story.competencies.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-ink-100 bg-ink-50/50 p-3.5"
            >
              <p className="text-sm font-semibold text-ink-900">{c.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-600">
                {c.explanation}
              </p>
            </div>
          ))}
        </div>
      </OutputCard>

      {/* 9. Reflection Questions */}
      <OutputCard
        title="Reflection Questions"
        icon={<Lightbulb className="h-4 w-4" />}
        helper="Answer these for yourself — they help you own and explain the experience."
        copyText={story.reflectionQuestions.map((q) => `• ${q}`).join("\n")}
      >
        <ol className="space-y-2.5">
          {story.reflectionQuestions.map((q, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                {i + 1}
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </OutputCard>

      {/* 10. Presentation Outline */}
      <OutputCard
        title="Presentation Outline"
        icon={<Presentation className="h-4 w-4" />}
        helper="A ready-made 5-slide structure for an internship or class presentation."
        copyText={story.presentation
          .map(
            (s, i) =>
              `Slide ${i + 1}: ${s.title}\n${s.points
                .map((p) => `  - ${p}`)
                .join("\n")}`
          )
          .join("\n\n")}
      >
        <ol className="space-y-3">
          {story.presentation.map((s, i) => (
            <li key={i}>
              <p className="text-sm font-semibold text-ink-900">
                <span className="mr-1.5 text-brand-500">{i + 1}.</span>
                {s.title}
              </p>
              <ul className="ml-5 mt-1 space-y-1">
                {s.points.map((p, j) => (
                  <li key={j} className="list-disc text-xs text-ink-600">
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </OutputCard>

      {/* 11. How to Improve This Story */}
      <OutputCard
        title="How to Improve This Story"
        icon={<TrendingUp className="h-4 w-4" />}
        helper="Strengthen your story before you use it — small additions make a big difference."
        copyText={story.improvements.map((p) => `• ${p}`).join("\n")}
        className="lg:col-span-2"
      >
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {story.improvements.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </OutputCard>
    </div>
  );
}

function PitchBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-ink-50/40 p-4">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {label}
        </p>
        <CopyButton value={text} label="" />
      </div>
      <p className="text-sm leading-relaxed text-ink-700">{text}</p>
    </div>
  );
}
