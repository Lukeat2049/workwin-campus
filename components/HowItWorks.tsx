import { Lightbulb, Sparkles, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: Lightbulb,
    title: "Reflect",
    body: "Students enter real experiences from internships, classes, work, service, or leadership.",
  },
  {
    icon: Sparkles,
    title: "Translate",
    body: "WorkWin turns those experiences into career-ready language.",
  },
  {
    icon: Rocket,
    title: "Apply",
    body: "Students use the outputs for resumes, interviews, LinkedIn, elevator pitches, presentations, and career conversations.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-white scroll-mt-16">
      <div className="container-app">
        <SectionHeading
          eyebrow="How it works"
          title="From real experience to career-ready story"
          subtitle="A simple, three-step flow that keeps the student's thinking at the center."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card relative p-6">
              <span className="absolute right-5 top-5 text-5xl font-bold text-ink-100">
                {i + 1}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
