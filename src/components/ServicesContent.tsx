"use client";

import { useAuth } from "./AuthProvider";
import { PricingCard } from "./PricingCard";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import type { ServiceTier } from "@/lib/constants";

export function ServicesContent({ tiers }: { tiers: ServiceTier[] }) {
  const { user, loading, signInWithGoogle } = useAuth();

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-3">
            Our Offerings
          </p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Choose Your Reading
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Every package is a live session with Zero. Pick the level of
            detail you want and book a time that works for you.
          </p>
        </div>

        {!loading && !user && (
          <div className="mb-12 bg-surface border border-primary/30 rounded-xl p-6 md:p-8 text-center">
            <h3 className="font-heading text-xl mb-2">Sign in to get started</h3>
            <p className="text-text-muted text-sm mb-5 max-w-md mx-auto">
              Please sign in with Google to purchase a reading and book your session.
            </p>
            <button
              onClick={signInWithGoogle}
              className="inline-flex items-center gap-2 bg-white text-gray-800 font-medium text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="bg-surface border border-border/50 rounded-xl p-8">
            <h3 className="font-heading text-xl mb-3">How It Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-primary font-heading text-2xl mb-2">1</div>
                <p className="text-text-muted">
                  Sign in with Google and choose your package
                </p>
              </div>
              <div>
                <div className="text-primary font-heading text-2xl mb-2">2</div>
                <p className="text-text-muted">
                  Complete payment securely via Stripe
                </p>
              </div>
              <div>
                <div className="text-primary font-heading text-2xl mb-2">3</div>
                <p className="text-text-muted">
                  Select your date, time, and platform to book your session
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-3">
              Availability
            </p>
            <h2 className="font-heading text-3xl mb-3">Open Days</h2>
            <p className="text-text-muted text-sm max-w-lg mx-auto">
              Sessions are available Monday through Saturday. Book up to 30 days in advance.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <AvailabilityCalendar />
          </div>
        </div>
      </div>
    </section>
  );
}
