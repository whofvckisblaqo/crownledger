"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    emailTransfers: true,
    emailDeposits: true,
    emailSecurity: true,
    emailMarketing: false,
    smsTransfers: false,
    smsDeposits: false,
  });

  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "English",
    timezone: "America/New_York",
    twoFactorEnabled: false,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/settings");
      const data = await res.json();
      if (data.user) {
        const u = data.user;
        setProfile({
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
          city: u.city || "",
          state: u.state || "",
          zipCode: u.zipCode || "",
        });
        if (u.notifications) setNotifications({ ...notifications, ...u.notifications });
        if (u.preferences) setPreferences({ ...preferences, ...u.preferences });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setError("");
    setTimeout(() => setSuccess(""), 4000);
  };

  const showError = (msg) => {
    setError(msg);
    setSuccess("");
  };

  const handleProfileSave = async () => {
  if (!profile.firstName || !profile.lastName) {
    showError("First and last name are required.");
    return;
  }
  setSaveLoading(true);
  try {
    const res = await fetch("/api/user/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "profile", ...profile }),
    });
    const data = await res.json();
    if (!res.ok) { showError(data.message); return; }

    // Force session to refresh with new name
    await update({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });

    showSuccess("Profile updated successfully!");
  } catch (err) {
    showError("Something went wrong.");
  } finally {
    setSaveLoading(false);
  }
};
  const handlePasswordSave = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      showError("Please fill in all password fields.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showError("New passwords do not match.");
      return;
    }
    if (passwords.new.length < 8) {
      showError("New password must be at least 8 characters.");
      return;
    }
    setSaveLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "password", currentPassword: passwords.current, newPassword: passwords.new }),
      });
      const data = await res.json();
      if (!res.ok) { showError(data.message); return; }
      showSuccess("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      showError("Something went wrong.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleNotificationsSave = async () => {
    setSaveLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "notifications", notifications }),
      });
      const data = await res.json();
      if (!res.ok) { showError(data.message); return; }
      showSuccess("Notification preferences saved!");
    } catch (err) {
      showError("Something went wrong.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePreferencesSave = async () => {
    setSaveLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "preferences", preferences }),
      });
      const data = await res.json();
      if (!res.ok) { showError(data.message); return; }
      showSuccess("Preferences saved successfully!");
    } catch (err) {
      showError("Something went wrong.");
    } finally {
      setSaveLoading(false);
    }
  };

  const Toggle = ({ value, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0
        ${value ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
        ${value ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );

  const tabs = [
    {
      key: "profile", label: "Profile",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    },
    {
      key: "security", label: "Security",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    },
    {
      key: "notifications", label: "Notifications",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
    },
    {
      key: "preferences", label: "Preferences",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>,
    },
  ];

  const usStates = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
    "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
    "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
    "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
    "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
    "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
    "Wisconsin","Wyoming",
  ];

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
            Account Settings
          </h1>
          <p className="text-xs text-gray-400">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Profile banner */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {profile.firstName?.[0]}{profile.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="text-sm text-gray-400 mb-2">{profile.email}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Active Account
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
                      onClick={() => { setActiveTab(tab.key); setSuccess(""); setError(""); }}
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

                  {/* Success/Error */}
                  {success && (
                    <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {error}
                    </div>
                  )}

                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Personal Information
                        </h3>
                        <p className="text-sm text-gray-500">Update your name, phone, and address.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            First Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Last Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          disabled
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400">Email cannot be changed. Contact support if needed.</p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                        />
                      </div>

                      <div className="border-t border-gray-100 pt-5">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Address Information
                        </h4>
                        <div className="space-y-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Street Address</label>
                            <input
                              type="text"
                              value={profile.address}
                              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                              placeholder="123 Main Street"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">City</label>
                              <input
                                type="text"
                                value={profile.city}
                                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                placeholder="New York"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">State</label>
                              <select
                                value={profile.state}
                                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                              >
                                <option value="">Select</option>
                                {usStates.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">ZIP Code</label>
                              <input
                                type="text"
                                value={profile.zipCode}
                                onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                                placeholder="10001"
                                maxLength={5}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleProfileSave}
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
                        ) : "Save Profile"}
                      </button>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Security Settings
                        </h3>
                        <p className="text-sm text-gray-500">Keep your account safe with a strong password.</p>
                      </div>

                      {/* Account status */}
                      <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Your account is secure
                          </p>
                          <p className="text-xs text-green-600">
                            Email verified · Account active
                          </p>
                        </div>
                      </div>

                      {/* Change password */}
                      <div className="border-t border-gray-100 pt-5 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Change Password
                        </h4>

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

                        {/* Password strength */}
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
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
                          onClick={handlePasswordSave}
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

                      {/* Danger zone */}
                      <div className="border-t border-gray-100 pt-5">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Danger Zone
                        </h4>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                          <p className="text-sm font-semibold text-red-700 mb-1">Close Account</p>
                          <p className="text-xs text-red-500 mb-4">
                            Once you close your account, all data will be permanently deleted. This action cannot be undone.
                          </p>
                          <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="text-xs font-semibold text-red-500 bg-white border border-red-200 hover:bg-red-50 px-4 py-2 rounded-xl transition"
                          >
                            Contact Support to Close Account
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Notification Preferences
                        </h3>
                        <p className="text-sm text-gray-500">Choose how you want to be notified.</p>
                      </div>

                      {/* Email notifications */}
                      <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Email Notifications
                        </h4>
                        {[
                          { key: "emailTransfers", label: "Transfer Alerts", desc: "Get notified when a transfer is sent, approved, or declined" },
                          { key: "emailDeposits", label: "Deposit Alerts", desc: "Get notified when money is deposited into your account" },
                          { key: "emailSecurity", label: "Security Alerts", desc: "Get notified about login attempts and security events" },
                          { key: "emailMarketing", label: "Product Updates", desc: "Receive news, tips, and product announcements from Crownledger" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                            </div>
                            <Toggle
                              value={notifications[item.key]}
                              onChange={(val) => setNotifications({ ...notifications, [item.key]: val })}
                            />
                          </div>
                        ))}
                      </div>

                      {/* SMS notifications */}
                      <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          SMS Notifications
                        </h4>
                        {[
                          { key: "smsTransfers", label: "Transfer Alerts via SMS", desc: "Receive transfer notifications by text message" },
                          { key: "smsDeposits", label: "Deposit Alerts via SMS", desc: "Receive deposit notifications by text message" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                            </div>
                            <Toggle
                              value={notifications[item.key]}
                              onChange={(val) => setNotifications({ ...notifications, [item.key]: val })}
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleNotificationsSave}
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
                        ) : "Save Preferences"}
                      </button>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === "preferences" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Account Preferences
                        </h3>
                        <p className="text-sm text-gray-500">Customize your banking experience.</p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Currency</label>
                        <select
                          value={preferences.currency}
                          onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                        >
                          <option value="USD">USD — US Dollar</option>
                          <option value="EUR">EUR — Euro</option>
                          <option value="GBP">GBP — British Pound</option>
                          <option value="CAD">CAD — Canadian Dollar</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Language</label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Timezone</label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="America/Anchorage">Alaska Time (AKT)</option>
                          <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Africa/Lagos">Lagos (WAT)</option>
                        </select>
                      </div>

                      {/* Two factor */}
                      <div className="bg-gray-50 rounded-2xl p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Toggle
                            value={preferences.twoFactorEnabled}
                            onChange={(val) => setPreferences({ ...preferences, twoFactorEnabled: val })}
                          />
                        </div>
                        {preferences.twoFactorEnabled && (
                          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3">
                            <p className="text-xs text-blue-700 leading-relaxed">
                              2FA is enabled. You will receive a verification code each time you log in.
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handlePreferencesSave}
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
                        ) : "Save Preferences"}
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}