import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Careers — Crownledger",
  description: "Join the Crownledger team and help build the future of banking.",
};

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote, US",
      type: "Full-time",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Compliance Officer",
      department: "Legal & Compliance",
      location: "New York, NY",
      type: "Full-time",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Remote, US",
      type: "Full-time",
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      color: "bg-rose-50 text-rose-600",
    },
    {
      title: "Data Analyst",
      department: "Data",
      location: "Remote, US",
      type: "Full-time",
      color: "bg-teal-50 text-teal-600",
    },
    {
      title: "Fraud & Risk Analyst",
      department: "Security",
      location: "New York, NY",
      type: "Full-time",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "iOS Engineer",
      department: "Engineering",
      location: "Remote, US",
      type: "Full-time",
      color: "bg-blue-50 text-blue-600",
    },
  ];

  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Competitive Salary",
      desc: "Top-of-market compensation with equity packages for all full-time employees.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: "Health & Wellness",
      desc: "Full medical, dental, and vision coverage for you and your dependents.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Remote Friendly",
      desc: "Flexible remote and hybrid work options for most roles across the US.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      title: "Learning Budget",
      desc: "$2,000 annual budget for courses, books, conferences, and certifications.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Unlimited PTO",
      desc: "We trust our team to manage their time. Take the time off you need.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Team Culture",
      desc: "Quarterly offsites, team lunches, and a culture built on trust and inclusion.",
    },
  ];

  const values = [
    { emoji: "🚀", title: "Move Fast", desc: "We ship quickly and learn from real users." },
    { emoji: "🤝", title: "Trust & Transparency", desc: "We are open, honest, and accountable." },
    { emoji: "💡", title: "Think Big", desc: "We solve hard problems that matter." },
    { emoji: "❤️", title: "Customer First", desc: "Every decision starts with the customer." },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              We're Hiring
            </p>
            <h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Build the future of <br />
              <span className="text-blue-600">banking with us.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              We're a team of passionate people on a mission to make banking
              better for everyone. Come build something that matters.
            </p>
            <a
              href="#openings"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition"
            >
              View Open Positions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Values</p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                What we stand for
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-blue-50/50 transition">
                  <div className="text-4xl mb-3">{v.emoji}</div>
                  <h3
                    className="text-sm font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Perks & Benefits</p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                We take care of our people
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-blue-100 transition group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                    {b.icon}
                  </div>
                  <h3
                    className="text-sm font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open positions */}
        <section id="openings" className="py-16 px-6 bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Open Roles</p>
              <h2
                className="text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Current openings
              </h2>
              <p className="text-gray-500">
                Don't see a role that fits? Email us at{" "}
                <a href="mailto:careers@crownledgerapp.com" className="text-blue-600 hover:underline">
                  careers@crownledgerapp.com
                </a>
              </p>
            </div>

            <div className="space-y-3">
              {openings.map((job, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:bg-blue-50/20 transition group cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div>
                        <h3
                          className="text-base font-bold text-gray-900 mb-1"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${job.color}`}>
                            {job.department}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="text-xs text-gray-400">{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Apply Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
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
              Ready to make an impact?
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join a team that's redefining what banking can be. We can't wait to meet you.
            </p>
            <a
              href="mailto:careers@crownledgerapp.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-50 transition"
            >
              Send Your Resume
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}