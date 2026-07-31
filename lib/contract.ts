"use client";

import { Contract } from "ethers";
import { getProvider, getSigner } from "./web3";
import contractABI from "./abi.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export async function getContract() {
  const provider = await getProvider();

  return new Contract(
    CONTRACT_ADDRESS,
    contractABI,
    provider
  );
}

export async function getWritableContract() {
  const signer = await getSigner();

  return new Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer
  );
}

export async function issueCertificate(
  recipient: string,
  recipientName: string,
  courseOrEvent: string,
  metadataURI: string
) {
  const contract = await getWritableContract();

  const tx = await contract.issueCertificate(
    recipient,
    recipientName,
    courseOrEvent,
    metadataURI
  );

  await tx.wait();

  return tx;
}