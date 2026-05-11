"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = [
    { key: "all", label: "All" },
    { key: "accounts", label: "Accounts" },
    { key: "transfers", label: "Transfers" },
    { key: "security", label: "Security" },
    { key: "billing", label: "Billing" },
    { key: "cards", label: "Cards" },
  ];

  const faqs = [
    {
      category: "accounts",
      q: "How do I open a Crownledger account?",
      a: "Click 'Get Started' on our homepage, enter your name, email, and phone number, set a password, and verify your email with the OTP we send you. The whole process takes under 2 minutes.",
    },
    {
      category: "accounts",
      q: "What documents do I need to open an account?",
      a: "For a basic account, you only need your name, email address, and phone number. For full verification and higher limits, you'll need a government-issued ID.",
    },
    {
      category: "accounts",
      q: "Can I have both a checking and savings account?",
      a: "Yes! Every Crownledger account automatically includes both a checking account for everyday spending and a high-yield savings account earning 5.00% APY.",
    },
    {
      category: "accounts",
      q: "How do I close my account?",
      a: "You can request account closure by contacting our support team. Please note that you must withdraw all funds before your account can be closed.",
    },
    {
      category: "transfers",
      q: "How long do transfers take?",
      a: "Internal transfers between Crownledger accounts are instant. External transfers to other US banks typically take 1–2 business days depending on the receiving bank.",
    },
    {
      category: "transfers",
      q: "Is there a limit on how much I can transfer?",
      a: "Free plan users can make up to 10 free transfers per month. Premium and Business plan users have unlimited transfers with no monthly cap.",
    },
    {
      category: "transfers",
      q: "Are there fees for transfers?",
      a: "No. Crownledger never charges fees for transfers between accounts. External transfers are also free on all plans.",
    },
    {
      category: "transfers",
      q: "Can I send money internationally?",
      a: "Currently Crownledger supports US domestic transfers only. International transfers are on our roadmap and coming soon.",
    },
    {
      category: "security",
      q: "Is my money FDIC insured?",
      a: "Yes. All deposits at Crownledger are FDIC insured up to $250,000 per depositor, per account category — the same protection offered by major banks.",
    },
    {
      category: "security",
      q: "How does Crownledger protect my account?",
      a: "We use 256-bit AES encryption, two-factor authentication, real-time fraud detection, and biometric login to keep your account and funds secure 24/7.",
    },
    {
      category: "security",
      q: "What should I do if I suspect fraud?",
      a: "Contact us immediately at support@crownledgerapp.com or call +1 (800) 276-9654. You can also lock your card instantly from within the app.",
    },
    {
      category: "security",
      q: "How do I enable two-factor authentication?",
      a: "Go to your Dashboard → Settings → Security → Two-Factor Authentication and follow the setup steps. We strongly recommend enabling 2FA for all accounts.",
    },
    {
      category: "billing",
      q: "What are the pricing plans?",
      a: "We offer three plans: Free ($0/month), Premium ($9/month), and Business ($29/month). All plans include checking and savings accounts with no hidden fees.",
    },
    {
      category: "billing",
      q: "Can I upgrade or downgrade my plan?",
      a: "Yes. You can change your plan at any time from your Dashboard → Settings → Preferences. Changes take effect at your next billing cycle.",
    },
    {
      category: "billing",
      q: "Is there a free trial?",
      a: "Yes. All paid plans come with a 30-day free trial. No credit card is required to start — you can upgrade anytime during or after the trial.",
    },
    {
      category: "billing",
      q: "How do I cancel my subscription?",
      a: "You can cancel anytime from Settings → Preferences. Your account will revert to the Free plan at the end of your current billing period.",
    },
    {
      category: "cards",
      q: "What type of card does Crownledger offer?",
      a: "Every account comes with a virtual Visa debit card immediately upon signup. Physical cards are available on Premium and Business plans.",
    },
    {
      category: "cards",
      q: "How do I freeze my card?",
      a: "Go to Dashboard → Credit Card → Lock Card. Your card will be frozen instantly and can be unlocked at any time from the same screen.",
    },
    {
      category: "cards",
      q: "Are there foreign transaction fees?",
      a: "Premium and Business plan members enjoy zero foreign transaction fees. Free plan members are charged a 1% fee on international transactions.",
    },
    {
      category: "cards",
      q: "Do I earn cashback on my card?",
      a: "Yes! Premium and Business plan members earn cashback on eligible purchases. Cashback rates vary by merchant category.",
    },
  ];

  const filtered = faqs.filter((f) => {
    const matchesCategory = activeCategory === "all" || f.category === activeCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Help Center</p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              Find answers to the most common questions about Crownledger.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition
                    ${activeCategory === cat.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQs */}
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No results found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search term or category</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-gray-50 rounded-2xl border border-gray-100 group overflow-hidden hover:border-blue-100 transition"
                  >
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize flex-shrink-0
                          ${faq.category === "accounts" ? "bg-blue-100 text-blue-600"
                            : faq.category === "transfers" ? "bg-green-100 text-green-600"
                            : faq.category === "security" ? "bg-purple-100 text-purple-600"
                            : faq.category === "billing" ? "bg-amber-100 text-amber-600"
                            : "bg-rose-100 text-rose-600"
                          }`}>
                          {faq.category}
                        </span>
                        <span
                          className="text-sm font-semibold text-gray-900"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {faq.q}
                        </span>
                      </div>
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            )}

            {/* Still need help */}
            <div className="mt-12 bg-blue-600 rounded-3xl p-8 text-center text-white">
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Still have questions?
              </h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Can't find what you're looking for? Our support team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition"
                >
                  Contact Support
                </Link>
                <a
                  href="mailto:support@crownledgerapp.com"
                  className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-800 transition border border-blue-500"
                >
                  Email Us
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}