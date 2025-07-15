import express from 'express';
import Url from '../models/Url.js';

const router = express.Router();

// GET /:shortCode
router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).send('Short code not found');
    // Check expiration
    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      return res.status(410).send('This short URL has expired');
    }
    url.clickCount += 1;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router; 