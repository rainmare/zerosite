"use client";

import { PLATFORMS, type Platform } from "@/lib/constants";

type PlatformSelectProps = {
  selected: Platform | null;
  onSelect: (platform: Platform) => void;
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  "google-meet": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="13" height="12" rx="2" />
      <path d="M15 10l5-3v10l-5-3" />
    </svg>
  ),
  zoom: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="13" height="12" rx="2" />
      <path d="M15 10l5-3v10l-5-3" />
    </svg>
  ),
  discord: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  ),
};

export function PlatformSelect({ selected, onSelect }: PlatformSelectProps) {
  return (
    <div className="bg-surface border border-border/50 rounded-xl p-6">
      <h3 className="font-heading text-lg mb-4">Choose Your Platform</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`flex flex-col items-center gap-2 py-4 px-4 rounded-lg text-sm font-medium transition-all ${
              selected === platform.id
                ? "bg-primary text-white"
                : "border border-border hover:border-primary text-text-muted hover:text-text"
            }`}
          >
            {PLATFORM_ICONS[platform.id]}
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}
