"use client";

import { useEffect, useState } from "react";
import { connectWallet, getAddress } from "@/lib/web3";

export default function WalletConnect() {
  const [address, setAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Connect Wallet
  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const { address } = await connectWallet();
      setAddress(address);
    } catch (error) {
      console.error("Wallet connection error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to connect wallet.");
      }
    }
  };
  // Disconnect Wallet
  const handleDisconnect = () => {
    setAddress("");
  }
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;
    // check if wallet is already connected
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      const walletAccounts = accounts as string[];
      if (walletAccounts.length > 0) {
        setAddress(walletAccounts[0]);
      }
    });

    // Listen for account changes
    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        setAddress("");
      } else {
        setAddress(accounts[0]);
      }
    };
    window.ethereum.on?.("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum?.removeListener?.(
        "accountsChanged", handleAccountsChanged);
    }
  }, []);

  return (
    <div className="flex items-center gap-3">
      {address ? (<>
        <span className="rounded bg-gray-100 px-3 py-2 text-sm">
          {address.slice(0, 6)}...
          {address.slice(-4)}
        </span>
        <button onClick={handleDisconnect} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Disconnect
        </button>
      </>
      ) : (
        <button onClick={handleConnect}
          disabled={isConnecting}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-gray-400">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}