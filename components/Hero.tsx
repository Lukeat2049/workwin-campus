"use client";

import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useRequestModal } from "./ModalProvider";

const STAT_ITEMS = [
  { value: "11", label: "Ready-to-use outputs" },
  { value: "NACE", label: "Career competencies mapped" },
  { value: "100%", label: "In the student's own voice" },
];

export default function Hero() {
  const { openModal } = useRequestModal();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white pt-28 sm:pt-32"
    >
      {/* Soft decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />

      <div className="container-app relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            Career readiness for universities
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Turn student experience into{" "}
            <span className="text-brand-600">career-ready stories.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Help students transform internships, class projects, campus jobs,
            volunteer work, and leadership experiences into resume bullets,
            interview stories, LinkedIn language, elevator pitches, career fair
            talking points, presentations, and career-readiness reflections.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#student-tool" className="btn-primary w-full sm:w-auto">
              Try the Student Tool
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => openModal("University Pilot")}
              className="btn-secondary w-full sm:w-auto"
            >
              View University Pilot
            </button>
          </div>

          <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-ink-500">
            <ShieldCheck className="h-4 w-4 text-brand-500" />
            Built for career readiness, not shortcutting.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 pb-16 sm:pb-20">
          {STAT_ITEMS.map((s) => (
            <div
              key={s.label}
              className="card flex flex-col items-center px-3 py-5 text-center"
            >
              <span className="text-2xl font-bold text-brand-600 sm:text-3xl">
                {s.value}
              </span>
              <span className="mt-1 text-xs text-ink-500 sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
