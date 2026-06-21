import { GraduationCap, ShieldCheck } from "lucide-react";

const LINKS = [
  { label: "Student Tool", href: "#student-tool" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "University Pilot", href: "#pilot" },
  { label: "Workshop", href: "#workshop" },
  { label: "Campus Insights", href: "#insights" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="container-app py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-semibold text-ink-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span>
                WorkWin <span className="text-brand-600">Campus</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              A career-readiness platform that helps students turn real
              experience into clear professional stories — built for career
              readiness, not shortcutting.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700">
              <ShieldCheck className="h-4 w-4" />
              Responsible AI for career growth
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ink-600 transition-colors hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} WorkWin Campus. Demo experience.</p>
          <p>
            WorkWin Campus helps students think more clearly about their
            experience before using AI to polish their communication.
          </p>
        </div>
      </div>
    </footer>
  );
}
