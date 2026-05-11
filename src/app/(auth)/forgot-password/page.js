"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 w-fit mx-auto">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20M6 20V10l6-7 6 7v10" />
              <path d="M10 20v-5h4v5" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[18px] font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Crownledger
            </span>
            <span className="text-[9px] font-medium text-gray-400 tracking-[2px] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Private Banking
            </span>
          </div>
        </Link>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

          {!sent ? (
            <>
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Forgot your password?
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                  No worries. Enter your email and we'll send you a reset code right away.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="james@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
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
                      Send Reset Code
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Check your email
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We sent a password reset code to
                </p>
                <p className="text-sm font-semibold text-blue-600 mt-1">{email}</p>
              </div>

              <Link
                href={`/reset-password?email=${encodeURIComponent(email)}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Enter Reset Code
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <button
                onClick={() => setSent(false)}
                className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                Use a different email
              </button>
            </>
          )}

          {/* Back to login */}
          <div className="text-center mt-6">
            <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
