"use client";

import { useState } from "react";
import { Contract, ethers } from "ethers";
import { getSigner } from "../lib/web3";
import NFTCertissuer from "../contracts/out/NFTCertIssuer.sol/NFTCertIssuer.json";

const CONTRACT_ADDRESS = "0x3DE3b3f37ef694160AB857371311c3BD9673BA28";

const abi = NFTCertissuer.abi;

export default function CertificateForm() {

  const [recipient,setRecipient]=useState("");
  const [recipientName,setRecipientName]=useState("");
  const [course,setCourse]=useState("");
  const [metadata,setMetadata]=useState("");

  async function issueCertificate(){

    try{

      const signer=await getSigner();

      console.log(CONTRACT_ADDRESS);
      const contract= new Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );

      const metadataURI = `ipfs://${metadata}`;

      const tx = await contract.issueCertificate(
        ethers.getAddress(recipient.trim()),
        recipientName.trim(),
        course.trim(),
        metadataURI
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
type="text"
className="w-full border rounded-lg p-3"
placeholder="Recipient Wallet"
value={recipient}
onChange={(e)=>setRecipient(e.target.value)}
/>

<input
type="text"
className="w-full border rounded-lg p-3"
placeholder="Recipient Name"
value={recipientName}
onChange={(e)=>setRecipientName(e.target.value)}
/>

<input
type="text"
className="w-full border rounded-lg p-3"
placeholder="Course / Event"
value={course}
onChange={(e)=>setCourse(e.target.value)}
/>

<input
type="text"
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