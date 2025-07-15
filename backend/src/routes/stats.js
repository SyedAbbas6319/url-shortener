import express from 'express';
import { getUrlStats } from '../controllers/urlController.js';

const router = express.Router();

router.get('/:shortCode', getUrlStats);

export default router; 