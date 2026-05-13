"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COINS = [
  { symbol: "BTC",   name: "Bitcoin",       id: "bitcoin",       color: "#f7931a", bg: "#fff7ed" },
  { symbol: "ETH",   name: "Ethereum",      id: "ethereum",      color: "#627eea", bg: "#f0f0ff" },
  { symbol: "USDT",  name: "Tether",        id: "tether",        color: "#26a17b", bg: "#f0fdf9" },
  { symbol: "BNB",   name: "BNB",           id: "binancecoin",   color: "#f3ba2f", bg: "#fffbeb" },
  { symbol: "SOL",   name: "Solana",        id: "solana",        color: "#9945ff", bg: "#faf5ff" },
  { symbol: "XRP",   name: "XRP",           id: "ripple",        color: "#00aae4", bg: "#f0faff" },
  { symbol: "USDC",  name: "USD Coin",      id: "usd-coin",      color: "#2775ca", bg: "#eff6ff" },
  { symbol: "ADA",   name: "Cardano",       id: "cardano",       color: "#0033ad", bg: "#eff6ff" },
  { symbol: "AVAX",  name: "Avalanche",     id: "avalanche-2",   color: "#e84142", bg: "#fff1f2" },
  { symbol: "DOGE",  name: "Dogecoin",      id: "dogecoin",      color: "#c2a633", bg: "#fefce8" },
  { symbol: "TRX",   name: "TRON",          id: "tron",          color: "#ef0027", bg: "#fff1f2" },
  { symbol: "LINK",  name: "Chainlink",     id: "chainlink",     color: "#2a5ada", bg: "#eff6ff" },
  { symbol: "DOT",   name: "Polkadot",      id: "polkadot",      color: "#e6007a", bg: "#fdf2f8" },
  { symbol: "MATIC", name: "Polygon",       id: "matic-network", color: "#8247e5", bg: "#faf5ff" },
  { symbol: "SHIB",  name: "Shiba Inu",     id: "shiba-inu",     color: "#ffa409", bg: "#fff7ed" },
  { symbol: "LTC",   name: "Litecoin",      id: "litecoin",      color: "#345d9d", bg: "#eff6ff" },
  { symbol: "BCH",   name: "Bitcoin Cash",  id: "bitcoin-cash",  color: "#8dc351", bg: "#f7fee7" },
  { symbol: "UNI",   name: "Uniswap",       id: "uniswap",       color: "#ff007a", bg: "#fdf2f8" },
  { symbol: "ATOM",  name: "Cosmos",        id: "cosmos",        color: "#2e3148", bg: "#f8fafc" },
  { symbol: "XLM",   name: "Stellar",       id: "stellar",       color: "#14b6e7", bg: "#f0faff" },
];

