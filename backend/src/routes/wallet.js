import express from 'express';
import { connectWallet } from '../controllers/walletController.js';

const router = express.Router();

router.post('/', connectWallet);

export default router; 