"use client";

import { Contract } from "ethers";
import { getProvider, getSigner } from "../lib/web3";
import NFTCertissuer from "../contracts/out/NFTCertIssuer.sol/NFTCertIssuer.json";

const CONTRACT_ADDRESS = "0x5707c788F4A16fd33F57C961602Cef5C7Dff33aB";
const contractABI = NFTCertissuer.abi;

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

export async function getCertificate(tokenId: number) {
  const contract = await getContract();

  const certificate = await contract.getCertificate(tokenId);

  return {
    recipientName: certificate[0],
    courseOrEvent: certificate[1],
    issuedAt: Number(certificate[2]),
  };
}

export async function getTokenURI(tokenId: number) {
  const contract = await getContract();

  return await contract.tokenURI(tokenId);
}

export async function revokeCertificate(tokenId: number) {
  const contract = await getWritableContract();

  const tx = await contract.revokeCertificate(tokenId);

  await tx.wait();

  return tx;
}

export async function removeIssuer(address: string) {
  const contract = await getWritableContract();

  const tx = await contract.removeIssuer(address);

  await tx.wait();

  return tx;
}

export async function isIssuer(address: string) {
  const contract = await getContract();

  return await contract.isIssuer(address);
}

export async function getOwner() {
  const contract = await getContract();

  return await contract.owner();
}