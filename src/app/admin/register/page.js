"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    adminSecret: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.adminSecret) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess("Admin account created! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
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
            <span className="text-[18px] font-bold text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Crownledger
            </span>
            <span className="text-[9px] font-medium text-gray-500 tracking-[2px] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Admin Registration
            </span>
          </div>
        </Link>

        <div className="bg-gray-800 rounded-3xl border border-gray-700 p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Create Admin Account
            </h1>
            <p className="text-sm text-gray-400">
              You need a secret code to create an admin account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
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
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@crownledger.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Admin secret */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Admin Secret Code
              </label>
              <input
                type="password"
                name="adminSecret"
                value={form.adminSecret}
                onChange={handleChange}
                placeholder="Enter secret code"
                className="w-full px-4 py-3 rounded-xl border border-yellow-600/30 bg-yellow-500/5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition"
              />
              <p className="text-xs text-gray-500">
                Contact your system administrator for the secret code.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Creating Admin...
                </>
              ) : (
                <>
                  Create Admin Account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

          </form>

          <div className="text-center mt-6">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-300 transition flex items-center justify-center gap-1">
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