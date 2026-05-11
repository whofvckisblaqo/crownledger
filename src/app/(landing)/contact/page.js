"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const contacts = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "Email Us",
      value: "support@crownledgerapp.com",
      sub: "We reply within 24 hours",
      href: "mailto:support@crownledgerapp.com",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: "Call Us",
      value: "+1 (800) 276-9654",
      sub: "Mon–Fri, 9am–6pm EST",
      href: "tel:+18002769654",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "Live Chat",
      value: "Chat with our team",
      sub: "Available 24/7",
      href: "#",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Visit Us",
      value: "123 Wall Street, New York",
      sub: "NY 10005, United States",
      href: "#",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Account Support",
    "Technical Issue",
    "Billing Question",
    "Partnership",
    "Press & Media",
    "Other",
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Contact Us
            </p>
            <h1
              className="text-5xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              We'd love to <span className="text-blue-600">hear from you.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Whether you have a question about your account, need help with a
              transfer, or just want to say hello — our team is always here.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:bg-blue-50/30 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
                  {c.icon}
                </div>
                <h3
                  className="text-sm font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {c.title}
                </h3>
                <p className="text-sm font-medium text-blue-600 mb-1">{c.value}</p>
                <p className="text-xs text-gray-400">{c.sub}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Form + FAQ */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form */}
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Send us a message
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Fill out the form and we'll get back to you within 24 hours.
              </p>

              {success ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSuccess(false); setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="James"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Whitfield"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="james@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Frequently asked questions
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Can't find what you're looking for? Send us a message.
              </p>

              <div className="space-y-3">
                {[
                  {
                    q: "How do I open a Crownledger account?",
                    a: "Simply click 'Get Started' on our homepage, fill in your details, verify your email, and you're ready to go. The whole process takes under 2 minutes.",
                  },
                  {
                    q: "Is my money FDIC insured?",
                    a: "Yes. All deposits at Crownledger are FDIC insured up to $250,000 per depositor, per account category.",
                  },
                  {
                    q: "How long do transfers take?",
                    a: "Internal transfers between Crownledger accounts are instant. External transfers to other US banks typically take 1–2 business days.",
                  },
                  {
                    q: "What are your fees?",
                    a: "Our Free plan has zero monthly fees. Premium is $9/month and Business is $29/month. We never charge hidden fees.",
                  },
                  {
                    q: "How do I contact customer support?",
                    a: "You can reach us by email at support@crownledgerapp.com, by phone at +1 (800) 276-9654, or via live chat 24/7.",
                  },
                  {
                    q: "Can I use Crownledger for my business?",
                    a: "Absolutely. Our Business plan includes team sub-accounts, bulk payments, a dedicated account manager, and more.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 group overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                      <span
                        className="text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {faq.q}
                      </span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="flex-shrink-0 transition-transform group-open:rotate-180"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <p className="text-sm font-semibold text-blue-900 mb-1">Still need help?</p>
                <p className="text-sm text-blue-700 mb-3">
                  Our support team is available 24/7 to assist you with anything.
                </p>
                <Link
                  href="/faq"
                  className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  View full FAQ →
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}