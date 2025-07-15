import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true, index: true },
  customCode: { type: String, unique: true, sparse: true }, // Optional custom code
  originalUrl: { type: String, required: true },
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }, // Optional expiration
  ownerWalletAddress: { type: String, required: true, index: true }
});

const Url = mongoose.model('Url', urlSchema);
export default Url; 