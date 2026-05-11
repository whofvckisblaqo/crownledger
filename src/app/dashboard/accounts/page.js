"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AccountsPage() {
  const { data: session } = useSession();

  const accounts = [
    {
      type: "Checking Account",
      number: "****4821",
      balance: "$12,430.00",
      available: "$12,430.00",
      status: "Active",
      opened: "January 2024",
      color: "bg-blue-600",
      href: "/dashboard/accounts/checking",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      stats: [
        { label: "Monthly Spent", value: "$3,240.00" },
        { label: "Monthly Income", value: "$5,200.00" },
        { label: "Transactions", value: "24" },
      ],
    },
    {
      type: "Savings Account",
      number: "****9274",
      balance: "$71,820.00",
      available: "$71,820.00",
      status: "Active",
      opened: "January 2024",
      color: "bg-green-600",
      href: "/dashboard/savings",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      stats: [
        { label: "Interest Rate", value: "5.00% APY" },
        { label: "Earned This Month", value: "$358.10" },
        { label: "Transactions", value: "8" },
      ],
    },
    {
      type: "Credit Card",
      number: "****4821",
      balance: "$2,340.00",
      available: "$7,660.00",
      status: "Active",
      opened: "March 2024",
      color: "bg-purple-600",
      href: "/dashboard/card",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      ),
      stats: [
        { label: "Credit Limit", value: "$10,000.00" },
        { label: "Amount Used", value: "$2,340.00" },
        { label: "Due Date", value: "May 25" },
      ],
    },
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
            My Accounts
          </h1>
          <p className="text-xs text-gray-400">All your Crownledger accounts</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Total net worth */}
        <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white">
          <p className="text-blue-200 text-sm font-medium mb-2">Total Net Worth</p>
          <p className="text-5xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            $81,910.00
          </p>
          <p className="text-blue-200 text-sm">Across all 3 accounts</p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: "Checking", value: "$12,430" },
              { label: "Savings", value: "$71,820" },
              { label: "Credit Used", value: "$2,340" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-4 py-2">
                <p className="text-blue-200 text-xs mb-0.5">{item.label}</p>
                <p className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Account cards */}
        <div className="space-y-4">
          {accounts.map((acc, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">

              {/* Top section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6">
                <div className={`w-12 h-12 rounded-2xl ${acc.color} flex items-center justify-center flex-shrink-0`}>
                  {acc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-base font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {acc.type}
                      </p>
                      <p className="text-xs text-gray-400">Account {acc.number} · Opened {acc.opened}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {acc.status}
                      </span>
                      <Link
                        href={acc.href}
                        className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition"
                      >
                        Manage →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance row */}
              <div className="flex flex-col sm:flex-row border-t border-gray-50">
                <div className="flex-1 px-5 sm:px-6 py-4 border-b sm:border-b-0 sm:border-r border-gray-50">
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {acc.type === "Credit Card" ? "Balance Owed" : "Current Balance"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {acc.balance}
                  </p>
                </div>
                <div className="flex-1 px-5 sm:px-6 py-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {acc.type === "Credit Card" ? "Available Credit" : "Available Balance"}
                  </p>
                  <p className="text-2xl font-bold text-green-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {acc.available}
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 border-t border-gray-50">
                {acc.stats.map((stat, j) => (
                  <div key={j} className={`px-4 sm:px-6 py-4 ${j < 2 ? "border-r border-gray-50" : ""}`}>
                    <p className="text-xs text-gray-400 font-medium mb-1 truncate">{stat.label}</p>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Open new account CTA */}
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition cursor-pointer">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Open a New Account
          </p>
          <p className="text-xs text-gray-400">Add another checking, savings, or investment account</p>
        </div>

      </div>
    </div>
  );
}