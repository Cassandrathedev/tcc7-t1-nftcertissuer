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