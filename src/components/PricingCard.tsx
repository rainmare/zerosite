"use client";

import { ServiceTier } from "@/lib/constants";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

export function PricingCard({ tier }: { tier: ServiceTier }) {
  const { user, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (!user) {
      signInWithGoogle();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`relative bg-surface border rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col ${
        tier.popular
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border/50 hover:border-primary/30"
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full tracking-wide uppercase">
          Most Popular
        </div>
      )}
      <h3 className="font-heading text-xl mb-2">{tier.name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-primary">${tier.price}</span>
      </div>
      <p className="text-text-muted text-sm mb-6 leading-relaxed">
        {tier.description}
      </p>
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-text-muted"
          >
            <span className="text-secondary mt-0.5 shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full text-center font-medium text-sm py-3 rounded-lg transition-all tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed ${
          tier.popular
            ? "bg-primary hover:bg-primary-hover text-white hover:shadow-lg hover:shadow-primary/20"
            : "border border-border hover:border-primary text-text-muted hover:text-text"
        }`}
      >
        {loading ? "Processing..." : user ? "Purchase & Book" : "Sign in to Book"}
      </button>
    </div>
  );
}
