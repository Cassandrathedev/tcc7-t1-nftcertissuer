"use client";

import { useEffect, useState } from "react";
import { connectWallet } from "@/lib/web3";

export default function WalletConnect() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

// Connect Wallet
  const handleConnect = async () => {
    try {
      setLoading(true);
      const { address } = await connectWallet();
      setAddress(address);
    } catch (error){
      console.error(error);
      alert("Failed to connect wallet.");
    } finally {
      setLoading(false);
    }
  };
// Disconnect Wallet
const handleDisconnect = () => {
  setAddress("");
}
useEffect(() => {
  if (typeof window === "undefined" || !window.ethereum) return;
// check if wallet is already connected
window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[])=> {
  if (accounts.length > 0) {
    setAddress(accounts[0]);
  }
  });
}, []);

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
    "accountsChange", handleAccountsChanged
  );
};
}