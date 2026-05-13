"use client";

import Link from "next/link";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Pricing() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      desc: "Perfect for getting started with modern banking.",
      features: [
        "Checking & savings accounts",
        "Virtual debit card",
        "10 free transfers/month",
        "5.00% APY on savings",
        "Basic transaction history",
        "Email support",
      ],
      cta: "Get Started Free",
      href: "/signup",
      highlight: false,
    },
    {
      name: "Premium",
      price: "$9",
      period: "/month",
      desc: "For individuals who want the full banking experience.",
      features: [
        "Everything in Free",
        "Unlimited transfers",
        "Physical debit card",
        "Priority support",
        "Advanced analytics",
        "No foreign transaction fees",
        "Cashback rewards",
        "30-day free trial",
      ],
      cta: "Start Free Trial",
      href: "/signup",
      highlight: true,
    },
    {
      name: "Business",
      price: "$29",
      period: "/month",
      desc: "For businesses and entrepreneurs who need more.",
      features: [
        "Everything in Premium",
        "Team sub-accounts",
        "Bulk payments",
        "Dedicated account manager",
        "API access",
        "Advanced reporting",
        "Custom spending limits",
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 scroll-zoom ${titleVisible ? "visible" : ""}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Pricing</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            No hidden fees. No surprises. Just honest banking at a fair price.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`scroll-zoom ${cardsVisible ? "visible" : ""} delay-${(i + 1) * 100}`}
            >
              <div className={`rounded-3xl p-8 h-full flex flex-col
                ${plan.highlight
                  ? "bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-105"
                  : "bg-gray-50 border border-gray-100"
                }`}
              >
                <div className="mb-6">
                  {plan.highlight && (
                    <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3
                    className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mb-6">
                  <span
                    className={`text-5xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke={plan.highlight ? "white" : "#16a34a"}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full text-center font-semibold text-sm py-3.5 rounded-xl transition
                    ${plan.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}