"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

 const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
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
    label: "Accounts",
    href: "/dashboard/accounts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    label: "Checking Account",
    href: "/dashboard/accounts/checking",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),
  },
  {
    label: "Savings",
    href: "/dashboard/savings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    label: "Credit Card",
    href: "/dashboard/card",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    label: "Transfer",
    href: "/dashboard/transfer",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

  const transactions = [
    { name: "Netflix Subscription", date: "Today, 9:14 AM", amount: "-$14.99", neg: true, icon: "N" },
    { name: "Direct Deposit", date: "Yesterday, 6:00 AM", amount: "+$5,200.00", neg: false, icon: "D" },
    { name: "Transfer to Sarah", date: "May 8, 2:32 PM", amount: "-$500.00", neg: true, icon: "T" },
    { name: "Amazon Purchase", date: "May 7, 11:20 AM", amount: "-$89.99", neg: true, icon: "A" },
    { name: "Freelance Payment", date: "May 6, 3:45 PM", amount: "+$1,200.00", neg: false, icon: "F" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>

        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20M6 20V10l6-7 6 7v10" />
                <path d="M10 20v-5h4v5" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[16px] font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Crownledger
              </span>
              <span className="text-[8px] font-medium text-gray-400 tracking-[2px] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Private Banking
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
            >
              <span className="group-hover:text-blue-600 transition-colors">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {session?.user?.firstName?.[0]}{session?.user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {session?.user?.firstName} {session?.user?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
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
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Good morning, {session?.user?.firstName} 👋
              </h1>
              <p className="text-xs text-gray-400">Here's what's happening with your account today.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {session?.user?.firstName?.[0]}{session?.user?.lastName?.[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">

          {/* Balance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Balance", value: "$84,250.00", change: "+$3,420.00", up: true, color: "blue" },
              { label: "Checking Account", value: "$12,430.00", change: "+$1,200.00", up: true, color: "green" },
              { label: "Savings Account", value: "$71,820.00", change: "+$2,220.00", up: true, color: "purple" },
              { label: "Credit Used", value: "$2,340.00", change: "-$340.00", up: false, color: "red" },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {card.value}
                </p>
                <p className={`text-xs font-semibold ${card.up ? "text-green-500" : "text-red-400"}`}>
                  {card.change} this month
                </p>
              </div>
            ))}
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Credit card */}
            <div className="lg:col-span-1">
              <h2 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                My Card
              </h2>
              <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-sm font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Crownledger
                  </span>
                  <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-90" />
                </div>
                <p className="text-sm tracking-[3px] opacity-75 mb-4">•••• •••• •••• 4821</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-60 mb-1">Card Holder</p>
                    <p className="text-sm font-semibold">
                      {session?.user?.firstName} {session?.user?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60 mb-1">Expires</p>
                    <p className="text-sm font-semibold">05 / 29</p>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  {
                    label: "Send",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    ),
                  },
                  {
                    label: "Receive",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    ),
                  },
                  {
                    label: "Pay",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    ),
                  },
                ].map((action, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-xl p-3 hover:border-blue-200 hover:bg-blue-50 transition group">
                    <span className="text-gray-400 group-hover:text-blue-600 transition">{action.icon}</span>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Recent Transactions
                </h2>
                <Link href="/dashboard/transactions" className="text-xs text-blue-600 font-medium hover:underline">
                  View all
                </Link>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                      ${tx.neg ? "bg-red-50 text-red-400" : "bg-green-50 text-green-500"}`}>
                      {tx.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{tx.name}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                    <p className={`text-sm font-semibold flex-shrink-0 ${tx.neg ? "text-red-500" : "text-green-500"}`}>
                      {tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row — Savings goal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Savings goal */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Savings Goal
                </h2>
                <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-lg">On Track</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                $71,820 <span className="text-sm text-gray-400 font-normal">/ $100,000</span>
              </p>
              <p className="text-xs text-gray-400 mb-4">Emergency Fund Goal</p>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "71.82%" }} />
              </div>
              <p className="text-xs text-gray-400 mt-2">71.82% completed</p>
            </div>

            {/* Spending summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Monthly Spending
                </h2>
                <span className="text-xs text-gray-400">May 2026</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Housing", amount: "$2,000", percent: 40, color: "bg-blue-500" },
                  { label: "Food & Dining", amount: "$650", percent: 13, color: "bg-purple-500" },
                  { label: "Transport", amount: "$320", percent: 6, color: "bg-green-500" },
                  { label: "Entertainment", amount: "$180", percent: 4, color: "bg-amber-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600">{item.label}</span>
                        <span className="text-xs font-semibold text-gray-900">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.percent * 2.5}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}