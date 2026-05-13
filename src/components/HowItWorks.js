"use client";

import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function HowItWorks() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      desc: "Sign up in under 2 minutes with just your name, email, and phone number. No paperwork required.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Verify Your Identity",
      desc: "Quick identity verification to keep your account secure. Takes less than a minute.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Fund Your Account",
      desc: "Add money via bank transfer. Your funds are available immediately.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Start Banking",
      desc: "Send money, earn interest, manage your card, and track every transaction in real time.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  return (
    <section id="accounts" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-zoom ${titleVisible ? "visible" : ""}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">How It Works</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Up and running in minutes
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Opening a Crownledger account is the simplest thing you'll do today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const { ref, isVisible } = useScrollAnimation();
            return (
              <div
                key={i}
                ref={ref}
                className={`scroll-zoom ${isVisible ? "visible" : ""} delay-${(i + 1) * 100}`}
              >
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 relative">
                    {step.icon}
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-600 text-blue-600 text-[10px] font-black rounded-full flex items-center justify-center"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}