"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar } from "./Calendar";
import { TimeSlots } from "./TimeSlots";
import { PlatformSelect } from "./PlatformSelect";
import { useAuth } from "./AuthProvider";
import { useNotifications } from "./NotificationProvider";
import type { Platform } from "@/lib/constants";

type BookingFormProps = {
  sessionId: string;
  tierName: string;
};

export function BookingForm({ sessionId, tierName }: BookingFormProps) {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      if (user.user_metadata?.full_name && !clientName) {
        setClientName(user.user_metadata.full_name);
      }
      if (user.email && !clientEmail) {
        setClientEmail(user.email);
      }
    }
  }, [user, clientName, clientEmail]);

  const fetchAvailability = useCallback(async (date: string) => {
    try {
      const res = await fetch(`/api/bookings?date=${date}`);
      const data = await res.json();
      setBookedTimes(data.bookedTimes || []);
    } catch {
      setBookedTimes([]);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
      setSelectedTime(null);
    }
  }, [selectedDate, fetchAvailability]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!selectedDate || !selectedTime || !selectedPlatform || !clientName || !clientEmail) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          clientName,
          clientEmail,
          date: selectedDate,
          time: selectedTime,
          platform: selectedPlatform,
          notes,
          honeypot: (document.getElementById("website") as HTMLInputElement)
            ?.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      addNotification({
        type: "booking_confirmed",
        title: "Booking Confirmed!",
        message: `Your ${tierName} is scheduled for ${selectedDate} at ${selectedTime} on ${selectedPlatform?.replace("-", " ")}.`,
        meta: {
          date: selectedDate!,
          time: selectedTime!,
          platform: selectedPlatform!,
          tierName,
        },
      });

      setSubmitted(true);
    } catch {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-6">✨</div>
        <h2 className="font-heading text-3xl mb-4">Booking Confirmed!</h2>
        <p className="text-text-muted text-lg mb-2">
          Your {tierName} has been scheduled.
        </p>
        <p className="text-text-muted">
          Check your email at{" "}
          <span className="text-secondary">{clientEmail}</span> for
          confirmation details.
        </p>
        <div className="mt-8 bg-surface border border-border/50 rounded-xl p-6 max-w-md mx-auto text-left">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Date</span>
              <span>{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Time</span>
              <span>{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Platform</span>
              <span className="capitalize">
                {selectedPlatform?.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-surface/50 border border-primary/20 rounded-xl p-4 text-center">
        <p className="text-text-muted text-sm">
          Booking for:{" "}
          <span className="text-primary font-medium">{tierName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <TimeSlots
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          bookedTimes={bookedTimes}
          date={selectedDate}
        />
      </div>

      <PlatformSelect
        selected={selectedPlatform}
        onSelect={setSelectedPlatform}
      />

      <div className="bg-surface border border-border/50 rounded-xl p-6">
        <h3 className="font-heading text-lg mb-4">Your Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-text-muted mb-1.5"
            >
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-text-muted mb-1.5"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm text-text-muted mb-1.5"
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:outline-none transition-colors resize-none"
            placeholder="Anything you'd like your reader to know beforehand..."
          />
        </div>

        {/* Honeypot */}
        <div className="absolute opacity-0 -z-10" aria-hidden="true">
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selectedDate || !selectedTime || !selectedPlatform}
        className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Confirming..." : "Confirm Booking"}
      </button>
    </form>
  );
}
