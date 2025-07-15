import Url from '../models/Url.js';

export const getMyUrls = async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const urls = await Url.find({ ownerWalletAddress: walletAddress });
    res.json({ urls: urls.map(u => ({
      shortCode: u.shortCode,
      customCode: u.customCode,
      originalUrl: u.originalUrl,
      clicks: u.clickCount,
      createdAt: u.createdAt,
      expiresAt: u.expiresAt,
      ownerWalletAddress: u.ownerWalletAddress
    })) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 