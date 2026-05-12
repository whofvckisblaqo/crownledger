"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import NotificationBell from "@/components/NotificationBell";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const [accRes, txRes] = await Promise.all([
        fetch("/api/user/accounts"),
        fetch("/api/user/transactions"),
      ]);
      const accData = await accRes.json();
      const txData = await txRes.json();
      setAccounts(accData.accounts || []);
      setTransactions(txData.transactions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checking = accounts.find((a) => a.type === "checking");
  const savings = accounts.find((a) => a.type === "savings");
  const totalBalance = (checking?.balance || 0) + (savings?.balance || 0);

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
      label: "Overview", href: "/dashboard",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    },
    {
      label: "Accounts", href: "/dashboard/accounts",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
    },
    {
      label: "Checking Account", href: "/dashboard/accounts/checking",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /></svg>,
    },
    {
      label: "Savings", href: "/dashboard/savings",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" /></svg>,
    },
    {
      label: "Credit Card", href: "/dashboard/card",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>,
    },
    {
      label: "Transfer", href: "/dashboard/transfer",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
    },
    {
      label: "Transactions", href: "/dashboard/transactions",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    },
    {
      label: "Settings", href: "/dashboard/settings",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>,
    },
    { label: "Statement", href: "/dashboard/statement", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>

        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20M6 20V10l6-7 6 7v10" /><path d="M10 20v-5h4v5" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[16px] font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Crownledger</span>
              <span className="text-[8px] font-medium text-gray-400 tracking-[2px] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>Private Banking</span>
            </div>
          </Link>
        </div>

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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
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
            <NotificationBell />
            <Link href="/dashboard/settings" className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading your accounts...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Balance cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Balance", value: `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, sub: "All accounts combined", color: "text-gray-900" },
                  { label: "Checking Account", value: `$${(checking?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, sub: checking?.accountNumber ? `****${checking.accountNumber.slice(-4)}` : "—", color: "text-gray-900" },
                  { label: "Savings Account", value: `$${(savings?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`, sub: savings?.accountNumber ? `****${savings.accountNumber.slice(-4)}` : "—", color: "text-gray-900" },
                  { label: "Credit Used", value: "$0.00", sub: "No credit balance", color: "text-gray-900" },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">{card.label}</p>
                    <p className={`text-2xl font-bold mb-1 ${card.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-400">{card.sub}</p>
                  </div>
                ))}
              </div>

              {/* Middle row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Credit card */}
                <div className="lg:col-span-1">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>My Card</h2>
                  <div className="bg-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-sm font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Crownledger</span>
                      <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-90" />
                    </div>
                    <p className="text-sm tracking-[3px] opacity-75 mb-4">•••• •••• •••• {checking?.accountNumber?.slice(-4) || "0000"}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-60 mb-1">Card Holder</p>
                        <p className="text-sm font-semibold">{session?.user?.firstName} {session?.user?.lastName}</p>
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
                      { label: "Send", href: "/dashboard/transfer", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> },
                      { label: "Savings", href: "/dashboard/savings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" /></svg> },
                      { label: "Pay", href: "/dashboard/card", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg> },
                    ].map((action, i) => (
                      <Link key={i} href={action.href} className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-xl p-3 hover:border-blue-200 hover:bg-blue-50 transition group">
                        <span className="text-gray-400 group-hover:text-blue-600 transition">{action.icon}</span>
                        <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Transactions */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>Recent Transactions</h2>
                    <Link href="/dashboard/transactions" className="text-xs text-blue-600 font-medium hover:underline">View all</Link>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100">
                    {transactions.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-500">No transactions yet</p>
                        <p className="text-xs text-gray-400 mt-1">Your transactions will appear here</p>
                        <Link href="/dashboard/transfer" className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium mt-3 hover:underline">
                          Make your first transfer →
                        </Link>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {transactions.slice(0, 5).map((tx, i) => {
                          const isCredit = tx.receiverAccount === checking?.accountNumber || tx.receiverAccount === savings?.accountNumber;
                          return (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm
                                ${isCredit ? "bg-green-50 text-green-500" : "bg-red-50 text-red-400"}`}>
                                {tx.type?.[0]?.toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{tx.description || tx.type}</p>
                                <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                              </div>
                              <p className={`text-sm font-semibold flex-shrink-0 ${isCredit ? "text-green-500" : "text-red-500"}`}>
                                {isCredit ? "+" : "-"}${tx.amount?.toFixed(2)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Account summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>Account Summary</h2>
                    <Link href="/dashboard/accounts" className="text-xs text-blue-600 font-medium hover:underline">View all</Link>
                  </div>
                  <div className="space-y-4">
                    {accounts.map((acc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${acc.type === "savings" ? "bg-green-100" : "bg-blue-100"}`}>
                            {acc.type === "savings" ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 capitalize">{acc.type} Account</p>
                            <p className="text-xs text-gray-400">****{acc.accountNumber?.slice(-4)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">${acc.balance?.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${acc.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                            {acc.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {accounts.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-400">No accounts found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Account Info</h2>
                  <div className="space-y-3">
                    {[
                      { label: "Full Name", value: `${session?.user?.firstName} ${session?.user?.lastName}` },
                      { label: "Email", value: session?.user?.email },
                      { label: "Account Type", value: "Premium" },
                      { label: "Total Accounts", value: accounts.length.toString() },
                      { label: "Total Transactions", value: transactions.length.toString() },
                      { label: "Member Since", value: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                        <span className="text-xs font-semibold text-gray-700 truncate max-w-[180px] text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}