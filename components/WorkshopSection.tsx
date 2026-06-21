"use client";

import { CalendarCheck, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useRequestModal } from "./ModalProvider";

const OUTCOMES = [
  "3 stronger resume bullets",
  "1 interview STAR story",
  "1 elevator pitch",
  "1 LinkedIn-ready summary",
  "3 career fair talking points",
  "A list of skills and competencies demonstrated",
  "A better understanding of how to use AI responsibly for career growth",
];

export default function WorkshopSection() {
  const { openModal } = useRequestModal();

  return (
    <section id="workshop" className="section-pad scroll-mt-16">
      <div className="container-app">
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-brand-50 to-white shadow-card">
          <div className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Speaking workshop"
                title="Turn Your Experience Into Career-Ready Accomplishments"
                align="left"
                subtitle="A 45-minute interactive session where students bring one real experience and leave with resume bullets, an interview STAR story, an elevator pitch, a LinkedIn-ready summary, and a clearer understanding of the skills they demonstrated."
              />
              <button
                onClick={() => openModal("Workshop")}
                className="btn-primary mt-7"
              >
                <CalendarCheck className="h-4 w-4" />
                Book a Workshop
              </button>
            </div>

            <div className="card p-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                Student outcomes
              </p>
              <ul className="mt-4 space-y-3">
                {OUTCOMES.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <span className="text-sm text-ink-700">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
