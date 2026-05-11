import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — Crownledger",
  description: "Insights, news, and financial tips from the Crownledger team.",
};

export default function BlogPage() {
  const featured = {
    title: "How High-Yield Savings Accounts Are Changing Personal Finance in 2026",
    excerpt: "With interest rates at historic highs, savvy Americans are ditching traditional savings accounts for high-yield alternatives. Here's everything you need to know.",
    category: "Savings",
    author: "Sarah Mitchell",
    initials: "SM",
    color: "bg-purple-600",
    date: "May 10, 2026",
    readTime: "6 min read",
    slug: "high-yield-savings-2026",
  };

  const posts = [
    {
      title: "5 Ways to Build an Emergency Fund Faster",
      excerpt: "An emergency fund is the foundation of financial security. Here are five proven strategies to build yours faster than you thought possible.",
      category: "Personal Finance",
      author: "James Whitfield",
      initials: "JW",
      color: "bg-blue-600",
      date: "May 8, 2026",
      readTime: "4 min read",
      slug: "emergency-fund-tips",
    },
    {
      title: "Understanding Credit Scores: A Complete Guide",
      excerpt: "Your credit score affects everything from loan rates to housing applications. Learn how it's calculated and how to improve it starting today.",
      category: "Credit",
      author: "Rachel Thompson",
      initials: "RT",
      color: "bg-rose-500",
      date: "May 5, 2026",
      readTime: "7 min read",
      slug: "credit-score-guide",
    },
    {
      title: "The Future of Digital Banking: What to Expect",
      excerpt: "From AI-powered financial advice to real-time payments — digital banking is evolving fast. Here's what the next 5 years look like.",
      category: "Industry",
      author: "Michael Chen",
      initials: "MC",
      color: "bg-amber-500",
      date: "May 2, 2026",
      readTime: "5 min read",
      slug: "future-of-digital-banking",
    },
    {
      title: "How to Protect Yourself from Banking Fraud",
      excerpt: "Fraud attempts are on the rise. Learn the warning signs, best practices, and tools to keep your money safe from bad actors.",
      category: "Security",
      author: "Michael Chen",
      initials: "MC",
      color: "bg-amber-500",
      date: "Apr 28, 2026",
      readTime: "5 min read",
      slug: "banking-fraud-protection",
    },
    {
      title: "Checking vs Savings: Which Account Is Right for You?",
      excerpt: "Both accounts serve different purposes. Understanding the key differences helps you make smarter decisions about where to keep your money.",
      category: "Accounts",
      author: "Olivia Harris",
      initials: "OH",
      color: "bg-teal-600",
      date: "Apr 24, 2026",
      readTime: "4 min read",
      slug: "checking-vs-savings",
    },
    {
      title: "Budgeting 101: The 50/30/20 Rule Explained",
      excerpt: "The 50/30/20 rule is one of the simplest and most effective budgeting frameworks. Here's how to apply it to your own finances.",
      category: "Budgeting",
      author: "James Whitfield",
      initials: "JW",
      color: "bg-blue-600",
      date: "Apr 20, 2026",
      readTime: "3 min read",
      slug: "50-30-20-rule",
    },
    {
      title: "What FDIC Insurance Means for Your Money",
      excerpt: "FDIC insurance protects your deposits up to $250,000. Here's exactly what that means, what it covers, and why it matters.",
      category: "Banking Basics",
      author: "David Okafor",
      initials: "DO",
      color: "bg-green-600",
      date: "Apr 15, 2026",
      readTime: "4 min read",
      slug: "fdic-insurance-explained",
    },
    {
      title: "How to Send Money Safely: A Step-by-Step Guide",
      excerpt: "Sending money should be simple and secure. Here's everything you need to know about ACH transfers, wire transfers, and instant payments.",
      category: "Transfers",
      author: "Olivia Harris",
      initials: "OH",
      color: "bg-teal-600",
      date: "Apr 10, 2026",
      readTime: "5 min read",
      slug: "how-to-send-money",
    },
  ];

  const categories = [
    "All",
    "Savings",
    "Personal Finance",
    "Credit",
    "Security",
    "Banking Basics",
    "Industry",
    "Budgeting",
    "Transfers",
    "Accounts",
  ];

  const categoryColors = {
    Savings: "bg-green-50 text-green-600",
    "Personal Finance": "bg-blue-50 text-blue-600",
    Credit: "bg-purple-50 text-purple-600",
    Security: "bg-red-50 text-red-500",
    "Banking Basics": "bg-amber-50 text-amber-600",
    Industry: "bg-indigo-50 text-indigo-600",
    Budgeting: "bg-teal-50 text-teal-600",
    Transfers: "bg-cyan-50 text-cyan-600",
    Accounts: "bg-rose-50 text-rose-500",
  };

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Crownledger Blog
            </p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Financial insights for <span className="text-blue-600">modern life.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Tips, guides, and news to help you make smarter decisions
              with your money — written by our team of financial experts.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-6">
              Featured Article
            </p>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-white">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {featured.category}
                  </span>
                  <h2
                    className="text-3xl font-bold mb-4 leading-tight"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-blue-100 text-base leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${featured.color} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{featured.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{featured.author}</p>
                        <p className="text-xs text-blue-200">{featured.date} · {featured.readTime}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition"
                    >
                      Read Article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All posts */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap
                    ${i === 0
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link
                  key={i}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-100 transition group"
                >
                  {/* Color bar */}
                  <div className={`h-1.5 w-full ${post.color}`} />

                  <div className="p-5">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-3 ${categoryColors[post.category] || "bg-gray-50 text-gray-500"}`}>
                      {post.category}
                    </span>

                    <h3
                      className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full ${post.color} flex items-center justify-center`}>
                          <span className="text-white text-[10px] font-bold">{post.initials}</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{post.author}</p>
                          <p className="text-xs text-gray-400">{post.date}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load more */}
            <div className="text-center mt-10">
              <button
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 font-semibold text-sm px-6 py-3 rounded-xl transition"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Load More Articles
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h2
              className="text-3xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Stay in the loop
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Get our best financial tips and product updates delivered
              straight to your inbox. No spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition whitespace-nowrap"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Join 10,000+ readers. Unsubscribe anytime.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}