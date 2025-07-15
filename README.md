# URL Shortener with Blockchain Ownership

## Overview
This is a full-stack URL shortener service with blockchain wallet integration. It allows users to shorten URLs, track analytics, and prove ownership of their links via a deployed smart contract. The project includes a modern React frontend, an Express/MongoDB backend, and a Solidity smart contract deployed to Sepolia.

---

## Features
- Shorten long URLs and generate unique short codes
- Custom short codes and expiration dates (optional)
- Redirect short URLs to original URLs
- Click analytics and creation date tracking
- Connect with MetaMask (Sepolia testnet)
- Store and verify URL ownership on-chain
- Rate limiting and input validation
- Modern, responsive frontend UI

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)
- MetaMask (browser extension, Sepolia testnet)

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd url-shortener
```

### 2. Backend Setup
```sh
cd backend
cp .env.example .env # Edit .env with your MongoDB URI and BASE_URL
npm install
npm start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

### 4. Blockchain Setup
- The Solidity contract (`URLRegistry.sol`) is deployed to Sepolia.
- Update contract address in frontend/backend if redeploying.
- See `blockchain/` for contract and deployment scripts.

---

## Usage
- Open the frontend (`http://localhost:5173` by default)
- Connect your MetaMask wallet (Sepolia)
- Shorten URLs, set custom codes/expiration, and view analytics
- All URLs are owned by your wallet and tracked on-chain

---

## Technical Choices
- **MERN Stack:** MongoDB, Express, React, Node.js for rapid full-stack development
- **Solidity + Hardhat:** For smart contract and Sepolia deployment
- **Ethers.js:** For frontend blockchain interaction
- **Tailwind CSS:** For modern, responsive UI
- **Modular Code:** Controllers, routes, and models are separated for maintainability
- **Testing:** Jest and Supertest for backend, including blockchain logic

---

## Assumptions & Shortcuts
- Wallet signature verification is stubbed (can be extended for production)
- Only Sepolia testnet is supported for blockchain features
- NFT/token-gated/advanced blockchain features are not implemented (bonus only)
- Rate limiting is in-memory (not distributed)
- Error handling and validation are robust but can be further extended

---

## Submission Instructions
1. **Create a GitHub repository** and push all source code and documentation
2. **Include this README** and all setup/config files
3. **Ensure the app runs locally** with the above instructions
4. **Document any further assumptions or shortcuts**
5. **Contact for questions or clarifications**

---

## License
MIT
