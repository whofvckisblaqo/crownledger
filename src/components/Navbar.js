"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20M6 20V10l6-7 6 7v10" />
              <path d="M10 20v-5h4v5" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-[18px] font-bold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Crownledger
            </span>
            <span
              className="text-[9px] font-medium text-gray-400 tracking-[2px] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Private Banking
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li><Link href="#features" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Features</Link></li>
          <li><Link href="#accounts" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Accounts</Link></li>
          <li><Link href="#pricing" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Pricing</Link></li>
          <li><Link href="#security" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">Security</Link></li>
          <li><Link href="#about" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition">About</Link></li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-200"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link href="#features" className="text-sm text-gray-600 font-medium hover:text-blue-600" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="#accounts" className="text-sm text-gray-600 font-medium hover:text-blue-600" onClick={() => setMenuOpen(false)}>Accounts</Link>
          <Link href="#pricing" className="text-sm text-gray-600 font-medium hover:text-blue-600" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="#security" className="text-sm text-gray-600 font-medium hover:text-blue-600" onClick={() => setMenuOpen(false)}>Security</Link>
          <Link href="/about" className="text-sm text-gray-600 font-medium hover:text-blue-600" onClick={() => setMenuOpen(false)}>About</Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link href="/login" className="text-sm font-medium text-center text-gray-600 border border-gray-200 py-2 rounded-lg hover:border-blue-300">Log in</Link>
            <Link href="/signup" className="text-sm font-medium text-center text-white bg-blue-600 py-2 rounded-lg hover:bg-blue-700">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}