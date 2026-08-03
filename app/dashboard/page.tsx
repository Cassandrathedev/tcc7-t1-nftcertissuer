"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAddress } from "@/lib/web3";
import { getContract } from "@/lib/contract";

export default function DashboardPage() {
  const [wallet, setWallet] = useState("");
  const [issuer, setIssuer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const address = await getAddress();

        if (address) {
          setWallet(address);

          const contract = await getContract();
          const approved = await contract.isIssuer(address);

          setIssuer(approved);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <main className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Manage and verify NFT certificates issued on the Sepolia blockchain.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-sm text-gray-500">
            Wallet
          </h2>

          <p className="mt-3 font-semibold text-blue-600">

            {wallet
              ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
              : "Not Connected"}

          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-sm text-gray-500">
            Status
          </h2>

          <p
            className={`mt-3 font-semibold ${issuer ? "text-green-600" : "text-red-600"
              }`}
          >
            {loading
              ? "Checking..."
              : issuer
                ? "Approved Issuer"
                : "Not an Issuer"}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="text-sm text-gray-500">
            Network
          </h2>

          <p className="mt-3 font-semibold text-purple-600">
            Sepolia Testnet
          </p>

        </div>

      </section>

      {/* Quick Actions */}
      <section className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <Link
            href="/issue"
            className="rounded-lg bg-blue-600 p-4 text-center text-white transition hover:bg-blue-700"
          >
            Issue Certificate
          </Link>

          <Link
            href="/verify"
            className="rounded-lg bg-green-600 p-4 text-center text-white transition hover:bg-green-700"
          >
            Verify Certificate
          </Link>

        </div>

      </section>

      {/* About */}
      <section className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-4 text-2xl font-semibold">
          About this dApp
        </h2>

        <div className="space-y-3 text-gray-700">

          <p>
            • Issue soulbound NFT certificates to students or event participants.
          </p>

          <p>
            • Certificates are permanently recorded on the Ethereum Sepolia Testnet.
          </p>

          <p>
            • Metadata is stored on IPFS through Pinata.
          </p>

          <p>
            • Only approved issuers can mint certificates.
          </p>

          <p>
            • Certificates cannot be transferred because they are soulbound NFTs.
          </p>

        </div>

      </section>

    </main>
  );
}