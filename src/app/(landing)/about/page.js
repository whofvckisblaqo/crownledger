import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us — Crownledger Private Banking",
  description: "Learn about Crownledger, our mission, team, and values.",
};

export default function AboutPage() {
  const team = [
    {
      name: "James Whitfield",
      role: "Chief Executive Officer",
      initials: "JW",
      color: "bg-blue-600",
      bio: "Former Goldman Sachs VP with 15+ years in fintech and digital banking innovation.",
    },
    {
      name: "Sarah Mitchell",
      role: "Chief Technology Officer",
      initials: "SM",
      color: "bg-purple-600",
      bio: "Ex-Google engineer who led payment infrastructure at scale for 200M+ users.",
    },
    {
      name: "David Okafor",
      role: "Chief Financial Officer",
      initials: "DO",
      color: "bg-green-600",
      bio: "CPA and MBA from Wharton with deep expertise in banking regulation and compliance.",
    },
    {
      name: "Rachel Thompson",
      role: "Chief Product Officer",
      initials: "RT",
      color: "bg-rose-500",
      bio: "Previously led product at Robinhood and Chime, obsessed with user-first banking.",
    },
    {
      name: "Michael Chen",
      role: "Head of Security",
      initials: "MC",
      color: "bg-amber-500",
      bio: "Cybersecurity expert with background in FDIC compliance and fraud prevention.",
    },
    {
      name: "Olivia Harris",
      role: "Head of Customer Experience",
      initials: "OH",
      color: "bg-teal-600",
      bio: "Dedicated to making banking feel human again with world-class support systems.",
    },
  ];

  const values = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Trust First",
      desc: "We earn trust through transparency, reliability, and putting your interests ahead of ours — always.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      title: "Inclusive Banking",
      desc: "Banking should work for everyone. We build products that are accessible, affordable, and fair.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: "Built for Speed",
      desc: "Money should move at the speed of life. We obsess over making every transaction instant.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "People Over Profit",
      desc: "We measure success by how much we improve our customers' financial lives, not just our bottom line.",
    },
  ];

  const milestones = [
    { year: "2020", title: "Founded", desc: "Crownledger was founded in New York with a vision to modernize private banking for everyone." },
    { year: "2021", title: "First 10,000 Users", desc: "Crossed 10,000 active users within 6 months of launch with zero marketing spend." },
    { year: "2022", title: "Series A — $12M", desc: "Raised $12M in Series A funding to expand our engineering and compliance teams." },
    { year: "2023", title: "FDIC Insured", desc: "Received full FDIC insurance certification, protecting all deposits up to $250,000." },
    { year: "2024", title: "50,000 Users", desc: "Reached 50,000 active users and launched our Premium and Business plan tiers." },
    { year: "2026", title: "Today", desc: "Continuing to build the future of banking — simpler, faster, and more human than ever." },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">About Crownledger</p>
            <h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Banking that puts <br />
              <span className="text-blue-600">people first.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Crownledger was built on a simple belief — that everyone deserves
              access to world-class banking. No hidden fees, no confusing terms,
              no compromises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                Open Free Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 text-sm font-semibold px-6 py-3.5 rounded-xl transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "$2B+", label: "Transactions Processed" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "App Rating" },
            ].map((stat, i) => (
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

        {/* Mission */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Mission</p>
              <h2
                className="text-4xl font-bold text-gray-900 mb-5 leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Democratizing private banking for the modern world.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                For too long, premium banking has been reserved for the wealthy few.
                Crownledger is changing that. We built a full-featured private banking
                experience that anyone can access — from the student opening their
                first account to the entrepreneur scaling their business.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                We believe that financial freedom starts with financial clarity.
                That's why we obsess over transparency, simplicity, and putting
                real money-saving tools in the hands of everyday Americans.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {values.map((val, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-100 transition group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
                    {val.icon}
                  </div>
                  <h3
                    className="text-sm font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Journey</p>
              <h2
                className="text-4xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                How we got here.
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-100 hidden md:block" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center relative z-10">
                      <span
                        className="text-white text-xs font-bold text-center leading-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {m.year}
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-2xl p-5 hover:bg-blue-50/30 transition">
                      <h3
                        className="text-base font-bold text-gray-900 mb-1"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Team</p>
              <h2
                className="text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                The people behind Crownledger.
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                We're a team of bankers, engineers, designers, and dreamers united by
                a shared mission to make banking better for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md hover:border-blue-100 transition"
                >
                  <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-xl font-bold">{member.initials}</span>
                  </div>
                  <h3
                    className="text-base font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue-600">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Ready to experience banking done right?
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join over 50,000 Americans who trust Crownledger with their finances.
              Open your free account in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition"
              >
                Get Started — Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition border border-blue-500"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}