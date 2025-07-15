import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import shortenRoute from './routes/shorten.js';
import statsRoute from './routes/stats.js';
import walletRoute from './routes/wallet.js';
import myUrlsRoute from './routes/myUrls.js';
import redirectRoute from './routes/redirect.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/shorten', shortenRoute);
app.use('/api/stats', statsRoute);
app.use('/api/connect-wallet', walletRoute);
app.use('/api/my-urls', myUrlsRoute);
app.use('/', redirectRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
