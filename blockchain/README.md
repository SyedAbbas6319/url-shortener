# Blockchain - URLRegistry Contract

## Overview
This directory contains the Solidity smart contract and deployment scripts for the URL shortener's blockchain integration.

---

## Contract
- `URLRegistry.sol` - Maps short codes to wallet addresses and tracks ownership on-chain.

---

## Deployment
1. Copy `.env.example` to `.env` and set your Sepolia RPC URL, private key, and contract address.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Deploy or interact with the contract using Hardhat scripts:
   ```sh
   npx hardhat run scripts/deploy.js --network sepolia
   ```

---

## Environment Variables
See `.env.example` for all required variables.

---

## Technical Notes
- Built with Solidity and Hardhat
- Deployed to Sepolia testnet
- Interacts with backend and frontend for ownership verification 