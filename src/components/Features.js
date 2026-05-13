"use client";

import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Features() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: grid1Ref, isVisible: grid1Visible } = useScrollAnimation();
  const { ref: grid2Ref, isVisible: grid2Visible } = useScrollAnimation();
  const { ref: grid3Ref, isVisible: grid3Visible } = useScrollAnimation();

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
        </svg>
      ),
      title: "Free Checking Account",
      desc: "No monthly fees, no minimums. Your checking account works for you, not against you.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "5.00% APY Savings",
      desc: "Earn 10x the national average with our high-yield savings account. Your money grows automatically.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      title: "Instant Transfers",
      desc: "Send money to anyone, anywhere in the US instantly. No delays, no waiting.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Bank-Grade Security",
      desc: "256-bit encryption, biometric login, and real-time fraud detection keep your money safe.",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
      title: "Virtual Debit Card",
      desc: "Get a virtual Visa debit card instantly. Shop online or in-store with Apple Pay and Google Pay.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Real-Time Tracking",
      desc: "See every transaction the moment it happens. Full visibility into your spending 24/7.",
      color: "bg-teal-50 text-teal-600",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-zoom ${titleVisible ? "visible" : ""}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Features</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Everything you need to bank smarter
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Crownledger packs all the features of a premium bank into one simple, beautiful app.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={i === 0 ? grid1Ref : i === 3 ? grid2Ref : i === 5 ? grid3Ref : null}
              className={`scroll-zoom ${
                i <= 2 ? (grid1Visible ? "visible" : "") :
                i <= 4 ? (grid2Visible ? "visible" : "") :
                (grid3Visible ? "visible" : "")
              } delay-${((i % 3) + 1) * 100}`}
            >
              <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-md hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3
                  className="text-lg font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}