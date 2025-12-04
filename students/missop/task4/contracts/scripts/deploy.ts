import { ethers } from "hardhat";

async function main() {
  const name = process.env.TOKEN_NAME || "Vibe Token";
  const symbol = process.env.TOKEN_SYMBOL || "VIBE";
  const decimals = 18n;
  const initialOwnerMint = ethers.parseUnits(process.env.INITIAL_OWNER_MINT || "1000000", Number(decimals));
  const faucetSupply = ethers.parseUnits(process.env.FAUCET_SUPPLY || "100000", Number(decimals));
  const claimAmount = ethers.parseUnits(process.env.CLAIM_AMOUNT || "100", Number(decimals));
  const cooldownSeconds = BigInt(process.env.COOLDOWN_SECONDS || "3600");
  const maxPerWallet = ethers.parseUnits(process.env.MAX_PER_WALLET || "1000", Number(decimals));

  const Vibe = await ethers.getContractFactory("VibeToken");
  const token = await Vibe.deploy(
    name,
    symbol,
    initialOwnerMint,
    faucetSupply,
    claimAmount,
    Number(cooldownSeconds),
    maxPerWallet
  );
  await token.waitForDeployment();
  console.log("Token deployed:", await token.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
