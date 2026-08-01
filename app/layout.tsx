import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "The Registrar",
    description:
        "A Web3 decentralized application for issuing and verifying NFT certificates on the Sepolia blockchain.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-100 text-gray-900">
                <div className="flex min-h-screen flex-col">
                    {/* Navigation */}
                    <Navbar />

                    {/* Main Content */}
                    <main className="container mx-auto flex-1 px-6 py-8">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="border-t bg-white py-6 text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} NFT Certificate Issuer • Powered by
                        Solidity, Foundry, Next.js & Sepolia
                    </footer>
                </div>
            </body>
        </html>
    );
}