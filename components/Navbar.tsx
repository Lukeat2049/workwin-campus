"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Student Tool", href: "#student-tool" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "University Pilot", href: "#pilot" },
  { label: "Workshop", href: "#workshop" },
  { label: "Campus Insights", href: "#insights" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        scrolled
          ? "border-b border-ink-100 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container-app flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-semibold text-ink-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-base">
            WorkWin <span className="text-brand-600">Campus</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#student-tool" className="btn-primary">
            Try the Student Tool
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <div className="container-app flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#student-tool"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Try the Student Tool
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
