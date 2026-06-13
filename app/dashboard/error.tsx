"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <AlertTriangle className="text-red-400 w-12 h-12" />
      <h2 className="text-xl font-semibold text-slate-200">
        Something went wrong
      </h2>
      <p className="text-slate-400 text-sm max-w-sm text-center">
        {error.message || "Failed to load dashboard data. Please try again."}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm transition-colors"
      >
        Try again
      </button>
    </section>
  );
}
