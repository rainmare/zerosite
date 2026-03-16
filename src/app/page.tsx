import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SERVICE_TIERS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-6">
                Numerology &bull; Life Path &bull; Guidance
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Discover Your
                <span className="block text-primary mt-2">Life Path</span>
              </h1>
              <p className="text-text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Your numbers tell a story. Book a live reading with
                {" "}<span className="text-primary">Zero</span> and get real,
                personalized insight into your strengths, your direction, and
                what your life path actually means.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/services"
                  className="bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm tracking-wide uppercase"
                >
                  Explore Readings
                </Link>
                <Link
                  href="/about"
                  className="border border-border hover:border-text-muted text-text-muted hover:text-text font-medium px-8 py-3.5 rounded-lg transition-all text-sm tracking-wide uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem]">
                <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent rounded-full blur-2xl" />
                <Image
                  src="/wizard.png"
                  alt="Cosmic Astrology Wizard"
                  fill
                  className="object-contain relative z-10 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.2em] uppercase mb-3">
              What We Offer
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">
              What You Get
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✦",
                title: "Life Path Analysis",
                desc: "Your life path number broken down and explained — what it means, how it shows up in your life, and why it matters.",
              },
              {
                icon: "◈",
                title: "Personalized Guidance",
                desc: "Not a generic reading. Zero works with your specific numbers to give advice that actually applies to you.",
              },
              {
                icon: "⟡",
                title: "Live Sessions",
                desc: "One-on-one video calls via Google Meet, Zoom, or Discord. Ask questions, get answers in real time.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-surface border border-border/50 rounded-xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-3xl mb-4 text-primary">{item.icon}</div>
                <h3 className="font-heading text-xl mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Numerology */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-secondary text-sm tracking-[0.2em] uppercase mb-3">
                The Basics
              </p>
              <h2 className="font-heading text-3xl md:text-4xl mb-8">
                What is Numerology?
              </h2>
              <div className="space-y-5 text-text-muted leading-relaxed">
                <p>
                  Numerology is the study of numbers and how they relate to your
                  life. Your birth date and name correspond to specific numbers,
                  and those numbers reveal patterns — about your personality,
                  your strengths, your challenges, and the direction you&apos;re
                  naturally pulled toward.
                </p>
                <p>
                  Your <span className="text-primary font-medium">Life Path Number</span> is
                  the most important number in your chart. It&apos;s calculated from
                  your date of birth and tells you about the kind of person you are,
                  what you&apos;re good at, and what you need to work on.
                </p>
                <p>
                  Zero uses numerology along with spiritual practices to give you
                  readings that are specific to you — not vague horoscope stuff.
                  Every session is a real conversation about your numbers and
                  what they mean for your actual life.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "1–9", label: "Core Life Paths", desc: "Each number represents a different personality type and life direction" },
                { number: "11", label: "Master Number", desc: "Strong intuition, sensitivity, and natural awareness" },
                { number: "22", label: "Master Builder", desc: "The ability to turn big ideas into real results" },
                { number: "33", label: "Master Teacher", desc: "Natural leadership, empathy, and understanding" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-2xl font-heading text-primary mb-2">{item.number}</div>
                  <h4 className="font-heading text-sm mb-1">{item.label}</h4>
                  <p className="text-text-dim text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🔮",
                title: "Numerology",
                desc: "Your birth date and name broken down into numbers that reveal real patterns about who you are.",
              },
              {
                icon: "✨",
                title: "Spiritual Insight",
                desc: "Zero brings spiritual awareness into every reading to give you a fuller picture, not just numbers on a page.",
              },
              {
                icon: "🌙",
                title: "Practical Guidance",
                desc: "Readings that connect to your real life — relationships, career, decisions you're actually facing.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-bg border border-border/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-heading text-sm mb-2">{item.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-secondary text-sm tracking-[0.2em] uppercase mb-3">
              Pricing
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">
              Choose Your Reading
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-surface border rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 ${
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
                  <span className="text-3xl font-bold text-primary">
                    ${tier.price}
                  </span>
                </div>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
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
                <Link
                  href="/services"
                  className={`block text-center font-medium text-sm py-3 rounded-lg transition-all tracking-wide uppercase ${
                    tier.popular
                      ? "bg-primary hover:bg-primary-hover text-white hover:shadow-lg hover:shadow-primary/20"
                      : "border border-border hover:border-primary text-text-muted hover:text-text"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Ready to Get Your Reading?
          </h2>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            Book a live session with Zero and find out what your numbers say
            about you.
          </p>
          <Link
            href="/services"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-medium px-10 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm tracking-wide uppercase"
          >
            Book Your Reading Now
          </Link>
        </div>
      </section>
    </>
  );
}
