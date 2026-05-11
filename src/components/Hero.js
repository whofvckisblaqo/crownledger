import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full relative overflow-hidden min-h-[90vh] flex items-center">

      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30" />

      {/* Blue tint overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          {/* Left — Text */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Bank-Grade Security
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Banking Built for <br />
              <span className="text-blue-400">the Modern World</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              Crownledger gives you full control of your money — savings, checking,
              credit cards, and instant transfers. All in one place, all in real time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                Get Started — It's Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {[
                "FDIC Insured",
                "256-bit Encryption",
                "No Hidden Fees",
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Card Mockup */}
          <div className="flex-1 w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 space-y-5">

              {/* Balance */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/60 font-medium uppercase tracking-wide mb-1">
                    Total Balance
                  </p>
                  <p
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    $84,250.00
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">This month</p>
                  <p className="text-sm font-semibold text-green-400 mt-0.5">+$3,420.00</p>
                </div>
              </div>

              {/* Credit Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
                <div className="flex justify-between items-start mb-6">
                  <span
                    className="text-sm font-bold tracking-wide"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Crownledger
                  </span>
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-90" />
                </div>
                <p className="text-sm tracking-[3px] opacity-75 mb-3">•••• •••• •••• 4821</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">James Whitfield</p>
                  <p className="text-xs opacity-60">05 / 29</p>
                </div>
              </div>

              {/* Transactions */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">
                  Recent Transactions
                </p>
                {[
                  { name: "Apple Subscription", date: "Today, 9:14 AM", amount: "-$14.99", neg: true },
                  { name: "Direct Deposit", date: "Yesterday, 6:00 AM", amount: "+$5,200.00", neg: false },
                  { name: "Transfer to Sarah", date: "May 8, 2:32 PM", amount: "-$500.00", neg: true },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{tx.name}</p>
                      <p className="text-xs text-white/40">{tx.date}</p>
                    </div>
                    <p className={`text-sm font-semibold ${tx.neg ? "text-red-400" : "text-green-400"}`}>
                      {tx.amount}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}