import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-6 text-5xl font-bold text-blue-600">
        The Registrar
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        A decentralized Web3 application for issuing and verifying
        soulbound NFT certificates on the Ethereum Sepolia Testnet.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/issue"
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          Issue Certificate
        </Link>

        <Link
          href="/verify"
          className="rounded-lg bg-gray-800 px-6 py-3 text-white transition hover:bg-gray-900"
        >
          Verify Certificate
        </Link>
      </div>

      <section className="mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold">
            Secure Issuing
          </h2>

          <p className="text-gray-600">
            Only approved issuers can mint NFT certificates on the blockchain.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold">
            Immutable Records
          </h2>

          <p className="text-gray-600">
            Certificates are stored as soulbound NFTs and cannot be transferred.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold">
            Easy Verification
          </h2>

          <p className="text-gray-600">
            Verify certificate authenticity instantly using the NFT token ID.
          </p>
        </div>
      </section>
    </main>
  );
}