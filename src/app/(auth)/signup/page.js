"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleStepOne = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError("Please fill in all fields.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);
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

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Create your account
            </h1>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${step >= s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {step > s ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : s}
                </div>
                <span className={`text-xs font-medium ${step >= s ? "text-blue-600" : "text-gray-400"}`}>
                  {s === 1 ? "Personal Info" : "Set Password"}
                </span>
                {s < 2 && <div className={`flex-1 h-px ${step > s ? "bg-blue-300" : "bg-gray-200"}`} />}
              </div>
            ))}
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

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleStepOne} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="James"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="james@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                />
              </div>

              {/* Password strength hints */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                {[
                  { label: "At least 8 characters", met: form.password.length >= 8 },
                  { label: "Contains a number", met: /\d/.test(form.password) },
                  { label: "Contains a letter", met: /[a-zA-Z]/.test(form.password) },
                ].map((hint, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${hint.met ? "bg-green-500" : "bg-gray-200"}`}>
                      {hint.met && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs font-medium ${hint.met ? "text-green-600" : "text-gray-400"}`}>
                      {hint.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-3.5 rounded-xl transition"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}