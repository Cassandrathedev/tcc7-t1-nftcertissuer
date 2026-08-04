"use client";

import CertificateForm from "@/components/CertificateForm";

export default function IssuePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-blue-600">
          Issue NFT Certificate
        </h1>

        <p className="mb-8 text-gray-600">
          Fill in the recipient's details below to mint a soulbound NFT
          certificate on the Ethereum Sepolia Testnet.
        </p>

        <CertificateForm />
      </div>
    </main>
  );
}