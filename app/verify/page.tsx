"use client";

import VerifyResult from "@/components/VerifyResult";

export default function VerifyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-green-600">
          Verify NFT Certificate
        </h1>

        <p className="mb-8 text-gray-600">
          Enter a certificate Token ID to verify its authenticity on the
          blockchain.
        </p>

        <VerifyResult />
      </div>
    </main>
  );
}