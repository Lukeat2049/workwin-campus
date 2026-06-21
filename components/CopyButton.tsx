"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  /** The text that gets copied to the clipboard. */
  value: string;
  className?: string;
  label?: string;
}

export default function CopyButton({
  value,
  className = "",
  label = "Copy",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can fail in some browsers/contexts — fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        copied
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
      } ${className}`}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> {label}
        </>
      )}
    </button>
  );
}
