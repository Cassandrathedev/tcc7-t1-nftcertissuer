<<<<<<< HEAD
import { ethers } from "ethers";

export const connectWallet = async() => {
    if(!window.ethereum) throw new Error("Metamask is not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address};
};
=======
"use client"

import { ethers } from "ethers";
import { chainStreams } from "next/dist/server/app-render/stream-ops.web";

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

export async function connectWallet() {
    console.log(window.ethereum);
    const provider = await getProvider();
    if (typeof window === "undefined") {
        throw new Error("Wallet is not available.")
    }
    if (!window.ethereum) {
        throw new Error("Metamask is not installed.")
    }
    try {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: SEPOLIA_CHAIN_ID }],
  });
} catch (error: any) {
  if (error.code === 4902) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [ 
        {
            chainId: "0xaa36a",
            chainName: "Sepolia",
            nativeCurrency: {
                name: "Sepolia ETH",
                symbol: "ETH",
                decimals: 18
            },
            rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"]
        }
      ]
    });
  } else {
    throw error;
    }
}
    const signer = await provider.getSigner();
    return {
        provider, signer, address: await signer.getAddress(),
    }
};
export async function getAddress(): Promise<string | null> {
    if (!window.ethereum) return null;

    const provider = await getProvider();
    const signer = await provider.getSigner();

    try {
        return await signer.getAddress();
    } catch {
        return null;
    }
}
>>>>>>> origin/development
