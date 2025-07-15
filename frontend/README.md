# Frontend - URL Shortener

## Overview
This is the React frontend for the URL shortener with blockchain wallet integration. It provides a modern, responsive UI for shortening URLs, connecting wallets, and viewing analytics.

---

## Setup
1. Copy `.env.example` to `.env` and set the backend URL and contract address.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```

---

## Environment Variables
See `.env.example` for all required variables.

---

## Usage
- Connect your MetaMask wallet (Sepolia)
- Shorten URLs, set custom codes/expiration, and view analytics
- All URLs are owned by your wallet and tracked on-chain

---

## Technical Notes
- Built with React, Vite, and Tailwind CSS
- Blockchain integration via Ethers.js
- Responsive and accessible design
