"use client";

import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useRequestModal } from "./ModalProvider";

interface Tier {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter Pilot",
    price: "$750",
    cadence: "/ semester",
    blurb: "Great for one class or student group",
    features: [
      "Up to 50 students",
      "1 workshop",
      "Student tool access",
      "Resume, interview, LinkedIn, and elevator pitch outputs",
      "Basic feedback report",
    ],
    cta: "Request Info",
  },
  {
    name: "Program Pilot",
    price: "$1,500",
    cadence: "/ semester",
    blurb: "Great for departments or internship programs",
    features: [
      "Up to 150 students",
      "1 to 2 workshops",
      "Custom program landing page",
      "Career competency mapping",
      "Anonymous insight report",
      "Elevator pitch and career fair preparation tools",
    ],
    cta: "Request Info",
    featured: true,
  },
  {
    name: "Campus Partner",
    price: "Custom",
    blurb: "Great for career centers and colleges",
    features: [
      "Larger student access",
      "Multiple workshops",
      "Custom templates",
      "Admin reporting dashboard",
      "Employer sponsor opportunities",
      "Speaking engagements",
    ],
    cta: "Contact Us",
  },
];

export default function PricingSection() {
  const { openModal } = useRequestModal();

  return (
    <section id="pricing" className="section-pad bg-white scroll-mt-16">
      <div className="container-app">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans for every campus"
          subtitle="Start small with one class or scale across your whole career center. Every plan keeps the student's own voice at the center."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                tier.featured
                  ? "border-brand-300 bg-white shadow-card-hover ring-1 ring-brand-200"
                  : "border-ink-100 bg-white shadow-card"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-ink-900">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-ink-900">
                  {tier.price}
                </span>
                {tier.cadence && (
                  <span className="text-sm text-ink-500">{tier.cadence}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-500">{tier.blurb}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-700">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal(`${tier.name} — ${tier.cta}`)}
                className={`mt-7 ${
                  tier.featured ? "btn-primary" : "btn-secondary"
                } w-full`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
