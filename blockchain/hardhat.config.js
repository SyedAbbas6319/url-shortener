import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import '@nomiclabs/hardhat-ethers';

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export default {
  solidity: '0.8.20',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
