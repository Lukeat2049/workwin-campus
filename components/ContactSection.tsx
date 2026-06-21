"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { CONTACT_INTERESTS } from "@/lib/options";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    org: "",
    role: "",
    email: "",
    interest: "",
    message: "",
  });

  const update = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only — show the mock success state.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad scroll-mt-16">
      <div className="container-app">
        <div className="overflow-hidden rounded-2xl bg-brand-900 text-white shadow-card">
          <div className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-100">
                Contact
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Help students tell the story of their value.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-100">
                Whether you&apos;re a career center, department, or faculty member,
                we&apos;ll help your students communicate real experience with
                clarity and confidence.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-ink-800 sm:p-7">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink-900">
                    Thanks!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-600">
                    This demo does not send messages yet, but this is where a
                    pilot request would be captured.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="field-label">Name</label>
                      <input
                        required
                        className="field-input"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Jordan Lee"
                      />
                    </div>
                    <div>
                      <label className="field-label">
                        University or organization
                      </label>
                      <input
                        required
                        className="field-input"
                        value={form.org}
                        onChange={(e) => update("org", e.target.value)}
                        placeholder="State University"
                      />
                    </div>
                    <div>
                      <label className="field-label">Role</label>
                      <input
                        className="field-input"
                        value={form.role}
                        onChange={(e) => update("role", e.target.value)}
                        placeholder="Career Advisor"
                      />
                    </div>
                    <div>
                      <label className="field-label">Email</label>
                      <input
                        required
                        type="email"
                        className="field-input"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="jordan@university.edu"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">
                      What are you interested in?
                    </label>
                    <select
                      className="field-input"
                      value={form.interest}
                      onChange={(e) => update("interest", e.target.value)}
                    >
                      <option value="">Select…</option>
                      {CONTACT_INTERESTS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Message</label>
                    <textarea
                      className="field-input min-h-[100px] resize-y"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us about your students and goals…"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
