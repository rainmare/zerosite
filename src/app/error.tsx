"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h2 className="font-heading text-2xl">Something went wrong</h2>
        <p className="text-text-muted">An unexpected error occurred.</p>
        <button
          onClick={reset}
          className="bg-primary hover:bg-primary-hover text-white text-sm font-heading px-6 py-2.5 rounded-lg transition-colors tracking-wider uppercase"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
