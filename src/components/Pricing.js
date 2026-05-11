import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      desc: "Perfect for getting started with everyday banking.",
      cta: "Get Started Free",
      ctaLink: "/signup",
      featured: false,
      features: [
        "Checking account",
        "Virtual debit card",
        "10 free transfers/month",
        "Basic savings account",
        "Mobile & web app access",
        "Standard support",
      ],
      missing: [
        "High-yield savings",
        "Physical credit card",
        "Unlimited transfers",
        "Priority support",
      ],
    },
    {
      name: "Premium",
      price: "$9",
      period: "/month",
      desc: "For individuals who want the full Crownledger experience.",
      cta: "Get Premium",
      ctaLink: "/signup?plan=premium",
      featured: true,
      features: [
        "Everything in Free",
        "High-yield savings (5.00% APY)",
        "Physical credit card",
        "Unlimited transfers",
        "Cashback rewards",
        "Priority 24/7 support",
        "Spending analytics",
        "No foreign transaction fees",
      ],
      missing: [],
    },
    {
      name: "Business",
      price: "$29",
      period: "/month",
      desc: "Built for teams and businesses that move fast.",
      cta: "Contact Sales",
      ctaLink: "/contact",
      featured: false,
      features: [
        "Everything in Premium",
        "Team sub-accounts (up to 10)",
        "Bulk payment tools",
        "Business credit card",
        "Payroll integrations",
        "Dedicated account manager",
        "Custom spending limits",
        "Advanced reporting & exports",
      ],
      missing: [],
    },
  ];

  return (
    <section id="pricing" className="w-full bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Simple, transparent pricing.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            No hidden fees. No surprises. Pick the plan that works for you
            and upgrade or downgrade any time.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl border p-8 flex flex-col gap-6 transition-all duration-300
                ${plan.featured
                  ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-100"
                  : "bg-white border-gray-100 hover:shadow-md hover:border-blue-100"
                }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="bg-white text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name & desc */}
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-2
                    ${plan.featured ? "text-blue-200" : "text-blue-600"}`}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-3">
                  <span
                    className={`text-5xl font-bold leading-none
                      ${plan.featured ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.featured ? "text-blue-200" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.featured ? "text-blue-100" : "text-gray-500"}`}>
                  {plan.desc}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={plan.ctaLink}
                className={`w-full text-center text-sm font-semibold py-3.5 rounded-xl transition
                  ${plan.featured
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {plan.cta}
              </Link>

              {/* Divider */}
              <div className={`border-t ${plan.featured ? "border-blue-500" : "border-gray-100"}`} />

              {/* Features list */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                      ${plan.featured ? "bg-blue-500" : "bg-blue-50"}`}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke={plan.featured ? "#fff" : "#2563eb"}
                        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className={`text-sm leading-relaxed
                      ${plan.featured ? "text-blue-50" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}

                {/* Missing features — Free plan only */}
                {plan.missing.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 opacity-40">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-400 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-400 mt-10">
          All plans include a 30-day free trial. No credit card required to start.
          Cancel anytime.
        </p>

      </div>
    </section>
  );
}