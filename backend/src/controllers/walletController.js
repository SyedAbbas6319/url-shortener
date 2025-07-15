import Web3 from 'web3';
import User from '../models/User.js';

export const connectWallet = async (req, res) => {
  const { walletAddress, signature } = req.body;
  if (!walletAddress || !signature) {
    return res.status(400).json({ error: 'Missing walletAddress or signature' });
  }
  try {
    // Placeholder for signature verification
    // In production, verify signature using Web3
    // const web3 = new Web3();
    // const recovered = web3.eth.accounts.recover('Login to URL Shortener', signature);
    // if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }
    let user = await User.findOne({ walletAddress });
    if (!user) {
      user = await User.create({ walletAddress });
    }
    res.json({ success: true, message: 'Wallet connected successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 