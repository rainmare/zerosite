"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { NotificationBell } from "./NotificationBell";
import { MuteButton } from "./MuteButton";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-bg/80 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-widest text-primary hover:text-primary-hover transition-colors"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-heading text-text-muted hover:text-text transition-colors text-xs tracking-[0.2em] uppercase"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/services"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-heading font-medium px-5 py-2 rounded-lg transition-colors tracking-wider uppercase"
            >
              Book a Reading
            </Link>
          </li>
          <li>
            <MuteButton />
          </li>
          <li>
            <NotificationBell />
          </li>
          <li>
            <GoogleLoginButton />
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-muted hover:text-text transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-bg/95 backdrop-blur-xl">
          <ul className="px-6 py-4 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-heading text-text-muted hover:text-text transition-colors text-xs tracking-[0.2em] uppercase py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primary hover:bg-primary-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Book a Reading
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
