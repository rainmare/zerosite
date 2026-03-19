import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SERVICE_TIERS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Life Path
                <span className="block text-primary mt-2">Readings</span>
              </h1>
              <p className="text-text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Book a live session with{" "}
                <span className="text-primary">Zero</span>. Get a personalized
                numerology reading that breaks down who you are, where you&apos;re
                headed, and what to focus on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/services"
                  className="bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 text-sm tracking-wide uppercase"
                >
                  Book a Reading
                </Link>
                <Link
                  href="/about"
                  className="border border-border hover:border-text-muted text-text-muted hover:text-text font-medium px-8 py-3.5 rounded-lg transition-all text-sm tracking-wide uppercase"
                >
                  About Zero
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem]">
                <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent rounded-full blur-2xl" />
                <Image
                  src="/wizard.png"
                  alt="Zero"
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
            <h2 className="font-heading text-3xl md:text-4xl">
              What You Get
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Your Numbers Explained",
                desc: "Your life path number calculated and broken down — what it says about your personality, your strengths, and where you're headed.",
              },
              {
                title: "Advice That Applies to You",
                desc: "Not copy-paste horoscopes. Zero looks at your specific numbers and gives you real, direct guidance.",
              },
              {
                title: "Live Video Call",
                desc: "Every reading is a live one-on-one session on Google Meet, Zoom, or Discord. You can ask questions and have a real conversation.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-surface border border-border/50 rounded-xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-heading text-xl mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl">
              Pricing
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
