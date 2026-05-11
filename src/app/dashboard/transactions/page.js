"use client";

import { useState } from "react";
import Link from "next/link";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const transactions = [
    { id: 1, name: "Direct Deposit", description: "Salary Payment", date: "May 11, 2026", time: "6:00 AM", amount: 5200.00, type: "credit", category: "Income", icon: "D" },
    { id: 2, name: "Netflix", description: "Monthly Subscription", date: "May 11, 2026", time: "9:14 AM", amount: 14.99, type: "debit", category: "Entertainment", icon: "N" },
    { id: 3, name: "Transfer to Sarah", description: "Rent Split", date: "May 8, 2026", time: "2:32 PM", amount: 500.00, type: "debit", category: "Transfer", icon: "T" },
    { id: 4, name: "Amazon", description: "Online Purchase", date: "May 7, 2026", time: "11:20 AM", amount: 89.99, type: "debit", category: "Shopping", icon: "A" },
    { id: 5, name: "Freelance Payment", description: "Web Design Project", date: "May 6, 2026", time: "3:45 PM", amount: 1200.00, type: "credit", category: "Income", icon: "F" },
    { id: 6, name: "Starbucks", description: "Coffee", date: "May 5, 2026", time: "8:22 AM", amount: 7.50, type: "debit", category: "Food & Dining", icon: "S" },
    { id: 7, name: "Uber", description: "Ride Service", date: "May 4, 2026", time: "7:10 PM", amount: 24.30, type: "debit", category: "Transport", icon: "U" },
    { id: 8, name: "Apple iCloud", description: "Storage Plan", date: "May 3, 2026", time: "12:00 AM", amount: 2.99, type: "debit", category: "Subscriptions", icon: "A" },
    { id: 9, name: "Zelle Transfer", description: "From Mike Johnson", date: "May 2, 2026", time: "4:15 PM", amount: 350.00, type: "credit", category: "Transfer", icon: "Z" },
    { id: 10, name: "Whole Foods", description: "Groceries", date: "May 1, 2026", time: "5:45 PM", amount: 123.45, type: "debit", category: "Food & Dining", icon: "W" },
    { id: 11, name: "Spotify", description: "Music Subscription", date: "Apr 30, 2026", time: "12:00 AM", amount: 9.99, type: "debit", category: "Entertainment", icon: "S" },
    { id: 12, name: "ATM Withdrawal", description: "Chase ATM", date: "Apr 29, 2026", time: "2:00 PM", amount: 200.00, type: "debit", category: "Cash", icon: "C" },
    { id: 13, name: "Venmo", description: "From James Wilson", date: "Apr 28, 2026", time: "10:30 AM", amount: 80.00, type: "credit", category: "Transfer", icon: "V" },
    { id: 14, name: "Electric Bill", description: "ConEd Payment", date: "Apr 27, 2026", time: "9:00 AM", amount: 145.00, type: "debit", category: "Bills", icon: "E" },
    { id: 15, name: "Gym Membership", description: "Monthly Fee", date: "Apr 26, 2026", time: "12:00 AM", amount: 49.99, type: "debit", category: "Health", icon: "G" },
  ];

  const categoryColors = {
    Income: "bg-green-50 text-green-600",
    Transfer: "bg-blue-50 text-blue-600",
    Entertainment: "bg-purple-50 text-purple-600",
    Shopping: "bg-pink-50 text-pink-600",
    "Food & Dining": "bg-orange-50 text-orange-600",
    Transport: "bg-cyan-50 text-cyan-600",
    Subscriptions: "bg-indigo-50 text-indigo-600",
    Cash: "bg-gray-50 text-gray-600",
    Bills: "bg-red-50 text-red-600",
    Health: "bg-teal-50 text-teal-600",
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "credit" && tx.type === "credit") ||
      (filter === "debit" && tx.type === "debit");
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "may" && tx.date.includes("May")) ||
      (dateFilter === "april" && tx.date.includes("Apr"));
    return matchesSearch && matchesFilter && matchesDate;
  });

  const totalCredit = filtered
    .filter((tx) => tx.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalDebit = filtered
    .filter((tx) => tx.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Transactions
          </h1>
          <p className="text-xs text-gray-400">Your full transaction history</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Total Transactions</p>
            <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {filtered.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Total Money In</p>
            <p className="text-3xl font-bold text-green-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
              +${totalCredit.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Total Money Out</p>
            <p className="text-3xl font-bold text-red-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
              -${totalDebit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-2">
            {["all", "credit", "debit"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold capitalize transition
                  ${filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {f === "all" ? "All" : f === "credit" ? "Money In" : "Money Out"}
              </button>
            ))}
          </div>

          {/* Date filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 focus:outline-none focus:border-blue-400 transition bg-white"
          >
            <option value="all">All Time</option>
            <option value="may">May 2026</option>
            <option value="april">April 2026</option>
          </select>
        </div>

        {/* Transactions list */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-500">No transactions found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                    ${tx.type === "debit" ? "bg-red-50 text-red-400" : "bg-green-50 text-green-500"}`}>
                    {tx.icon}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-gray-900 truncate">{tx.name}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-lg flex-shrink-0 ${categoryColors[tx.category] || "bg-gray-50 text-gray-500"}`}>
                        {tx.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{tx.description} · {tx.date} at {tx.time}</p>
                  </div>

                  {/* Amount */}
                  <p className={`text-sm font-bold flex-shrink-0 ${tx.type === "debit" ? "text-red-500" : "text-green-500"}`}>
                    {tx.type === "debit" ? "-" : "+"}${tx.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 text-sm font-medium px-5 py-2.5 rounded-xl transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>

      </div>
    </div>
  );
}