"use client";

import { ReactNode } from "react";
import CopyButton from "./CopyButton";

interface OutputCardProps {
  title: string;
  /** Plain-text version used for the copy button. */
  copyText: string;
  /** Small helper text describing how a student might use this output. */
  helper?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function OutputCard({
  title,
  copyText,
  helper,
  icon,
  children,
  className = "",
}: OutputCardProps) {
  return (
    <div
      className={`card flex flex-col p-5 transition-shadow hover:shadow-card-hover sm:p-6 ${className}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              {icon}
            </span>
          )}
          <h3 className="text-base font-semibold text-ink-900">{title}</h3>
        </div>
        <CopyButton value={copyText} />
      </div>

      <div className="flex-1 text-sm leading-relaxed text-ink-700">
        {children}
      </div>

      {helper && (
        <p className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-400">
          {helper}
        </p>
      )}
    </div>
  );
}
