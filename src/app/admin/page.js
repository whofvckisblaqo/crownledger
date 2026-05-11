"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    {
      label: "Overview",
      key: "overview",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Users",
      key: "users",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: "Transactions",
      key: "transactions",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Accounts",
      key: "accounts",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
    },
  ];

  const stats = [
    { label: "Total Users", value: "50,234", change: "+124 this week", up: true },
    { label: "Total Deposits", value: "$2.4B", change: "+$12M this week", up: true },
    { label: "Total Transactions", value: "1.2M", change: "+8,432 today", up: true },
    { label: "Suspended Accounts", value: "12", change: "-2 this week", up: false },
  ];

  const users = [
    { name: "James Whitfield", email: "james@example.com", status: "active", joined: "Jan 15, 2024", balance: "$84,250", role: "user" },
    { name: "Sarah Mitchell", email: "sarah@example.com", status: "active", joined: "Feb 3, 2024", balance: "$12,430", role: "user" },
    { name: "David Okafor", email: "david@example.com", status: "suspended", joined: "Mar 12, 2024", balance: "$3,200", role: "user" },
    { name: "Rachel Thompson", email: "rachel@example.com", status: "active", joined: "Apr 1, 2024", balance: "$56,000", role: "user" },
    { name: "Michael Chen", email: "michael@example.com", status: "active", joined: "Apr 20, 2024", balance: "$128,000", role: "user" },
    { name: "Olivia Harris", email: "olivia@example.com", status: "active", joined: "May 1, 2024", balance: "$2,100", role: "user" },
    { name: "Admin User", email: "admin@crownledger.com", status: "active", joined: "Jan 1, 2024", balance: "$0", role: "admin" },
  ];

  const transactions = [
    { ref: "TXN-001", from: "James Whitfield", to: "Sarah Mitchell", amount: "$500.00", type: "transfer", status: "completed", date: "May 11, 2026" },
    { ref: "TXN-002", from: "Direct Deposit", to: "James Whitfield", amount: "$5,200.00", type: "deposit", status: "completed", date: "May 11, 2026" },
    { ref: "TXN-003", from: "Rachel Thompson", to: "Chase Bank", amount: "$1,200.00", type: "transfer", status: "pending", date: "May 10, 2026" },
    { ref: "TXN-004", from: "Michael Chen", to: "Amazon", amount: "$89.99", type: "payment", status: "completed", date: "May 10, 2026" },
    { ref: "TXN-005", from: "David Okafor", to: "Olivia Harris", amount: "$350.00", type: "transfer", status: "failed", date: "May 9, 2026" },
    { ref: "TXN-006", from: "Olivia Harris", to: "Savings", amount: "$500.00", type: "deposit", status: "completed", date: "May 9, 2026" },
  ];

  const accounts = [
    { owner: "James Whitfield", type: "Checking", number: "****4821", balance: "$12,430", status: "active" },
    { owner: "James Whitfield", type: "Savings", number: "****9274", balance: "$71,820", status: "active" },
    { owner: "Sarah Mitchell", type: "Checking", number: "****3391", balance: "$12,430", status: "active" },
    { owner: "David Okafor", type: "Checking", number: "****7723", balance: "$3,200", status: "frozen" },
    { owner: "Rachel Thompson", type: "Savings", number: "****5512", balance: "$56,000", status: "active" },
    { owner: "Michael Chen", type: "Checking", number: "****8834", balance: "$128,000", status: "active" },
  ];

  const [userList, setUserList] = useState(users);
  const [accountList, setAccountList] = useState(accounts);
  const [search, setSearch] = useState("");
  const [txSearch, setTxSearch] = useState("");

  const toggleUserStatus = (email) => {
    setUserList(userList.map((u) =>
      u.email === email
        ? { ...u, status: u.status === "active" ? "suspended" : "active" }
        : u
    ));
  };

  const toggleAccountStatus = (number) => {
    setAccountList(accountList.map((a) =>
      a.number === number
        ? { ...a, status: a.status === "active" ? "frozen" : "active" }
        : a
    ));
  };

  const filteredUsers = userList.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTx = transactions.filter(
    (t) =>
      t.ref.toLowerCase().includes(txSearch.toLowerCase()) ||
      t.from.toLowerCase().includes(txSearch.toLowerCase()) ||
      t.to.toLowerCase().includes(txSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>

        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20M6 20V10l6-7 6 7v10" />
                <path d="M10 20v-5h4v5" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Crownledger
              </span>
              <span className="text-[9px] font-medium text-gray-500 tracking-[2px] uppercase">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
                ${activeTab === item.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
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
          <Link
            href="/dashboard"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition mb-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            User Dashboard
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
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

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 capitalize" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {activeTab === "overview" ? "Admin Overview" : activeTab}
              </h1>
              <p className="text-xs text-gray-400">Crownledger Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Admin
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">

          {/* Overview tab */}
          {activeTab === "overview" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </p>
                    <p className={`text-xs font-semibold ${stat.up ? "text-green-500" : "text-red-400"}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Recent users */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Recent Users
                    </h3>
                    <button onClick={() => setActiveTab("users")} className="text-xs text-blue-600 font-medium hover:underline">
                      View all
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {users.slice(0, 4).map((u, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{u.name.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0
                          ${u.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                          {u.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Recent Transactions
                    </h3>
                    <button onClick={() => setActiveTab("transactions")} className="text-xs text-blue-600 font-medium hover:underline">
                      View all
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {transactions.slice(0, 4).map((tx, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold
                          ${tx.status === "completed" ? "bg-green-50 text-green-600" : tx.status === "pending" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-500"}`}>
                          {tx.type[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{tx.from} → {tx.to}</p>
                          <p className="text-xs text-gray-400">{tx.ref} · {tx.date}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 flex-shrink-0">{tx.amount}</p>
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
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-50">
                        {["User", "Email", "Balance", "Role", "Joined", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredUsers.map((u, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">{u.name.split(" ").map(n => n[0]).join("")}</span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{u.name}</p>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-500 whitespace-nowrap">{u.email}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{u.balance}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-lg
                              ${u.role === "admin" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-500 whitespace-nowrap">{u.joined}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-lg
                              ${u.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => toggleUserStatus(u.email)}
                              disabled={u.role === "admin"}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap
                                ${u.status === "active"
                                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                                  : "bg-green-50 text-green-600 hover:bg-green-100"
                                }`}
                            >
                              {u.status === "active" ? "Suspend" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Transactions tab */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              <div className="relative">
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

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-50">
                        {["Reference", "From", "To", "Amount", "Type", "Status", "Date"].map((h) => (
                          <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredTx.map((tx, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition">
                          <td className="px-5 py-4">
                            <p className="text-xs font-mono text-blue-600 whitespace-nowrap">{tx.ref}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-700 whitespace-nowrap">{tx.from}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-700 whitespace-nowrap">{tx.to}</p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm font-bold text-gray-900 whitespace-nowrap">{tx.amount}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-gray-50 text-gray-600 capitalize whitespace-nowrap">
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize whitespace-nowrap
                              ${tx.status === "completed" ? "bg-green-50 text-green-600"
                                : tx.status === "pending" ? "bg-yellow-50 text-yellow-600"
                                : "bg-red-50 text-red-500"}`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-500 whitespace-nowrap">{tx.date}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Accounts tab */}
          {activeTab === "accounts" && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["Account Owner", "Type", "Account Number", "Balance", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {accountList.map((acc, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{acc.owner}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg whitespace-nowrap
                            ${acc.type === "Savings" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                            {acc.type}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-mono text-gray-600">{acc.number}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-gray-900">{acc.balance}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg
                            ${acc.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                            {acc.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleAccountStatus(acc.number)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap
                              ${acc.status === "active"
                                ? "bg-red-50 text-red-500 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                              }`}
                          >
                            {acc.status === "active" ? "Freeze" : "Unfreeze"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}