"use client";

import Link from "next/link";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          The Registrar
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">

          <Link
            href="/dashboard"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            href="@/components/CertificateForm"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Issue
          </Link>

          <Link
            href="/verify"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Verify
          </Link>

        </div>

        {/* Wallet Connection */}
        <WalletConnect />

      </div>
    </nav>
  );
}