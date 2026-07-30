"use client"

import { ethers } from "ethers";

const SEPOLIA_CHAIN_ID = "0xaa36a";

export async function getProvider() {
    if (typeof window === "undefined") {
        throw new Error("Window is not available");
    }
    if (!window.ethereum) {
        throw new Error("Metamask is not installed.")
    }
    return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
    const provider = await getProvider();
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length === 0) {
        throw new Error("Wallet not connected");
    }
    return await provider.getSigner();
}