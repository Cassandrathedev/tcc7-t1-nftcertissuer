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
}