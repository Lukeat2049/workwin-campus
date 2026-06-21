import {
  BarChart3,
  Wrench,
  AlertTriangle,
  TrendingUp,
  Target,
  CalendarRange,
  Megaphone,
  Handshake,
  Lock,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const INSIGHT_CARDS = [
  { icon: BarChart3, label: "Most common experience types" },
  { icon: Wrench, label: "Most common skills demonstrated" },
  { icon: AlertTriangle, label: "Common gaps in student impact statements" },
  { icon: TrendingUp, label: "Student confidence before and after using the tool" },
  { icon: Target, label: "Career competency trends" },
  { icon: CalendarRange, label: "Suggested programming opportunities" },
  { icon: Megaphone, label: "Elevator pitch readiness" },
  { icon: Handshake, label: "Career fair preparation gaps" },
];

export default function InsightsSection() {
  return (
    <section id="insights" className="section-pad bg-white scroll-mt-16">
      <div className="container-app">
        <SectionHeading
          eyebrow="Campus insights"
          title="Anonymous Career Readiness Insights"
          subtitle="Universities can receive aggregated, anonymous insights that help identify how students describe their experiences, which skills appear most often, and where students may need more career coaching."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INSIGHT_CARDS.map((c) => (
            <div
              key={c.label}
              className="card flex flex-col gap-3 p-5 transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-ink-800">{c.label}</span>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-6 sm:flex-row sm:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <Lock className="h-5 w-5" />
          </span>
          <div className="text-sm text-ink-700">
            <p>
              No individual student data is sold. Student content remains
              private. Reports are anonymous and aggregated unless a student
              chooses to share their work — FERPA-conscious by design.
            </p>
            <p className="mt-1.5 font-medium text-ink-900">
              &ldquo;Campus reports are designed to show trends, not expose
              individual student stories.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
