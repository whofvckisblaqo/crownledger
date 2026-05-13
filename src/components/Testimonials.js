"use client";

import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Testimonials() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const testimonials = [
    {
      name: "Marcus Johnson",
      role: "Freelance Designer",
      initials: "MJ",
      color: "bg-blue-600",
      rating: 5,
      text: "Crownledger completely changed how I manage my money. The 5% APY on savings alone has made such a difference. I moved everything here from Chase.",
    },
    {
      name: "Sarah Williams",
      role: "Small Business Owner",
      initials: "SW",
      color: "bg-purple-600",
      rating: 5,
      text: "The instant transfers and zero fees are incredible. I use Crownledger for my entire business — payroll, expenses, everything. It just works.",
    },
    {
      name: "David Chen",
      role: "Software Engineer",
      initials: "DC",
      color: "bg-green-600",
      rating: 5,
      text: "Finally a bank that feels like it was built by people who actually use software. The UI is beautiful and everything works perfectly.",
    },
    {
      name: "Amara Okafor",
      role: "Graduate Student",
      initials: "AO",
      color: "bg-rose-500",
      rating: 5,
      text: "As a student, the free plan is perfect. No hidden fees, great savings rate, and the customer support actually responds within minutes.",
    },
    {
      name: "James Martinez",
      role: "Real Estate Agent",
      initials: "JM",
      color: "bg-amber-500",
      rating: 5,
      text: "I've tried every banking app out there. Crownledger is the only one that actually delivers on its promises. The security features alone are worth it.",
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director",
      initials: "LT",
      color: "bg-teal-600",
      rating: 5,
      text: "Switched from my traditional bank and haven't looked back. Everything is faster, cheaper, and the UI makes banking actually enjoyable.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-zoom ${titleVisible ? "visible" : ""}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Testimonials</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Loved by 50,000+ customers
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`scroll-zoom ${cardsVisible ? "visible" : ""} delay-${((i % 3) + 1) * 100}`}
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}