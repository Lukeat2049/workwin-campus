import {
  Briefcase,
  Building2,
  GraduationCap,
  Handshake,
  Landmark,
  Linkedin,
  Presentation,
  Users,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const AUDIENCES = [
  { icon: Briefcase, label: "Students preparing for internships" },
  { icon: UserCheck, label: "Students returning from internships" },
  { icon: Handshake, label: "Students preparing for career fairs" },
  { icon: Linkedin, label: "Students building resumes and LinkedIn profiles" },
  { icon: Building2, label: "Career centers" },
  { icon: Landmark, label: "Business schools" },
  { icon: GraduationCap, label: "Honors colleges" },
  { icon: Presentation, label: "Faculty teaching project-based courses" },
  { icon: Users, label: "Student success teams" },
];

export default function WhoItHelps() {
  return (
    <section className="section-pad scroll-mt-16">
      <div className="container-app">
        <SectionHeading
          eyebrow="Who it helps"
          title="Built for students and the people who support them"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div
              key={a.label}
              className="card flex items-center gap-3.5 p-4 transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-ink-800">{a.label}</span>
            </div>
          ))}
        </div>

        {/* Why universities need it */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-brand-900 text-white">
          <div className="grid grid-cols-1 gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                Why universities need it
              </span>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                Many students do meaningful work but struggle to explain why it
                matters.
              </h3>
            </div>
            <div className="flex flex-col justify-center gap-4 text-sm leading-relaxed text-brand-100">
              <p>
                WorkWin Campus helps students connect their experience to
                career-readiness skills, improve professional communication,
                prepare for career conversations, and use AI thoughtfully without
                losing their own voice.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  "Career readiness",
                  "Reflection",
                  "Communication",
                  "Confidence",
                  "Responsible AI use",
                  "Stronger outcomes",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    {t}
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
