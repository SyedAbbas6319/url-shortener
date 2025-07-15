import Url from '../models/Url.js';
import { nanoid } from 'nanoid';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const shortenUrl = async (req, res) => {
  // Debug log to verify request body
  console.log('POST /api/shorten body:', req.body);
  const { url, walletAddress, customCode, expiresAt } = req.body;
  if (!url || !walletAddress) {
    return res.status(400).json({ error: 'Missing url or walletAddress' });
  }
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
  if (customCode && !/^[a-zA-Z0-9_-]{4,16}$/.test(customCode)) {
    return res.status(400).json({ error: 'Custom code must be 4-16 chars, alphanumeric, dash or underscore' });
  }
  if (expiresAt && isNaN(Date.parse(expiresAt))) {
    return res.status(400).json({ error: 'Invalid expiration date' });
  }
  try {
    // Check for duplicate (by originalUrl, wallet, and customCode)
    let existing = await Url.findOne({
      $or: [
        { originalUrl: url, ownerWalletAddress: walletAddress },
        customCode ? { customCode } : null
      ].filter(Boolean)
    });
    if (existing) {
      if (customCode && existing.customCode === customCode) {
        return res.status(409).json({ error: 'Custom code already taken' });
      }
      return res.json({ shortCode: existing.shortCode, shortUrl: `${BASE_URL}/${existing.shortCode}` });
    }
    // Use custom code or generate
    let shortCode = customCode || nanoid(7);
    // Ensure shortCode is unique
    while (await Url.findOne({ shortCode })) {
      shortCode = nanoid(7);
    }
    const newUrl = await Url.create({
      shortCode,
      customCode: customCode || undefined,
      originalUrl: url,
      ownerWalletAddress: walletAddress,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined
    });
    res.json({ shortCode, shortUrl: `${BASE_URL}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUrlStats = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: 'Short code not found' });
    res.json({
      originalUrl: url.originalUrl,
      clicks: url.clickCount,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      owner: url.ownerWalletAddress
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 