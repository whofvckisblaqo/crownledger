"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    transactions: true,
    transfers: true,
    security: true,
    marketing: false,
    statements: true,
    lowBalance: true,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");

  const [form, setForm] = useState({
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    email: session?.user?.email || "",
    phone: "",
    address: "123 Main St, New York, NY 10001",
  });

  const handleSave = async () => {
    setSaveLoading(true);
    setSaveSuccess("");
    await new Promise((r) => setTimeout(r, 1500));
    setSaveLoading(false);
    setSaveSuccess("Settings saved successfully!");
    setTimeout(() => setSaveSuccess(""), 3000);
  };

  const tabs = ["profile", "notifications", "security", "preferences"];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Settings
          </h1>
          <p className="text-xs text-gray-400">Manage your account preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Profile banner */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {session?.user?.firstName?.[0]}{session?.user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {session?.user?.firstName} {session?.user?.lastName}
            </p>
            <p className="text-sm text-gray-400 mb-3">{session?.user?.email}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Premium Member
            </span>
          </div>
          <button className="flex-shrink-0 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition">
            Change Photo
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-max px-4 sm:px-6 py-4 text-sm font-semibold capitalize transition border-b-2
                  ${activeTab === tab
                    ? "text-blue-600 border-blue-600 bg-blue-50/50"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                  }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* Profile tab */}
            {activeTab === "profile" && (
              <div className="space-y-5 max-w-lg">
                <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Personal Information
                </h3>

                {saveSuccess && (
                  <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {saveSuccess}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">First Name</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Last Name</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Billing Address</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {saveLoading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Saving...
                    </>
                  ) : "Save Changes"}
                </button>
              </div>
            )}

            {/* Notifications tab */}
            {activeTab === "notifications" && (
              <div className="space-y-4 max-w-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Notification Preferences
                </h3>
                {[
                  { key: "transactions", label: "Transaction Alerts", desc: "Get notified for every debit and credit" },
                  { key: "transfers", label: "Transfer Updates", desc: "Notifications when you send or receive money" },
                  { key: "security", label: "Security Alerts", desc: "Login attempts and suspicious activity" },
                  { key: "lowBalance", label: "Low Balance Alert", desc: "Alert when balance drops below $500" },
                  { key: "statements", label: "Monthly Statements", desc: "Email when your statement is ready" },
                  { key: "marketing", label: "Promotions & Offers", desc: "Special offers and product updates" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                        ${notifications[item.key] ? "bg-blue-600" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
                        ${notifications[item.key] ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition mt-4"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {saveLoading ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            )}

            {/* Security tab */}
            {activeTab === "security" && (
              <div className="space-y-4 max-w-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Security Settings
                </h3>

                {/* Change password */}
                <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                  <p className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Change Password
                  </p>
                  {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                      />
                    </div>
                  ))}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition"
                    style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Update Password
                  </button>
                </div>

                {/* 2FA */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Enabled</span>
                  </div>
                  <button className="text-sm text-blue-600 font-medium hover:underline">
                    Manage 2FA Settings →
                  </button>
                </div>

                {/* Active sessions */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Active Sessions
                  </p>
                  {[
                    { device: "Chrome on Windows", location: "New York, US", current: true },
                    { device: "Safari on iPhone", location: "New York, US", current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{session.device}</p>
                          <p className="text-xs text-gray-400">{session.location}</p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">Current</span>
                      ) : (
                        <button className="text-xs text-red-500 font-medium hover:underline">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Danger zone */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-red-700 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Danger Zone
                  </p>
                  <p className="text-xs text-red-500 mb-4">These actions are irreversible. Please be careful.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex-1 bg-white border border-red-200 text-red-500 font-semibold text-sm py-2.5 rounded-xl hover:bg-red-50 transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Sign Out All Devices
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2.5 rounded-xl transition"
                      style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Close Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences tab */}
            {activeTab === "preferences" && (
              <div className="space-y-4 max-w-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  App Preferences
                </h3>

                {[
                  { label: "Currency", value: "USD — US Dollar", type: "select", options: ["USD — US Dollar", "EUR — Euro", "GBP — British Pound"] },
                  { label: "Language", value: "English (US)", type: "select", options: ["English (US)", "Spanish", "French"] },
                  { label: "Date Format", value: "MM/DD/YYYY", type: "select", options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"] },
                  { label: "Time Zone", value: "Eastern Time (ET)", type: "select", options: ["Eastern Time (ET)", "Central Time (CT)", "Pacific Time (PT)"] },
                ].map((pref, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{pref.label}</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 transition bg-white">
                      {pref.options.map((opt, j) => (
                        <option key={j}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition mt-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {saveLoading ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}