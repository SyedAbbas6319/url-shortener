import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x32B1F2c5e8cd2198Cedb99311b3b99bc3c9B169c'; // Deployed Sepolia address
const CONTRACT_ABI = [
  // Only the functions/events we need
  "function getUrlOwner(string shortCode) view returns (address)",
  "function getUrlCreatedAt(string shortCode) view returns (uint256)",
  "function getUrlClicks(string shortCode) view returns (uint256)",
  "function getUserUrls(address user) view returns (string[] memory)",
  "event URLRegistered(address indexed owner, string shortCode, uint256 timestamp)",
  "event URLClicked(string shortCode, uint256 newClickCount)"
];

export const getContract = (provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getUrlOwner = async (provider, shortCode) => {
  const contract = getContract(provider);
  return await contract.getUrlOwner(shortCode);
};

export const getUrlCreatedAt = async (provider, shortCode) => {
  const contract = getContract(provider);
  const ts = await contract.getUrlCreatedAt(shortCode);
  return new Date(ts.toNumber() * 1000);
};

export const getUrlClicks = async (provider, shortCode) => {
  const contract = getContract(provider);
  return (await contract.getUrlClicks(shortCode)).toNumber();
}; 