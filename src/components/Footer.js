import Link from "next/link";

export default function Footer() {
  const links = {
    Products: [
      { label: "Savings Account", href: "#" },
      { label: "Checking Account", href: "#" },
      { label: "Credit Card", href: "#" },
      { label: "Instant Transfers", href: "#" },
      { label: "Mobile App", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    Support: [
      { label: "Help Center", href: "#" },
      { label: "FAQs", href: "/faq" },
      { label: "Live Chat", href: "#" },
      { label: "System Status", href: "/status" },
      { label: "Security", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "FDIC Disclosure", href: "/fdic" },
      { label: "Licenses", href: "/licenses" },
    ],
  };

  return (
    <footer className="w-full bg-gray-900 text-gray-400">

      {/* Top CTA banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Start banking smarter today.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Join over 50,000 Americans who trust Crownledger with their finances.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition"
            >
              Open Free Account
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold px-6 py-3 rounded-xl transition border border-gray-700"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-5 no-underline w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h20M6 20V10l6-7 6 7v10" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-[18px] font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Crownledger
                </span>
                <span
                  className="text-[9px] font-medium text-gray-500 tracking-[2px] uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Private Banking
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Modern private banking for everyone. Safe, fast, and built
              for the way Americans live and work today.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Twitter",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="lg:col-span-1">
              <h4
                className="text-sm font-semibold text-white mb-5 tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            © 2026 Crownledger Inc. All rights reserved. Deposits are FDIC insured up to $250,000.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-xs text-gray-600">All systems operational</p>
          </div>
        </div>
      </div>

    </footer>
  );
}