"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(true);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [txSearch, setTxSearch] = useState("");
  const [accountSearch, setAccountSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchTransactions();
    fetchAccounts();
  }, []);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setTxLoading(true);
    try {
      const res = await fetch("/api/admin/transactions");
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setTxLoading(false);
    }
  };

  const fetchAccounts = async () => {
    setAccountsLoading(true);
    try {
      const res = await fetch("/api/admin/accounts");
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setAccountsLoading(false);
    }
  };

  const updateUser = async (userId, updateData) => {
    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...updateData }),
      });
      fetchUsers();
      if (selectedUser?._id === userId) {
        setSelectedUser({ ...selectedUser, ...updateData });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTransaction = async (transactionId, status) => {
    try {
      await fetch("/api/admin/transactions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, status }),
      });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAccount = async (accountId, status) => {
    try {
      await fetch("/api/admin/accounts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, status }),
      });
      fetchAccounts();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    {
      label: "Overview", key: "overview",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    },
    {
      label: "Users", key: "users",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    },
    {
      label: "Transactions", key: "transactions",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    },
    {
      label: "Accounts", key: "accounts",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
    },
  ];

  const stats = [
    { label: "Total Users", value: users.length.toString(), change: "All registered users", up: true },
    { label: "Verified Users", value: users.filter(u => u.isVerified).length.toString(), change: "Email verified", up: true },
    { label: "Active Users", value: users.filter(u => u.status === "active").length.toString(), change: "Currently active", up: true },
    { label: "Suspended", value: users.filter(u => u.status === "suspended").length.toString(), change: "Needs review", up: false },
  ];

  const filteredUsers = users.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search)
  );

  const filteredTx = transactions.filter(t =>
    t.reference?.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.description?.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.senderId?.email?.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.receiverId?.email?.toLowerCase().includes(txSearch.toLowerCase())
  );

  const filteredAccounts = accounts.filter(a =>
    a.userId?.firstName?.toLowerCase().includes(accountSearch.toLowerCase()) ||
    a.userId?.lastName?.toLowerCase().includes(accountSearch.toLowerCase()) ||
    a.userId?.email?.toLowerCase().includes(accountSearch.toLowerCase()) ||
    a.accountNumber?.includes(accountSearch)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* User detail modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                User Details
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">

              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">
                    {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                </div>
              </div>

              {/* User info */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account Information</h3>
                {[
                  { label: "Full Name", value: `${selectedUser.firstName} ${selectedUser.lastName}` },
                  { label: "Email", value: selectedUser.email },
                  { label: "Phone", value: selectedUser.phone || "Not provided" },
                  { label: "Role", value: selectedUser.role },
                  { label: "Email Verified", value: selectedUser.isVerified ? "Yes" : "No" },
                  { label: "Account Status", value: selectedUser.status },
                  { label: "Member Since", value: new Date(selectedUser.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <span className={`text-xs font-semibold
                      ${item.label === "Account Status" ? selectedUser.status === "active" ? "text-green-600" : "text-red-500"
                        : item.label === "Email Verified" ? selectedUser.isVerified ? "text-green-600" : "text-yellow-600"
                        : item.label === "Role" ? selectedUser.role === "admin" ? "text-blue-600" : "text-gray-700"
                        : "text-gray-700"
                      }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Admin Actions</h3>

                {/* Verify/Unverify */}
                <button
                  onClick={() => updateUser(selectedUser._id, { isVerified: !selectedUser.isVerified })}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition
                    ${selectedUser.isVerified
                      ? "border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
                      : "border-green-200 bg-green-50 hover:bg-green-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selectedUser.isVerified ? "#d97706" : "#16a34a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className={`text-sm font-semibold ${selectedUser.isVerified ? "text-yellow-700" : "text-green-700"}`}>
                      {selectedUser.isVerified ? "Remove Email Verification" : "Approve & Verify Email"}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Suspend/Activate */}
                <button
                  onClick={() => updateUser(selectedUser._id, { status: selectedUser.status === "active" ? "suspended" : "active" })}
                  disabled={selectedUser.role === "admin"}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition disabled:opacity-40 disabled:cursor-not-allowed
                    ${selectedUser.status === "active"
                      ? "border-red-200 bg-red-50 hover:bg-red-100"
                      : "border-green-200 bg-green-50 hover:bg-green-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selectedUser.status === "active" ? "#dc2626" : "#16a34a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      {selectedUser.status === "active"
                        ? <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        : <polyline points="9 11 12 14 22 4" />
                      }
                    </svg>
                    <span className={`text-sm font-semibold ${selectedUser.status === "active" ? "text-red-700" : "text-green-700"}`}>
                      {selectedUser.status === "active" ? "Suspend Account" : "Activate Account"}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Make admin/user */}
                <button
                  onClick={() => updateUser(selectedUser._id, { role: selectedUser.role === "admin" ? "user" : "admin" })}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="text-sm font-semibold text-blue-700">
                      {selectedUser.role === "admin" ? "Remove Admin Role" : "Make Admin"}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteUser(selectedUser._id)}
                  disabled={selectedUser.role === "admin"}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                    </svg>
                    <span className="text-sm font-semibold text-red-700">Delete User Permanently</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20M6 20V10l6-7 6 7v10" /><path d="M10 20v-5h4v5" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Crownledger</span>
              <span className="text-[9px] font-medium text-gray-500 tracking-[2px] uppercase">Admin Panel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
                ${activeTab === item.key ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
            >
              {item.icon}
              {item.label}
              {item.key === "users" && (
                <span className="ml-auto bg-gray-700 text-gray-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  {users.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-800 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {session?.user?.firstName?.[0]}{session?.user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {session?.user?.firstName} {session?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>
          <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            User Dashboard
          </Link>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 capitalize" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {activeTab === "overview" ? "Admin Overview" : activeTab}
              </h1>
              <p className="text-xs text-gray-400">Crownledger Admin Panel</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Admin
          </span>
        </header>

        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">

          {/* Overview */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
                    <p className={`text-xs font-semibold ${stat.up ? "text-green-500" : "text-red-400"}`}>{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>Recent Users</h3>
                    <button onClick={() => setActiveTab("users")} className="text-xs text-blue-600 font-medium hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {usersLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : users.slice(0, 5).map((u, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 cursor-pointer transition"
                        onClick={() => { setSelectedUser(u); setModalOpen(true); }}
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{u.firstName?.[0]}{u.lastName?.[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{u.firstName} {u.lastName}</p>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0
                            ${u.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                            {u.status}
                          </span>
                          {!u.isVerified && (
                            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-yellow-50 text-yellow-600 flex-shrink-0">
                              Unverified
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {!usersLoading && users.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-400">No users yet</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>Recent Transactions</h3>
                    <button onClick={() => setActiveTab("transactions")} className="text-xs text-blue-600 font-medium hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {txLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : transactions.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-400">No transactions yet</p>
                      </div>
                    ) : transactions.slice(0, 5).map((tx, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold
                          ${tx.status === "completed" ? "bg-green-50 text-green-600" : tx.status === "pending" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-500"}`}>
                          {tx.type?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{tx.description || tx.type}</p>
                          <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 flex-shrink-0">${tx.amount?.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Users tab */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                  />
                </div>
                <button onClick={fetchUsers} className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2.5 rounded-xl transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  Refresh
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {usersLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-50">
                          {["User", "Email", "Phone", "Role", "Verified", "Status", "Joined", "Actions"].map((h) => (
                            <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((u, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-xs font-bold">{u.firstName?.[0]}{u.lastName?.[0]}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{u.firstName} {u.lastName}</p>
                              </div>
                            </td>
                            <td className="px-5 py-4"><p className="text-sm text-gray-500 whitespace-nowrap">{u.email}</p></td>
                            <td className="px-5 py-4"><p className="text-sm text-gray-500 whitespace-nowrap">{u.phone || "—"}</p></td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${u.role === "admin" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${u.isVerified ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                                {u.isVerified ? "Verified" : "Pending"}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${u.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-sm text-gray-500 whitespace-nowrap">
                                {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setSelectedUser(u); setModalOpen(true); }}
                                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition whitespace-nowrap"
                                >
                                  View
                                </button>
                                {!u.isVerified && (
                                  <button
                                    onClick={() => updateUser(u._id, { isVerified: true })}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition whitespace-nowrap"
                                  >
                                    Approve
                                  </button>
                                )}
                                <button
                                  onClick={() => updateUser(u._id, { status: u.status === "active" ? "suspended" : "active" })}
                                  disabled={u.role === "admin"}
                                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap
                                    ${u.status === "active" ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                                >
                                  {u.status === "active" ? "Suspend" : "Activate"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-16">
                        <p className="text-sm text-gray-400 font-medium">No users found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transactions tab */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={txSearch}
                    onChange={(e) => setTxSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                  />
                </div>
                <button onClick={fetchTransactions} className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2.5 rounded-xl transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  Refresh
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {txLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">No transactions yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-50">
                          {["Reference", "From", "To", "Amount", "Type", "Status", "Date", "Actions"].map((h) => (
                            <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredTx.map((tx, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition">
                            <td className="px-5 py-4"><p className="text-xs font-mono text-blue-600 whitespace-nowrap">{tx.reference || "—"}</p></td>
                            <td className="px-5 py-4">
                              <p className="text-sm text-gray-700 whitespace-nowrap">
                                {tx.senderId ? `${tx.senderId.firstName} ${tx.senderId.lastName}` : "—"}
                              </p>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-sm text-gray-700 whitespace-nowrap">
                                {tx.receiverId ? `${tx.receiverId.firstName} ${tx.receiverId.lastName}` : tx.receiverAccount || "—"}
                              </p>
                            </td>
                            <td className="px-5 py-4"><p className="text-sm font-bold text-gray-900 whitespace-nowrap">${tx.amount?.toFixed(2)}</p></td>
                            <td className="px-5 py-4">
                              <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-gray-50 text-gray-600 capitalize whitespace-nowrap">{tx.type}</span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize whitespace-nowrap
                                ${tx.status === "completed" ? "bg-green-50 text-green-600" : tx.status === "pending" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-500"}`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <p className="text-sm text-gray-500 whitespace-nowrap">
                                {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                {tx.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => updateTransaction(tx._id, "completed")}
                                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition whitespace-nowrap"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => updateTransaction(tx._id, "failed")}
                                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition whitespace-nowrap"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                {tx.status === "completed" && (
                                  <span className="text-xs text-gray-400 font-medium">Completed</span>
                                )}
                                {tx.status === "failed" && (
                                  <button
                                    onClick={() => updateTransaction(tx._id, "completed")}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition whitespace-nowrap"
                                  >
                                    Retry
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accounts tab */}
          {activeTab === "accounts" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={accountSearch}
                    onChange={(e) => setAccountSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                  />
                </div>
                <button onClick={fetchAccounts} className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2.5 rounded-xl transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  Refresh
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {accountsLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : accounts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">No accounts yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-50">
                          {["Owner", "Email", "Phone", "Type", "Account No.", "Balance", "Currency", "Status", "Actions"].map((h) => (
                            <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredAccounts.map((acc, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition">
                            <td className="px-5 py-4">
                              <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                {acc.userId?.firstName} {acc.userId?.lastName}
                              </p>
                            </td>
                            <td className="px-5 py-4"><p className="text-sm text-gray-500 whitespace-nowrap">{acc.userId?.email || "—"}</p></td>
                            <td className="px-5 py-4"><p className="text-sm text-gray-500 whitespace-nowrap">{acc.userId?.phone || "—"}</p></td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg whitespace-nowrap
                                ${acc.type === "savings" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                                {acc.type}
                              </span>
                            </td>
                            <td className="px-5 py-4"><p className="text-sm font-mono text-gray-600">{acc.accountNumber}</p></td>
                            <td className="px-5 py-4"><p className="text-sm font-bold text-gray-900">${acc.balance?.toLocaleString()}</p></td>
                            <td className="px-5 py-4"><p className="text-sm text-gray-500">{acc.currency}</p></td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg
                                ${acc.status === "active" ? "bg-green-50 text-green-600" : acc.status === "frozen" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-500"}`}>
                                {acc.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateAccount(acc._id, acc.status === "active" ? "frozen" : "active")}
                                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap
                                    ${acc.status === "active" ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                                >
                                  {acc.status === "active" ? "Freeze" : "Unfreeze"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}