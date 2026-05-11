import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Press — Crownledger",
  description: "News, press releases, and media resources from Crownledger.",
};

export default function PressPage() {
  const news = [
    {
      publication: "TechCrunch",
      logo: "TC",
      color: "bg-green-600",
      title: "Crownledger Raises $12M Series A to Democratize Private Banking",
      excerpt: "The New York-based fintech startup is taking on traditional banks with a full-featured digital banking platform that offers premium features at no cost.",
      date: "March 15, 2026",
      href: "#",
    },
    {
      publication: "Forbes",
      logo: "F",
      color: "bg-red-600",
      title: "30 Under 30: The Founders Reinventing How Americans Bank",
      excerpt: "Crownledger co-founders James Whitfield and Sarah Mitchell are among this year's most impressive fintech entrepreneurs reshaping the banking industry.",
      date: "February 28, 2026",
      href: "#",
    },
    {
      publication: "The Wall Street Journal",
      logo: "WSJ",
      color: "bg-blue-800",
      title: "Digital Banks Are Winning Over Millennials With Zero-Fee Models",
      excerpt: "Crownledger is one of several challenger banks that have gained significant traction by eliminating the fees that plague traditional banking.",
      date: "January 20, 2026",
      href: "#",
    },
    {
      publication: "Bloomberg",
      logo: "B",
      color: "bg-gray-900",
      title: "Crownledger Reaches 50,000 Users — A Milestone for Challenger Banks",
      excerpt: "The digital banking startup has hit a major growth milestone, processing over $2 billion in transactions since its launch in 2020.",
      date: "December 10, 2025",
      href: "#",
    },
    {
      publication: "Business Insider",
      logo: "BI",
      color: "bg-blue-600",
      title: "We Tested 10 Digital Banks. Crownledger Came Out on Top.",
      excerpt: "In our comprehensive review of digital banking platforms, Crownledger stood out for its clean interface, competitive rates, and exceptional customer support.",
      date: "November 5, 2025",
      href: "#",
    },
    {
      publication: "CNBC",
      logo: "C",
      color: "bg-blue-500",
      title: "The Fintech Startups That Are Actually Disrupting Banking in 2025",
      excerpt: "While many fintech startups have struggled to gain traction, Crownledger has found a formula that works — combining premium features with zero fees.",
      date: "October 15, 2025",
      href: "#",
    },
  ];

  const pressReleases = [
    {
      title: "Crownledger Launches Business Banking Suite for Small Businesses",
      date: "April 30, 2026",
      category: "Product Launch",
    },
    {
      title: "Crownledger Achieves Full FDIC Insurance Certification",
      date: "March 1, 2026",
      category: "Regulatory",
    },
    {
      title: "Crownledger Announces $12M Series A Funding Round",
      date: "February 15, 2026",
      category: "Funding",
    },
    {
      title: "Crownledger Reaches 50,000 Active Users Milestone",
      date: "January 10, 2026",
      category: "Growth",
    },
    {
      title: "Crownledger Introduces High-Yield Savings at 5.00% APY",
      date: "December 1, 2025",
      category: "Product Launch",
    },
    {
      title: "Crownledger Partners with Visa for Physical Card Program",
      date: "October 20, 2025",
      category: "Partnership",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "$2B+", label: "Transactions Processed" },
    { value: "$12M", label: "Raised in Series A" },
    { value: "2020", label: "Year Founded" },
  ];

  const categoryColors = {
    "Product Launch": "bg-blue-50 text-blue-600",
    Regulatory: "bg-green-50 text-green-600",
    Funding: "bg-purple-50 text-purple-600",
    Growth: "bg-amber-50 text-amber-600",
    Partnership: "bg-teal-50 text-teal-600",
  };

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Press Room
            </p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Crownledger in <span className="text-blue-600">the news.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
              Read the latest news, press releases, and media coverage about
              Crownledger and our mission to modernize banking.
            </p>
            <a
              href="mailto:press@crownledgerapp.com"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition"
            >
              Media Inquiries
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 px-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-4xl font-bold text-blue-600 mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* News coverage */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Media Coverage
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                What people are saying
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-100 transition group flex flex-col gap-4"
                >
                  {/* Publication */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{item.logo}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.publication}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Read more */}
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
                    Read Article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Press releases */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Official Announcements
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Press releases
              </h2>
            </div>

            <div className="space-y-3">
              {pressReleases.map((pr, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-blue-100 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ${categoryColors[pr.category] || "bg-gray-50 text-gray-500"}`}>
                      {pr.category}
                    </span>
                    <h3
                      className="text-sm font-semibold text-gray-900"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {pr.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <p className="text-xs text-gray-400">{pr.date}</p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media kit */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Media Resources
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Media kit
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Brand Assets",
                  desc: "Logos, colors, typography, and brand guidelines for press use.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  ),
                },
                {
                  title: "Company Photos",
                  desc: "High-resolution photos of our team, office, and events for editorial use.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  ),
                },
                {
                  title: "Fact Sheet",
                  desc: "Key facts, statistics, and company information for journalists.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:bg-blue-50/20 transition group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                    {item.icon}
                  </div>
                  <h3
                    className="text-sm font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                    Download
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-blue-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Media inquiries
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              For press inquiries, interview requests, or media resources,
              please contact our communications team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:press@crownledgerapp.com"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition"
              >
                press@crownledgerapp.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition border border-blue-500"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}