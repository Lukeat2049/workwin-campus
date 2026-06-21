import {
  ArrowRight,
  Users,
  FileCheck2,
  TrendingUp,
  Lock,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

// All data here is fake/demo only — aggregated and anonymous, no student names.

const USAGE_SUMMARY = [
  { value: "342", label: "Students reached" },
  { value: "1,180", label: "Stories generated" },
  { value: "87%", label: "Completed a reflection" },
  { value: "4.6/5", label: "Avg. student rating" },
];

const TOP_EXPERIENCES = [
  { label: "Internships", pct: 34 },
  { label: "Class projects", pct: 26 },
  { label: "Campus jobs", pct: 18 },
  { label: "Volunteer work", pct: 12 },
  { label: "Leadership roles", pct: 10 },
];

const TOP_SKILLS = [
  { label: "Communication", pct: 71 },
  { label: "Teamwork", pct: 64 },
  { label: "Data analysis", pct: 48 },
  { label: "Problem-solving", pct: 45 },
  { label: "Leadership", pct: 39 },
];

const WRITING_GAPS = [
  "68% described work as tasks rather than outcomes before using WorkWin Campus",
  "54% did not include any measurable result or metric",
  "41% left out the specific tools or methods they used",
];

const PITCH_GAPS = [
  "Pitches often missed a clear ask (what opportunity the student wants)",
  "Many ran long — over 60 seconds — and lost the recruiter's attention",
  "Students rarely connected one specific experience to their interests",
];

const CONFIDENCE = { before: 38, after: 79 };

const RECOMMENDATIONS = [
  "Offer a resume accomplishment workshop before career fair season",
  "Add elevator pitch practice to internship prep courses",
  "Help students connect class projects to career readiness competencies",
  "Encourage students to track work wins throughout the semester",
];

export default function UniversityBuyerDemo() {
  return (
    <section id="demo" className="section-pad scroll-mt-16">
      <div className="container-app">
        <SectionHeading
          eyebrow="University buyer demo"
          title="What your career center would see"
          subtitle="A sample of the aggregated, anonymous reporting available to university partners. All figures below are illustrative demo data."
        />

        <div className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 text-xs text-ink-500">
          <Lock className="h-3.5 w-3.5" />
          Aggregated and anonymous — no individual student names are ever shown.
        </div>

        {/* 1. Usage summary */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {USAGE_SUMMARY.map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <p className="text-2xl font-bold text-brand-600 sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-ink-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 3. Top experience types */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-600" />
              <h3 className="font-semibold text-ink-900">Top experience types</h3>
            </div>
            <BarList items={TOP_EXPERIENCES} />
          </div>

          {/* 4. Top skills demonstrated */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-brand-600" />
              <h3 className="font-semibold text-ink-900">
                Top skills demonstrated
              </h3>
            </div>
            <BarList items={TOP_SKILLS} />
          </div>

          {/* 5. Writing gaps */}
          <div className="card p-6">
            <h3 className="mb-4 font-semibold text-ink-900">
              Common student writing gaps
            </h3>
            <ul className="space-y-3">
              {WRITING_GAPS.map((g) => (
                <li
                  key={g}
                  className="flex gap-3 rounded-xl bg-accent-50 p-3 text-sm text-ink-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Pitch gaps */}
          <div className="card p-6">
            <h3 className="mb-4 font-semibold text-ink-900">
              Common elevator pitch gaps
            </h3>
            <ul className="space-y-3">
              {PITCH_GAPS.map((g) => (
                <li
                  key={g}
                  className="flex gap-3 rounded-xl bg-ink-50 p-3 text-sm text-ink-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 7. Before / after */}
        <div className="mt-6 card p-6 sm:p-8">
          <h3 className="mb-5 font-semibold text-ink-900">
            Before &amp; after: how students describe their experience
          </h3>
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-xl border border-ink-200 bg-ink-50/60 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
                Before
              </p>
              <p className="text-sm italic text-ink-600">
                &ldquo;I helped with a class project and made slides.&rdquo;
              </p>
            </div>
            <div className="flex justify-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
                After
              </p>
              <p className="text-sm text-ink-800">
                &ldquo;Collaborated with a student team to analyze a business
                problem, organize findings into a clear presentation, and
                communicate recommendations to classmates and faculty.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 9. Confidence improvement */}
          <div className="card p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-600" />
              <h3 className="font-semibold text-ink-900">
                Student confidence improvement
              </h3>
            </div>
            <p className="mb-5 text-sm text-ink-600">
              Students reporting they feel &ldquo;confident describing their
              experience&rdquo; before vs. after using the tool.
            </p>
            <ConfidenceBar label="Before" value={CONFIDENCE.before} muted />
            <div className="h-3" />
            <ConfidenceBar label="After" value={CONFIDENCE.after} />
            <p className="mt-4 text-sm font-medium text-green-700">
              +{CONFIDENCE.after - CONFIDENCE.before} point increase in
              self-reported confidence.
            </p>
          </div>

          {/* 8. Programming recommendations */}
          <div className="card p-6">
            <h3 className="mb-4 font-semibold text-ink-900">
              Suggested programming recommendations
            </h3>
            <ul className="space-y-3">
              {RECOMMENDATIONS.map((r, i) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarList({ items }: { items: { label: string; pct: number }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink-700">{it.label}</span>
            <span className="font-medium text-ink-500">{it.pct}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: `${it.pct}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ConfidenceBar({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-ink-700">{label}</span>
        <span className="font-semibold text-ink-900">{value}%</span>
      </div>
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full ${
            muted ? "bg-ink-300" : "bg-green-500"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
