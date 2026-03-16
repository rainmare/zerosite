import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-lg text-primary mb-3 tracking-widest">
              {SITE_NAME}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Illuminating your path through the wisdom of numbers and the
              stars. Every soul has a unique cosmic blueprint.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-text mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-secondary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xs font-medium uppercase tracking-[0.2em] text-text mb-3">
              Connect
            </h4>
            <p className="text-text-muted text-sm">
              Have questions? Reach out and let&apos;s explore the cosmos
              together.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/30 text-center">
          <p className="text-text-dim text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
