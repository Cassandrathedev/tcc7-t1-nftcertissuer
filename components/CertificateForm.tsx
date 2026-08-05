"use client";

import { useState } from "react";
import { Contract } from "ethers";
import { getSigner } from "@/lib/web3";
import NFTCertissuer from "@/contracts/out/NFTCertissuer.sol/NFTCertissuer.json";

const CONTRACT_ADDRESS =
process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const abi = NFTCertissuer.abi;

export default function CertificateForm() {

  const [recipient,setRecipient]=useState("");
  const [recipientName,setRecipientName]=useState("");
  const [course,setCourse]=useState("");
  const [metadata,setMetadata]=useState("");

  async function issueCertificate(){

    try{

      const signer=await getSigner();

      const contract=new Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );

      const tx= await contract.issueCertificate(
        recipient,
        recipientName,
        course,
        metadata
      );

      await tx.wait();

      alert("Certificate successfully issued.");

    }catch(error){

      console.error(error);

      alert("Transaction failed.");

    }

  }

  return(

<div className="space-y-4">

<input
className="w-full border rounded-lg p-3"
placeholder="Recipient Wallet"
value={recipient}
onChange={(e)=>setRecipient(e.target.value)}
/>

<input
className="w-full border rounded-lg p-3"
placeholder="Recipient Name"
value={recipientName}
onChange={(e)=>setRecipientName(e.target.value)}
/>

<input
className="w-full border rounded-lg p-3"
placeholder="Course / Event"
value={course}
onChange={(e)=>setCourse(e.target.value)}
/>

<input
className="w-full border rounded-lg p-3"
placeholder="Metadata URI (IPFS)"
value={metadata}
onChange={(e)=>setMetadata(e.target.value)}
/>

<button
onClick={issueCertificate}
className="w-full rounded-lg bg-green-600 text-white p-3"
>

Issue Certificate

</button>

</div>

  );

}
