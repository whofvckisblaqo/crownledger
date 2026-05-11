"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saveError, setSaveError] = useState("");

  const [profile, setProfile] = useState({
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    email: session?.user?.email || "",
    phone: "",
    role: "Administrator",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Crownledger",
    tagline: "Private Banking for the Modern World",
    supportEmail: "support@crownledgerapp.com",
    companyAddress: "123 Wall Street, New York, NY 10005",
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    autoApproveTransfers: false,
  });

  const [emailSettings, setEmailSettings] = useState({
    fromName: "Crownledger",
    fromEmail: "noreply@crownledgerapp.com",
    sendWelcomeEmail: true,
    sendTransferEmails: true,
    sendLoginAlerts: true,
    sendMonthlyStatements: false,
  });

  const [security, setSecurity] = useState({
    twoFactorRequired: false,
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    ipWhitelist: "",
  });

  const handleSave = async () => {
    setSaveLoading(true);
    setSaveSuccess("");
    setSaveError("");
    await new Promise((r) => setTimeout(r, 1500));
    setSaveLoading(false);
    setSaveSuccess("Settings saved successfully!");
    setTimeout(() => setSaveSuccess(""), 3000);
  };

  const handlePasswordChange = async () => {
    setSaveError("");
    setSaveSuccess("");

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setSaveError("Please fill in all password fields.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setSaveError("New passwords do not match.");
      return;
    }
    if (passwords.new.length < 8) {
      setSaveError("New password must be at least 8 characters.");
      return;
    }

    setSaveLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaveLoading(false);
    setSaveSuccess("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
    setTimeout(() => setSaveSuccess(""), 3000);
  };

  const tabs = [
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: "site",
      label: "Site Settings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        </svg>
      ),
    },
    {
      key: "email",
      label: "Email Settings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      key: "security",
      label: "Security",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      key: "password",
      label: "Change Password",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0
        ${value ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
        ${value ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Admin Settings
            </h1>
            <p className="text-xs text-gray-400">Manage your admin account and site configuration</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Admin
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Profile banner */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {session?.user?.firstName?.[0]}{session?.user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {session?.user?.firstName} {session?.user?.lastName}
            </p>
            <p className="text-sm text-gray-400 mb-2">{session?.user?.email}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Super Administrator
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex-shrink-0 flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setSaveSuccess(""); setSaveError(""); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap w-full text-left
                    ${activeTab === tab.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">

              {/* Success/Error messages */}
              {saveSuccess && (
                <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {saveSuccess}
                </div>
              )}
              {saveError && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {saveError}
                </div>
              )}

              {/* Profile tab */}
              {activeTab === "profile" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Profile Information
                    </h3>
                    <p className="text-sm text-gray-500">Update your admin account details.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Role</label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
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

              {/* Site Settings tab */}
              {activeTab === "site" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Site Configuration
                    </h3>
                    <p className="text-sm text-gray-500">Manage global site settings for Crownledger.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Site Name</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Tagline</label>
                    <input
                      type="text"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Support Email</label>
                    <input
                      type="email"
                      value={siteSettings.supportEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, supportEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Company Address</label>
                    <input
                      type="text"
                      value={siteSettings.companyAddress}
                      onChange={(e) => setSiteSettings({ ...siteSettings, companyAddress: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Feature Toggles</h4>

                    {[
                      { key: "maintenanceMode", label: "Maintenance Mode", desc: "Put the site in maintenance mode — users cannot log in", danger: true },
                      { key: "allowRegistrations", label: "Allow New Registrations", desc: "Allow new users to sign up for an account" },
                      { key: "requireEmailVerification", label: "Require Email Verification", desc: "Users must verify their email before logging in" },
                      { key: "autoApproveTransfers", label: "Auto-Approve Transfers", desc: "Automatically approve all transfer requests without admin review" },
                    ].map((toggle) => (
                      <div key={toggle.key} className="flex items-center justify-between gap-4">
                        <div>
                          <p className={`text-sm font-semibold ${toggle.danger && siteSettings[toggle.key] ? "text-red-600" : "text-gray-900"}`}>
                            {toggle.label}
                            {toggle.danger && siteSettings[toggle.key] && (
                              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Active</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{toggle.desc}</p>
                        </div>
                        <Toggle
                          value={siteSettings[toggle.key]}
                          onChange={(val) => setSiteSettings({ ...siteSettings, [toggle.key]: val })}
                        />
                      </div>
                    ))}
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
                    ) : "Save Site Settings"}
                  </button>
                </div>
              )}

              {/* Email Settings tab */}
              {activeTab === "email" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Email Configuration
                    </h3>
                    <p className="text-sm text-gray-500">Configure how Crownledger sends emails to users.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">From Name</label>
                    <input
                      type="text"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">From Email</label>
                    <input
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Notifications</h4>
                    {[
                      { key: "sendWelcomeEmail", label: "Welcome Email", desc: "Send welcome email when a new user registers" },
                      { key: "sendTransferEmails", label: "Transfer Emails", desc: "Send emails for transfer pending, approved, and declined" },
                      { key: "sendLoginAlerts", label: "Login Alerts", desc: "Alert users when their account is logged into" },
                      { key: "sendMonthlyStatements", label: "Monthly Statements", desc: "Send monthly account statements to all users" },
                    ].map((toggle) => (
                      <div key={toggle.key} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{toggle.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{toggle.desc}</p>
                        </div>
                        <Toggle
                          value={emailSettings[toggle.key]}
                          onChange={(val) => setEmailSettings({ ...emailSettings, [toggle.key]: val })}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Test email */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Send Test Email
                    </h4>
                    <p className="text-xs text-blue-700 mb-3">
                      Send a test email to verify your email configuration is working correctly.
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-blue-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition bg-white"
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition whitespace-nowrap"
                        style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Send Test
                      </button>
                    </div>
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
                    ) : "Save Email Settings"}
                  </button>
                </div>
              )}

              {/* Security tab */}
              {activeTab === "security" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Security Settings
                    </h3>
                    <p className="text-sm text-gray-500">Configure security settings for the platform.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Session Timeout (hours)
                    </label>
                    <select
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                    >
                      {["1", "6", "12", "24", "48", "72"].map((h) => (
                        <option key={h} value={h}>{h} hour{h !== "1" ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Max Login Attempts Before Lockout
                    </label>
                    <select
                      value={security.maxLoginAttempts}
                      onChange={(e) => setSecurity({ ...security, maxLoginAttempts: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                    >
                      {["3", "5", "10", "15"].map((n) => (
                        <option key={n} value={n}>{n} attempts</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Security Features</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Require 2FA for All Users</p>
                        <p className="text-xs text-gray-400 mt-0.5">Force all users to enable two-factor authentication</p>
                      </div>
                      <Toggle
                        value={security.twoFactorRequired}
                        onChange={(val) => setSecurity({ ...security, twoFactorRequired: val })}
                      />
                    </div>
                  </div>

                  {/* Active sessions */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Admin Active Sessions
                    </h4>
                    {[
                      { device: "Chrome on Windows", location: "New York, US", current: true, time: "Now" },
                      { device: "Safari on iPhone", location: "New York, US", current: false, time: "2 hours ago" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="14" rx="2" />
                              <path d="M8 21h8M12 17v4" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700">{s.device}</p>
                            <p className="text-xs text-gray-400">{s.location} · {s.time}</p>
                          </div>
                        </div>
                        {s.current ? (
                          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">Current</span>
                        ) : (
                          <button className="text-xs text-red-500 font-medium hover:underline">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Danger zone */}
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                    <p className="text-sm font-bold text-red-700 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Danger Zone
                    </p>
                    <p className="text-xs text-red-500 mb-4">
                      These actions are permanent and cannot be undone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex-1 bg-white border border-red-200 text-red-500 font-semibold text-sm py-2.5 rounded-xl hover:bg-red-50 transition"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Sign Out All Devices
                      </button>
                      <button
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2.5 rounded-xl transition"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Clear All User Sessions
                      </button>
                    </div>
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
                    ) : "Save Security Settings"}
                  </button>
                </div>
              )}

              {/* Change Password tab */}
              {activeTab === "password" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Change Password
                    </h3>
                    <p className="text-sm text-gray-500">Update your admin account password.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Current Password</label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">New Password</label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="Repeat new password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                    />
                  </div>

                  {/* Password hints */}
                  <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                    {[
                      { label: "At least 8 characters", met: passwords.new.length >= 8 },
                      { label: "Contains a number", met: /\d/.test(passwords.new) },
                      { label: "Contains a letter", met: /[a-zA-Z]/.test(passwords.new) },
                      { label: "Passwords match", met: passwords.new && passwords.new === passwords.confirm },
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
                    onClick={handlePasswordChange}
                    disabled={saveLoading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {saveLoading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Updating...
                      </>
                    ) : "Update Password"}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}