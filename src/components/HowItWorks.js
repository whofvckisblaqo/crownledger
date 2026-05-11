export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      desc: "Sign up with your name, email, and phone number. It takes less than 2 minutes to get started.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Verify Your Identity",
      desc: "Submit a government-issued ID and SSN last 4 digits. We verify your details securely within minutes.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Fund Your Account",
      desc: "Link your existing bank or deposit a check. Your funds are available instantly once confirmed.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <path d="M12 15v-2m0 0V11m0 2h2m-2 0H10" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Start Banking",
      desc: "Spend, save, transfer, and manage your money all from one clean and powerful dashboard.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Getting Started
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Up and running in minutes.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Opening a Crownledger account is fast, simple, and 100% online.
            No paperwork. No branch visits. No stress.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-blue-100 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-start gap-4">

              {/* Icon circle */}
              <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 relative">
                {step.icon}
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Text */}
              <div>
                <p className="text-xs font-semibold text-blue-400 mb-1 tracking-widest uppercase">
                  Step {step.number}
                </p>
                <h3
                  className="text-base font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-blue-600 rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Ready to take control of your finances?
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Join thousands of Americans already banking smarter with Crownledger.
            </p>
          </div>
          <a
            href="/signup"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition"
          >
            Open Free Account
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}