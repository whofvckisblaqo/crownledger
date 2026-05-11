"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SavingsPage() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [depositError, setDepositError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [checkingAccount, setCheckingAccount] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accRes, txRes] = await Promise.all([
        fetch("/api/user/accounts"),
        fetch("/api/user/transactions"),
      ]);
      const accData = await accRes.json();
      const txData = await txRes.json();
      const savings = accData.accounts?.find((a) => a.type === "savings");
      const checking = accData.accounts?.find((a) => a.type === "checking");
      setAccount(savings || null);
      setCheckingAccount(checking || null);
      setTransactions(txData.transactions?.filter(tx =>
        tx.receiverAccount === savings?.accountNumber ||
        tx.senderAccount === savings?.accountNumber
      ) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const estimatedYearlyInterest = ((account?.balance || 0) * 0.05).toFixed(2);
  const estimatedMonthlyInterest = ((account?.balance || 0) * 0.05 / 12).toFixed(2);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setDepositError("");
    setDepositSuccess("");

    if (!depositAmount || Number(depositAmount) <= 0) {
      setDepositError("Please enter a valid amount.");
      return;
    }
    if (Number(depositAmount) > (checkingAccount?.balance || 0)) {
      setDepositError("Insufficient funds in your checking account.");
      return;
    }

    setDepositLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDepositLoading(false);
    setDepositSuccess(`$${Number(depositAmount).toFixed(2)} deposited successfully! Contact support to process this transfer.`);
    setDepositAmount("");
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setWithdrawError("");
    setWithdrawSuccess("");

    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      setWithdrawError("Please enter a valid amount.");
      return;
    }
    if (Number(withdrawAmount) > (account?.balance || 0)) {
      setWithdrawError("Insufficient funds in your savings account.");
      return;
    }

    setWithdrawLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setWithdrawLoading(false);
    setWithdrawSuccess(`Withdrawal request submitted. Contact support to process this transfer.`);
    setWithdrawAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Savings Account</h1>
          <p className="text-xs text-gray-400">5.00% APY — High Yield Savings</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Balance hero */}
            <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-2">Total Savings Balance</p>
                  <p className="text-5xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    ${(account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-blue-200 text-sm">
                    Est. monthly interest: <span className="text-white font-semibold">${estimatedMonthlyInterest}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="bg-white/10 rounded-2xl px-5 py-3 text-center">
                    <p className="text-blue-200 text-xs font-medium mb-1">Annual Yield (APY)</p>
                    <p className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>5.00%</p>
                  </div>
                  <p className="text-blue-200 text-xs text-center sm:text-right">
                    Estimated yearly: <span className="text-white font-semibold">${estimatedYearlyInterest}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Account Number", value: account ? `****${account.accountNumber?.slice(-4)}` : "—", color: "text-gray-900" },
                { label: "Interest Rate", value: "5.00% APY", color: "text-green-500" },
                { label: "Est. Monthly Interest", value: `$${estimatedMonthlyInterest}`, color: "text-green-500" },
                { label: "Status", value: account?.status || "Active", color: "text-blue-600" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 font-medium mb-2 leading-tight">{stat.label}</p>
                  <p className={`text-lg font-bold capitalize ${stat.color}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {["overview", "deposit", "withdraw", "history"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-max px-4 sm:px-6 py-4 text-sm font-semibold capitalize transition border-b-2
                      ${activeTab === tab ? "text-blue-600 border-blue-600 bg-blue-50/50" : "text-gray-400 border-transparent hover:text-gray-600"}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">

                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-800 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Interest Projection</p>
                          <p className="text-xs text-green-700 leading-relaxed">
                            At your current balance of ${(account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} with 5.00% APY,
                            you'll earn approximately <span className="font-bold">${estimatedYearlyInterest}</span> in interest over the next 12 months.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                      <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>Account Details</h3>
                      {[
                        { label: "Account Type", value: "High Yield Savings" },
                        { label: "Account Number", value: account ? `****${account.accountNumber?.slice(-4)}` : "—" },
                        { label: "Currency", value: "USD" },
                        { label: "Status", value: account?.status || "Active" },
                        { label: "Interest Rate", value: "5.00% APY" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                          <span className="text-xs text-gray-400">{item.label}</span>
                          <span className="text-xs font-semibold text-gray-700 capitalize">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deposit */}
                {activeTab === "deposit" && (
                  <form onSubmit={handleDeposit} className="max-w-md space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Deposit to Savings</h3>
                      <p className="text-sm text-gray-500">Transfer from your checking account.</p>
                    </div>

                    {depositError && (
                      <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {depositError}
                      </div>
                    )}
                    {depositSuccess && (
                      <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {depositSuccess}
                      </div>
                    )}

                    <div className="bg-gray-50 rounded-2xl p-6 text-center">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Amount to Deposit</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>$</span>
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => { setDepositAmount(e.target.value); setDepositError(""); setDepositSuccess(""); }}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="text-5xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-48 placeholder-gray-300"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        Available in checking: <span className="font-semibold text-gray-600">
                          ${(checkingAccount?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {["100", "500", "1000", "2000"].map((amt) => (
                        <button key={amt} type="button" onClick={() => setDepositAmount(amt)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition
                            ${depositAmount === amt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <button type="submit" disabled={depositLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {depositLoading ? (
                        <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Processing...</>
                      ) : "Request Deposit"}
                    </button>
                  </form>
                )}

                {/* Withdraw */}
                {activeTab === "withdraw" && (
                  <form onSubmit={handleWithdraw} className="max-w-md space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Withdraw from Savings</h3>
                      <p className="text-sm text-gray-500">Transfer to your checking account.</p>
                    </div>

                    {withdrawError && (
                      <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {withdrawError}
                      </div>
                    )}
                    {withdrawSuccess && (
                      <div className="bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {withdrawSuccess}
                      </div>
                    )}

                    <div className="bg-gray-50 rounded-2xl p-6 text-center">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Amount to Withdraw</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>$</span>
                        <input
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => { setWithdrawAmount(e.target.value); setWithdrawError(""); setWithdrawSuccess(""); }}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="text-5xl font-bold text-gray-900 bg-transparent border-none outline-none text-center w-48 placeholder-gray-300"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        Available in savings: <span className="font-semibold text-gray-600">
                          ${(account?.balance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {["100", "500", "1000", "2000"].map((amt) => (
                        <button key={amt} type="button" onClick={() => setWithdrawAmount(amt)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition
                            ${withdrawAmount === amt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <button type="submit" disabled={withdrawLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {withdrawLoading ? (
                        <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Processing...</>
                      ) : "Request Withdrawal"}
                    </button>
                  </form>
                )}

                {/* History */}
                {activeTab === "history" && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Savings Transaction History</h3>
                    {transactions.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-sm text-gray-400">No savings transactions yet</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {transactions.map((tx, i) => {
                          const isCredit = tx.receiverAccount === account?.accountNumber || tx.type === "deposit";
                          return (
                            <div key={i} className="flex items-center gap-4 py-3.5 hover:bg-gray-50 rounded-xl px-2 transition">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                ${isCredit ? "bg-green-50" : "bg-red-50"}`}>
                                {isCredit ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                  </svg>
                                ) : (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 capitalize">{tx.description || tx.type}</p>
                                <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                              </div>
                              <div className="text-right">
                                <p className={`text-sm font-bold ${isCredit ? "text-green-500" : "text-red-500"}`}>
                                  {isCredit ? "+" : "-"}${tx.amount?.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-400 capitalize">{tx.status}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}