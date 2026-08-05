"use client";

import { useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import NFTCertissuer from "../contracts/out/NFTCertIssuer.sol/NFTCertIssuer.json";

const CONTRACT_ADDRESS =
process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const abi = NFTCertissuer.abi;

export default function VerifyResult(){

const[tokenId,setTokenId]=useState("");

const[result,setResult]=useState<any>(null);

async function verify(){

if(!window.ethereum){

alert("Install MetaMask");

return;

}

const provider=new BrowserProvider(window.ethereum);

const contract=new Contract(

CONTRACT_ADDRESS,

abi,

provider

);

try{

const cert=

await contract.getCertificate(tokenId);

const uri=

await contract.tokenURI(tokenId);

setResult({

name:cert[0],

course:cert[1],

issuedAt:new Date(

Number(cert[2])*1000

).toLocaleDateString(),

uri

});

}catch{

alert("Certificate not found.");

}

}

return(

<div className="space-y-5">

<input

className="w-full border rounded-lg p-3"

placeholder="Token ID"

value={tokenId}

onChange={(e)=>setTokenId(e.target.value)}

/>

<button

onClick={verify}

className="bg-blue-600 text-white rounded-lg p-3 w-full"

>

Verify Certificate

</button>

{result&&(

<div className="rounded-xl border p-6 bg-white">

<h2 className="font-bold text-xl mb-3">

Certificate Verified ✅

</h2>

<p>

<strong>Name:</strong>

{result.name}

</p>

<p>

<strong>Course:</strong>

{result.course}

</p>

<p>

<strong>Issued:</strong>

{result.issuedAt}

</p>

<p className="break-all">

<strong>Metadata:</strong>

{result.uri}

</p>

</div>

)}

</div>

);

}