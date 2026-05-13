"use client";

import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Security() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation();

  const items = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "256-bit Encryption",
      desc: "Military-grade encryption protects every transaction and piece of data.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "FDIC Insured",
      desc: "Your deposits are insured up to $250,000 by the Federal Deposit Insurance Corporation.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      title: "Real-Time Fraud Detection",
      desc: "AI-powered fraud detection monitors every transaction 24/7 and alerts you instantly.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Biometric Authentication",
      desc: "Face ID and fingerprint login ensure only you can access your account.",
    },
  ];

  return (
    <section id="security" className="py-24 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-zoom ${titleVisible ? "visible" : ""}`}
        >
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Security</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Your security is our priority
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We use the same security technology as the world's largest banks to protect your money.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`scroll-zoom ${cardsVisible ? "visible" : ""} delay-${(i + 1) * 100}`}
            >
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 hover:bg-gray-750 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 text-white">
                  {item.icon}
                </div>
                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={badgeRef}
          className={`scroll-zoom ${badgeVisible ? "visible" : ""}`}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {["FDIC Insured", "PCI DSS Level 1", "SOC 2 Certified", "ISO 27001", "256-bit SSL"].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm text-gray-300 font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}