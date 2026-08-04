const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;

// Upload image/file
export async function uploadFileToPinata(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return await res.json();
}

// Upload metadata JSON
export async function uploadMetadataToPinata(metadata: object) {
  const res = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!res.ok) {
    throw new Error("Metadata upload failed");
  }

  return await res.json();
}