import express from 'express';
import { getMyUrls } from '../controllers/myUrlsController.js';

const router = express.Router();

router.get('/:walletAddress', getMyUrls);

export default router; 