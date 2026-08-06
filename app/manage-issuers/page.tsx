"use client";

import { useState } from "react";
import { Contract } from "ethers";
import { getSigner } from "@/lib/web3";
import NFTCertIssuer from "@/contracts/out/NFTCertIssuer.sol/NFTCertIssuer.json";

const CONTRACT_ADDRESS = "0x3DE3b3f37ef694160AB857371311c3BD9673BA28";

export default function ManageIssuersPage() {
  const [issuerAddress, setIssuerAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const abi = NFTCertIssuer.abi;

  async function addIssuer() {
    if (!issuerAddress) {
      alert("Enter an issuer wallet address.");
      return;
    }

    try {
      setLoading(true);

      const signer = await getSigner();
      console.log("Connected Wallet:", await signer.getAddress());

      const contract = new Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );

      const owner = await contract.owner();
      console.log("Contract Owner:", owner);

      const tx = await contract.addIssuer(issuerAddress);

      await tx.wait();

      alert("Issuer added successfully.");

      setIssuerAddress("");
    } catch (error: any) {
      console.error(error);
      alert(error.shortMessage || error.message);
    }
  }

  async function removeIssuer() {
    if (!issuerAddress) {
      alert("Enter an issuer wallet address.");
      return;
    }

    try {
      setLoading(true);

      const signer = await getSigner();

      const contract = new Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx = await contract.removeIssuer(issuerAddress);

      await tx.wait();

      alert("Issuer removed successfully.");

      setIssuerAddress("");
    } catch (error: any) {
      console.error(error);
      alert("Failed to remove issuer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-2xl py-10">
      <div className="card space-y-6">
        <h1 className="section-title">
          Manage Issuers
        </h1>

        <div className="form-group">
          <label className="form-label">
            Issuer Wallet Address
          </label>

          <input
            type="text"
            placeholder="0x..."
            value={issuerAddress}
            onChange={(e) => setIssuerAddress(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={addIssuer}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Processing..." : "Add Issuer"}
          </button>

          <button
            onClick={removeIssuer}
            disabled={loading}
            className="btn-danger"
          >
            {loading ? "Processing..." : "Remove Issuer"}
          </button>
        </div>
      </div>
    </main>
  );
}