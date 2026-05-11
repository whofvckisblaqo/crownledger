"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRefs = [];

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRefs[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid code.");
        return;
      }

      setStep(2);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
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
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otp.join(""),
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
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
                  {s === 1 ? "Verify Code" : "New Password"}
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

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {success}
            </div>
          )}

          {/* Step 1 — OTP */}
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Enter reset code
                </h1>
                <p className="text-sm text-gray-500">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-blue-600">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2
                        text-gray-900 focus:outline-none transition-all duration-200
                        ${digit ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50"}`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join("").length < 6}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Step 2 — New Password */}
          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Set new password
                </h1>
                <p className="text-sm text-gray-500">
                  Choose a strong password for your account.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="Repeat your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                  />
                </div>

                {/* Password hints */}
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
                      Resetting...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
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