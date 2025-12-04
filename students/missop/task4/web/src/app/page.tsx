"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { useState } from "react";
import { VIBE_ABI } from "../lib/abi";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;

export default function Home() {
  const { isConnected } = useAccount();

  const { data: decimals } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: VIBE_ABI,
    functionName: "decimals",
  });

  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const claim = () => writeContract({ address: TOKEN_ADDRESS, abi: VIBE_ABI, functionName: "claim", args: [] });

  const transfer = () => {
    if (!decimals) return;
    writeContract({
      address: TOKEN_ADDRESS,
      abi: VIBE_ABI,
      functionName: "transfer",
      args: [to as `0x${string}`, parseUnits(amount || "0", decimals)],
    });
  };

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Vibe Token DApp</h2>
        <ConnectButton />
      </div>

      <section style={{ marginTop: 24, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <h3>Claim</h3>
        <button disabled={!isConnected || isPending || confirming} onClick={claim}>
          {isPending ? "Submitting..." : confirming ? "Confirming..." : "Claim Tokens"}
        </button>
        {isSuccess && <p>Claimed!</p>}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </section>

      <section style={{ marginTop: 24, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <h3>Transfer</h3>
        <input placeholder="Recipient 0x..." value={to} onChange={(e) => setTo(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />
        <button disabled={!isConnected || isPending || confirming} onClick={transfer}>
          {isPending ? "Submitting..." : confirming ? "Confirming..." : "Send"}
        </button>
      </section>
    </main>
  );
}
