// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VibeToken is ERC20, Ownable {
    uint256 public immutable claimAmount;
    uint256 public immutable cooldownSeconds;
    uint256 public immutable maxPerWallet;
    uint256 public immutable faucetSupply;

    mapping(address => uint256) public claimedTotal;
    mapping(address => uint256) public lastClaimAt;
    uint256 public faucetDistributed;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialOwnerMint,
        uint256 faucetSupply_,
        uint256 claimAmount_,
        uint256 cooldownSeconds_,
        uint256 maxPerWallet_
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        require(faucetSupply_ > 0, "faucetSupply=0");
        require(claimAmount_ > 0, "claimAmount=0");
        require(maxPerWallet_ >= claimAmount_, "maxPerWallet < claim");

        _mint(msg.sender, initialOwnerMint);
        _mint(address(this), faucetSupply_);

        faucetSupply = faucetSupply_;
        claimAmount = claimAmount_;
        cooldownSeconds = cooldownSeconds_;
        maxPerWallet = maxPerWallet_;
    }

    function claim() external {
        require(block.timestamp >= lastClaimAt[msg.sender] + cooldownSeconds, "cooldown");
        require(claimedTotal[msg.sender] + claimAmount <= maxPerWallet, "wallet cap");
        require(faucetDistributed + claimAmount <= faucetSupply, "faucet empty");

        lastClaimAt[msg.sender] = block.timestamp;
        claimedTotal[msg.sender] += claimAmount;
        faucetDistributed += claimAmount;

        _transfer(address(this), msg.sender, claimAmount);
    }
}
