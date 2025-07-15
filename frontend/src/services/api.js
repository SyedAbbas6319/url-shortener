import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // Change if backend is hosted elsewhere

export const shortenUrl = async (url, walletAddress, customCode, expiresAt) => {
  const res = await axios.post(`${API_BASE}/api/shorten`, { url, walletAddress, customCode, expiresAt });
  return res.data;
};

export const getStats = async (shortCode) => {
  const res = await axios.get(`${API_BASE}/api/stats/${shortCode}`);
  return res.data;
};

export const connectWalletApi = async (walletAddress, signature) => {
  const res = await axios.post(`${API_BASE}/api/connect-wallet`, { walletAddress, signature });
  return res.data;
};

export const getMyUrls = async (walletAddress) => {
  const res = await axios.get(`${API_BASE}/api/my-urls/${walletAddress}`);
  return res.data.urls;
}; 