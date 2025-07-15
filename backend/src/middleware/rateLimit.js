const rateLimitMap = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export default function rateLimit(req, res, next) {
  const wallet = req.body.walletAddress || req.query.walletAddress;
  if (!wallet) return next();
  const now = Date.now();
  let entry = rateLimitMap.get(wallet);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { count: 1, start: now };
  } else {
    entry.count++;
  }
  rateLimitMap.set(wallet, entry);
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
  }
  next();
} 