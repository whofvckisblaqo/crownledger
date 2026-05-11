export default function Testimonials() {
  const testimonials = [
    {
      name: "James Whitfield",
      role: "Entrepreneur, New York",
      initials: "JW",
      color: "bg-blue-600",
      rating: 5,
      text: "Crownledger completely changed how I manage my business finances. The dashboard is clean, transfers are instant, and I love the spending analytics. Best banking app I've ever used.",
    },
    {
      name: "Sarah Mitchell",
      role: "Software Engineer, Austin",
      initials: "SM",
      color: "bg-purple-600",
      rating: 5,
      text: "I switched from my traditional bank and never looked back. The 5% APY on savings alone paid for the Premium plan ten times over. The app is incredibly intuitive too.",
    },
    {
      name: "David Okafor",
      role: "Freelancer, Chicago",
      initials: "DO",
      color: "bg-teal-600",
      rating: 5,
      text: "As a freelancer, getting paid and managing expenses used to be a headache. Crownledger made it seamless. Real-time notifications keep me on top of every dollar.",
    },
    {
      name: "Rachel Thompson",
      role: "Marketing Director, LA",
      initials: "RT",
      color: "bg-rose-500",
      rating: 5,
      text: "The credit card rewards are genuinely great. Cashback on every purchase and zero foreign transaction fees — I use it for all my travel. Customer support is also top notch.",
    },
    {
      name: "Michael Chen",
      role: "Business Owner, Seattle",
      initials: "MC",
      color: "bg-amber-500",
      rating: 5,
      text: "The Business plan is a game changer. Bulk payments, team sub-accounts, and a dedicated account manager. My entire team is on Crownledger now. Worth every penny.",
    },
    {
      name: "Olivia Harris",
      role: "Student, Boston",
      initials: "OH",
      color: "bg-green-600",
      rating: 5,
      text: "Started with the Free plan and it already does everything I need. No fees, instant transfers to friends, and a virtual card for online shopping. Honestly perfect for students.",
    },
  ];

  return (
    <section id="testimonials" className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Loved by thousands of Americans.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our customers
            have to say about banking with Crownledger.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "4.9★", label: "App Store Rating" },
            { value: "$2B+", label: "Transactions Processed" },
            { value: "99.9%", label: "Uptime Guaranteed" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
            >
              <p
                className="text-3xl font-bold text-blue-600 mb-1"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md hover:border-blue-100 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}