# Backend - URL Shortener

## Overview
This is the backend for the URL shortener service with blockchain wallet integration. It provides REST API endpoints, MongoDB storage, and interacts with the deployed smart contract.

---

## Setup
1. Copy `.env.example` to `.env` and fill in your MongoDB URI, BASE_URL, and blockchain settings.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

---

## Environment Variables
See `.env.example` for all required variables.

---

## API Endpoints
- `POST /api/shorten` - Shorten a URL
- `GET /api/stats/:shortCode` - Get analytics for a short URL
- `GET /:shortCode` - Redirect to the original URL
- `POST /api/connect-wallet` - Connect and verify wallet
- `GET /api/my-urls/:walletAddress` - List all URLs owned by a wallet

---

## Technical Notes
- Built with Express.js and Mongoose
- Rate limiting and input validation included
- Blockchain integration via Web3/Ethers.js
- See `blockchain/` for contract details 