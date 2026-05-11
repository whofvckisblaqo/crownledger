export default function Security() {
  const badges = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "256-bit Encryption",
      desc: "All your data is encrypted end-to-end using military-grade AES-256 encryption.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Two-Factor Auth",
      desc: "Every login is protected with 2FA via SMS or authenticator app — no exceptions.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      title: "24/7 Fraud Detection",
      desc: "Our AI monitors every transaction in real time and flags suspicious activity instantly.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "FDIC Insured",
      desc: "Your deposits are insured up to $250,000 by the Federal Deposit Insurance Corporation.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Biometric Login",
      desc: "Log in with Face ID or fingerprint. Your identity stays yours — always.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Real-Time Alerts",
      desc: "Instant notifications for every transaction so you're always the first to know.",
    },
  ];

  return (
    <section id="security" className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top — two column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">

          {/* Left text */}
          <div className="flex-1 w-full">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
              Security First
            </p>
            <h2
              className="text-4xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Your money is safe. <br className="hidden sm:block" />
              We guarantee it.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Crownledger uses the same security infrastructure trusted by the
              world's top financial institutions. Your funds and data are
              protected around the clock — no compromises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                Open Free Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                Learn About Security
              </a>
            </div>
          </div>

          {/* Right — visual stat card */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Security Score
                  </p>
                  <p
                    className="text-4xl font-bold text-gray-900"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    99.9%
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>

              {[
                { label: "Encryption", value: "AES-256", color: "bg-blue-500" },
                { label: "Uptime", value: "99.99%", color: "bg-green-500" },
                { label: "Fraud blocked", value: "$0 lost", color: "bg-purple-500" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${stat.color}`} />
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                  <p
                    className="text-sm font-bold text-gray-900"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs text-gray-400 font-medium">
                    All systems operational
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom — security badges grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {badge.icon}
              </div>
              <div>
                <h3
                  className="text-sm font-semibold text-gray-900 mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}