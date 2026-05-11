export default function Features() {
  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Savings Account",
      desc: "Earn up to 5.00% APY on your savings. Set goals, automate deposits, and watch your money grow.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      title: "Checking Account",
      desc: "Your everyday account. Zero monthly fees, instant debit card, and unlimited free transactions.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      ),
      title: "Credit Card",
      desc: "Virtual and physical cards with real-time spending controls, cashback rewards, and zero foreign fees.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      title: "Instant Transfers",
      desc: "Send money to any US bank in seconds. No delays, no hidden fees, no limits on transfers.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: "Live Transactions",
      desc: "Get instant push notifications for every transaction. Always know exactly where your money is going.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Bank-Grade Security",
      desc: "256-bit encryption, biometric login, 2FA, and real-time fraud detection keep your funds safe 24/7.",
    },
  ];

  return (
    <section id="features" className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Everything You Need
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            One account. Every feature.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            From everyday spending to long-term savings, Crownledger covers every
            corner of your financial life — beautifully and securely.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3
                className="text-base font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}