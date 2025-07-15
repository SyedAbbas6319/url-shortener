import express from 'express';
import { shortenUrl } from '../controllers/urlController.js';
import rateLimit from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/', rateLimit, shortenUrl);

export default router; 