export default function CryptoPage() {
  const [wallet, setWallet] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [tab, setTab] = useState("portfolio");

  useEffect(() => {
    fetchWallet();
    fetchPrices();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await fetch("/api/user/crypto");
      const data = await res.json();
      setWallet(data.wallet);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async () => {
    setPricesLoading(true);
    try {
      const res = await fetch("/api/user/crypto/prices");
      const data = await res.json();
      setPrices(data.prices || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPricesLoading(false);
    }
  };

  const getPrice = (symbol) => {
    const coin = COINS.find((c) => c.symbol === symbol);
    if (!coin) return null;
    return prices.find((p) => p.id === coin.id);
  };

  const getBalance = (symbol) => {
    return wallet?.balances?.[symbol] || 0;
  };

  const getUSDValue = (symbol) => {
    const price = getPrice(symbol);
    const balance = getBalance(symbol);
    return price ? balance * price.current_price : 0;
  };

  const totalPortfolioValue = COINS.reduce(
    (sum, coin) => sum + getUSDValue(coin.symbol), 0
  );

  const filteredCoins = COINS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price) => {
    if (!price) return "$0.00";
    if (price >= 1) return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  const formatChange = (change) => {
    if (!change) return "0.00%";
    const isPos = change >= 0;
    return `${isPos ? "+" : ""}${change.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Crypto Wallet
            </h1>
            <p className="text-xs text-gray-400">Demo Account — Live Prices</p>
          </div>
        </div>
        <button
          onClick={fetchPrices}
          className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl hover:bg-blue-100 transition"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Demo notice */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 flex items-start gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-yellow-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Demo Crypto Account
            </p>
            <p className="text-xs text-yellow-700 mt-0.5 leading-relaxed">
              This is a demonstration crypto wallet with live market prices. All balances are for display purposes only and have no real monetary value.
            </p>
          </div>
        </div>

        {/* Portfolio summary */}
        <div
          className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Total Portfolio Value</p>
                <p className="text-5xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  ${totalPortfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-blue-300 text-sm mt-1">Demo Balance</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2">
                <p className="text-xs text-blue-200">Wallets</p>
                <p className="text-2xl font-bold text-white">{COINS.length}</p>
              </div>
            </div>

            {/* Top coins quick view */}
            <div className="grid grid-cols-4 gap-3">
              {COINS.slice(0, 4).map((coin) => {
                const price = getPrice(coin.symbol);
                const change = price?.price_change_percentage_24h || 0;
                return (
                  <div key={coin.symbol} className="bg-white/10 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 font-medium">{coin.symbol}</p>
                    <p className="text-sm font-bold text-white mt-1">
                      {formatPrice(price?.current_price)}
                    </p>
                    <p className={`text-xs font-semibold mt-0.5 ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {formatChange(change)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl border border-gray-100 p-1.5">
          {[
            { key: "portfolio", label: "My Portfolio" },
            { key: "market", label: "Market Prices" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition
                ${tab === t.key ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600"}`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search coins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
          />
        </div>

        {/* Portfolio tab */}
        {tab === "portfolio" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                My Wallets
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">All balances start at 0.00 — Demo account</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredCoins.map((coin) => {
                  const price = getPrice(coin.symbol);
                  const balance = getBalance(coin.symbol);
                  const usdValue = getUSDValue(coin.symbol);
                  const change = price?.price_change_percentage_24h || 0;

                  return (
                    <div
                      key={coin.symbol}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => setSelectedCoin(selectedCoin?.symbol === coin.symbol ? null : coin)}
                    >
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-base font-black"
                        style={{ background: coin.bg, color: coin.color }}
                      >
                        {coin.symbol.slice(0, 2)}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{coin.name}</p>
                        <p className="text-xs text-gray-400">{coin.symbol}</p>
                      </div>

                      {/* Balance */}
                      <div className="text-center hidden sm:block">
                        <p className="text-sm font-semibold text-gray-700">{balance.toFixed(6)}</p>
                        <p className="text-xs text-gray-400">{coin.symbol}</p>
                      </div>

                      {/* USD Value */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ${usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className={`text-xs font-semibold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {formatChange(change)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Market tab */}
        {tab === "market" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Live Market Prices
              </h3>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            </div>

            {pricesLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {["#", "Coin", "Price", "24h Change", "Market Cap", "Volume"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredCoins.map((coin, i) => {
                      const price = getPrice(coin.symbol);
                      const change = price?.price_change_percentage_24h || 0;

                      return (
                        <tr key={coin.symbol} className="hover:bg-gray-50 transition">
                          <td className="px-5 py-4">
                            <span className="text-xs text-gray-400 font-medium">{i + 1}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                                style={{ background: coin.bg, color: coin.color }}
                              >
                                {coin.symbol.slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{coin.name}</p>
                                <p className="text-xs text-gray-400">{coin.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                              {formatPrice(price?.current_price)}
                            </p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap
                              ${change >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                              {formatChange(change)}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-600 whitespace-nowrap">
                              ${(price?.market_cap || 0).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 2 })}
                            </p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-gray-600 whitespace-nowrap">
                              ${(price?.total_volume || 0).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 2 })}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Coin detail modal */}
        {selectedCoin && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center px-4" onClick={() => setSelectedCoin(null)}>
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div
                className="p-6 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${selectedCoin.color}dd, ${selectedCoin.color}99)` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                <button onClick={() => setSelectedCoin(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black mb-4 bg-white/20"
                  >
                    {selectedCoin.symbol.slice(0, 2)}
                  </div>
                  <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {selectedCoin.name}
                  </h2>
                  <p className="text-white/70 text-sm">{selectedCoin.symbol}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {(() => {
                  const price = getPrice(selectedCoin.symbol);
                  const balance = getBalance(selectedCoin.symbol);
                  const usdValue = getUSDValue(selectedCoin.symbol);
                  const change = price?.price_change_percentage_24h || 0;

                  return (
                    <>
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Current Price", value: formatPrice(price?.current_price) },
                          { label: "24h Change", value: formatChange(change), colored: true, change },
                          { label: "Market Cap", value: `$${(price?.market_cap || 0).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}` },
                          { label: "24h Volume", value: `$${(price?.total_volume || 0).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}` },
                          { label: "24h High", value: formatPrice(price?.high_24h) },
                          { label: "24h Low", value: formatPrice(price?.low_24h) },
                        ].map((stat, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400 font-medium mb-1">{stat.label}</p>
                            <p className={`text-sm font-bold ${stat.colored ? (stat.change >= 0 ? "text-green-500" : "text-red-500") : "text-gray-900"}`}>
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* My balance */}
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">My Balance</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              {balance.toFixed(6)}
                            </p>
                            <p className="text-xs text-gray-400">{selectedCoin.symbol}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              ${usdValue.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">USD Value</p>
                          </div>
                        </div>
                      </div>

                      {/* Demo notice */}
                      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                        <p className="text-xs text-yellow-700 text-center font-medium">
                          ⚠️ Demo account — balances are for display only
                        </p>
                      </div>

                      {/* Action buttons (demo) */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          className="py-3 rounded-xl text-sm font-semibold bg-green-50 text-green-600 border border-green-100 hover:bg-green-100 transition opacity-50 cursor-not-allowed"
                          disabled
                        >
                          Buy (Demo)
                        </button>
                        <button
                          className="py-3 rounded-xl text-sm font-semibold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition opacity-50 cursor-not-allowed"
                          disabled
                        >
                          Sell (Demo)
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}