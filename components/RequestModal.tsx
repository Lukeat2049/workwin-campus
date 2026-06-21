"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { CONTACT_INTERESTS } from "@/lib/options";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-fills the "Area of interest" and modal heading. */
  subject?: string;
}

const TIMELINES = [
  "This semester",
  "Next semester",
  "Within the school year",
  "Just exploring",
];

export default function RequestModal({
  open,
  onClose,
  subject,
}: RequestModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    org: "",
    role: "",
    email: "",
    interest: subject || "",
    students: "",
    timeline: "",
    message: "",
  });

  // Keep interest synced with whichever button opened the modal.
  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, interest: subject || f.interest }));
      setSubmitted(false);
    }
  }, [open, subject]);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: no network call. Show the mock success state.
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/50 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-card-hover animate-fade-in-up sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-ink-900">
              Thanks for reaching out!
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ink-600">
              This demo does not send messages yet, but this is where a pilot
              request would be captured.
            </p>
            <button
              onClick={onClose}
              className="btn-primary mt-6"
              type="button"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-6 py-7 sm:px-8">
            <span className="eyebrow">Get started</span>
            <h3 className="mt-3 text-xl font-semibold text-ink-900">
              {subject || "Request information"}
            </h3>
            <p className="mt-1 text-sm text-ink-500">
              Tell us a little about your campus and we&apos;ll follow up with
              next steps.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  <label className="field-label">University or organization</label>
                  <input
                    required
                    className="field-input"
                    value={form.org}
                    onChange={(e) => update("org", e.target.value)}
                    placeholder="State University Career Center"
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
                <div>
                  <label className="field-label">Area of interest</label>
                  <select
                    className="field-input"
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {CONTACT_INTERESTS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                    {/* Allow button-supplied subjects that aren't in the list */}
                    {form.interest &&
                      !CONTACT_INTERESTS.includes(form.interest) && (
                        <option value={form.interest}>{form.interest}</option>
                      )}
                  </select>
                </div>
                <div>
                  <label className="field-label">Number of students</label>
                  <input
                    className="field-input"
                    value={form.students}
                    onChange={(e) => update("students", e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Preferred timeline</label>
                  <select
                    className="field-input"
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {TIMELINES.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="field-label">Message</label>
                <textarea
                  className="field-input min-h-[90px] resize-y"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="What would you like to accomplish for your students?"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit request
              </button>
              <p className="text-center text-xs text-ink-400">
                Frontend demo — no information is sent or stored.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
