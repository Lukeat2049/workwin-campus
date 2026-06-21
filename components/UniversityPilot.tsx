"use client";

import {
  Check,
  ArrowRight,
  ShieldCheck,
  Globe,
  ClipboardCheck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useRequestModal } from "./ModalProvider";

const INCLUDES = [
  "Access for up to 100 students",
  "One live or virtual workshop",
  "Student experience reflection tool",
  "Resume, interview, LinkedIn, elevator pitch, and presentation outputs",
  "Career competency mapping (NACE-aligned)",
  "Anonymous student feedback survey",
  "End-of-pilot insight report",
  "Custom university or program landing page",
];

// A believable rollout timeline — what a career center actually wants to see.
const TIMELINE = [
  {
    when: "Weeks 1–2",
    title: "Setup & kickoff",
    body: "We configure your branded landing page and align on goals, audience, and dates. No IT install required.",
  },
  {
    when: "Week 3",
    title: "Workshop",
    body: "A 45-minute live or virtual session where students bring one real experience and build their first outputs.",
  },
  {
    when: "Weeks 3–10",
    title: "Student use",
    body: "Students use the tool independently for resumes, interviews, career fairs, and presentations.",
  },
  {
    when: "End of term",
    title: "Insight report",
    body: "You receive an anonymous, aggregated report on skills, competencies, and confidence gains.",
  },
];

// Practical reassurances a decision-maker checks for before signing off.
const PRACTICAL = [
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    body: "No individual student work is sold or shared. Reports are anonymous and aggregated. FERPA-conscious by design.",
  },
  {
    icon: Globe,
    title: "Nothing to install",
    body: "Fully web-based. Students sign in through your custom landing page — no software for IT to manage.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment-ready",
    body: "Outputs map to NACE career-readiness competencies, giving you evidence for program review and accreditation.",
  },
];

export default function UniversityPilot() {
  const { openModal } = useRequestModal();

  return (
    <section id="pilot" className="section-pad bg-white scroll-mt-16">
      <div className="container-app">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="University pilot"
              title="WorkWin Campus Pilot"
              align="left"
              subtitle="A focused, one-semester pilot for career centers, departments, internship programs, and faculty who want to help students communicate their experience with more clarity and confidence."
            />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                $750 – $1,500 / semester
              </span>
              <button
                onClick={() => openModal("University Pilot")}
                className="btn-primary"
              >
                Request Pilot Info
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm text-ink-500">
              Most partners start with a single class, cohort, or internship
              program, then expand once they see the student outputs.
            </p>

            {/* Practical reassurances */}
            <div className="mt-8 space-y-4">
              {PRACTICAL.map((p) => (
                <div key={p.title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-600">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                What&apos;s included
              </p>
              <ul className="mt-4 space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How the pilot works */}
            <div className="card p-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                How the pilot works
              </p>
              <ol className="mt-5 space-y-5">
                {TIMELINE.map((t, i) => (
                  <li key={t.title} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      {i < TIMELINE.length - 1 && (
                        <span className="mt-1 h-full w-px flex-1 bg-ink-100" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                        {t.when}
                      </p>
                      <p className="text-sm font-semibold text-ink-900">
                        {t.title}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-600">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
