import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FDIC Disclosure — Crownledger",
  description: "Important FDIC insurance information and disclosures for Crownledger customers.",
};

export default function FDICPage() {
  const faqs = [
    {
      q: "What is FDIC insurance?",
      a: "The Federal Deposit Insurance Corporation (FDIC) is an independent agency of the United States government that protects depositors against the loss of their deposits if an FDIC-insured bank fails. FDIC insurance is backed by the full faith and credit of the United States government.",
    },
    {
      q: "How much of my money is protected?",
      a: "FDIC insurance covers deposits up to $250,000 per depositor, per insured bank, for each account ownership category. This means if you have a checking account and a savings account at Crownledger, each is insured up to $250,000 separately.",
    },
    {
      q: "What types of accounts are covered?",
      a: "FDIC insurance covers checking accounts, savings accounts, money market deposit accounts, and certificates of deposit (CDs). It does not cover investment products such as stocks, bonds, mutual funds, or cryptocurrency.",
    },
    {
      q: "What happens if Crownledger fails?",
      a: "In the unlikely event that Crownledger were to fail, the FDIC would step in to protect your deposits up to the applicable limits. You would typically have access to your insured funds within a few business days.",
    },
    {
      q: "Is my money safe above $250,000?",
      a: "Deposits above $250,000 are not covered by FDIC insurance. If you have more than $250,000 to deposit, we recommend spreading your funds across multiple FDIC-insured institutions or account ownership categories to maximize coverage.",
    },
    {
      q: "How do I verify Crownledger is FDIC insured?",
      a: "You can verify any bank's FDIC insurance status by visiting the FDIC's official website at fdic.gov and using their BankFind tool. Look for the official FDIC logo on our website and mobile app.",
    },
  ];

  const coverageTypes = [
    {
      type: "Single Accounts",
      limit: "$250,000",
      desc: "Accounts owned by one person with no beneficiaries",
      covered: true,
    },
    {
      type: "Joint Accounts",
      limit: "$250,000 per owner",
      desc: "Accounts owned by two or more people",
      covered: true,
    },
    {
      type: "Checking Accounts",
      limit: "$250,000",
      desc: "Standard checking and demand deposit accounts",
      covered: true,
    },
    {
      type: "Savings Accounts",
      limit: "$250,000",
      desc: "High-yield savings and standard savings accounts",
      covered: true,
    },
    {
      type: "Stocks & Bonds",
      limit: "Not Covered",
      desc: "Investment products are not FDIC insured",
      covered: false,
    },
    {
      type: "Cryptocurrency",
      limit: "Not Covered",
      desc: "Digital assets are not FDIC insured",
      covered: false,
    },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Legal & Regulatory
            </p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              FDIC Insurance <span className="text-blue-600">Disclosure</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-6">
              Your deposits at Crownledger are insured by the Federal Deposit
              Insurance Corporation up to the applicable limits.
            </p>

            {/* FDIC badge */}
            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-100 px-6 py-3 rounded-2xl">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-green-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  FDIC Member
                </p>
                <p className="text-xs text-green-600">Deposits insured up to $250,000</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">Last updated: May 11, 2026</p>
          </div>
        </section>

        {/* Official notice */}
        <section className="py-10 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Official FDIC Notice
                </p>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Crownledger Inc. is a member of the Federal Deposit Insurance Corporation (FDIC).
                  Deposits held at Crownledger are insured by the FDIC up to $250,000 per depositor,
                  per insured bank, for each account ownership category, as permitted by law.
                  FDIC insurance is backed by the full faith and credit of the United States government.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage table */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Coverage Details
              </p>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                What is and isn't covered
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["Account Type", "Coverage Limit", "Description", "Status"].map((h) => (
                        <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {coverageTypes.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            {item.type}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className={`text-sm font-bold whitespace-nowrap ${item.covered ? "text-green-600" : "text-red-500"}`}>
                            {item.limit}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg
                            ${item.covered ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.covered ? "bg-green-500" : "bg-red-500"}`} />
                            {item.covered ? "Covered" : "Not Covered"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                How It Works
              </p>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Understanding FDIC protection
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  step: "01",
                  title: "You Deposit Money",
                  desc: "You open a checking or savings account at Crownledger and deposit your funds.",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "FDIC Covers Your Funds",
                  desc: "Your deposits are automatically insured by the FDIC up to $250,000 at no cost to you.",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Your Money is Safe",
                  desc: "Even in the unlikely event of a bank failure, your insured deposits are fully protected.",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 relative">
                    {item.icon}
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-600 text-blue-600 text-[10px] font-bold rounded-full flex items-center justify-center"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3
                    className="text-sm font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Important notice */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-yellow-800 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Important Notice
                  </p>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    FDIC insurance does not protect against losses due to market fluctuations, fraud committed by account holders, or deposits that exceed the $250,000 limit. Investment products including stocks, bonds, and cryptocurrencies are NOT FDIC insured and may lose value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                FAQs
              </p>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Common questions about FDIC insurance
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 group overflow-hidden hover:border-blue-100 transition"
                >
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                    <span
                      className="text-sm font-semibold text-gray-900 pr-4"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="flex-shrink-0 transition-transform group-open:rotate-180"
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
          </div>
        </section>

        {/* Legal disclaimer */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Legal Disclaimer
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Crownledger Inc. is an FDIC-insured institution. Deposits are insured by the FDIC up to $250,000 per depositor, per insured bank, for each account ownership category. FDIC insurance is subject to the terms and conditions of the Federal Deposit Insurance Act and FDIC regulations.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                This disclosure is provided for informational purposes only and does not constitute legal or financial advice. For complete information about FDIC insurance coverage, please visit the FDIC website at{" "}
                <a href="https://www.fdic.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  www.fdic.gov
                </a>
                {" "}or call 1-877-ASK-FDIC (1-877-275-3342).
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Investment products including securities, mutual funds, stocks, bonds, and cryptocurrency are NOT deposits, are NOT insured by the FDIC, are NOT guaranteed by the bank, and MAY lose value.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-blue-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Have questions about your coverage?
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Our team is available 24/7 to answer any questions about
              FDIC insurance and how it protects your deposits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition"
              >
                Contact Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://www.fdic.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition border border-blue-500"
              >
                Visit FDIC.gov
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}