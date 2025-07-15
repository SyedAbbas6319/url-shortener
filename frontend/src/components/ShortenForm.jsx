import { useState } from 'react';
import { shortenUrl } from '../services/api';

export default function ShortenForm({ walletAddress, onShortened }) {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!url) return setError('Please enter a URL');
    if (!walletAddress) return setError('Connect your wallet first');
    if (customCode && !/^[a-zA-Z0-9_-]{4,16}$/.test(customCode)) {
      return setError('Custom code must be 4-16 chars, alphanumeric, dash or underscore');
    }
    setLoading(true);
    try {
      const data = await shortenUrl(url, walletAddress, customCode, expiresAt);
      setResult(data);
      setUrl('');
      setCustomCode('');
      setExpiresAt('');
      if (onShortened) onShortened(data.shortCode);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    }
    setLoading(false);
  };

  return (
    <div className="w-[90%] mx-auto mb-5 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-3 w-full justify-center items-center"
      >
        <input
          type="url"
          placeholder="Paste your long URL here"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-2 min-w-[180px] max-w-[320px] px-4 py-2.5 border-2 border-indigo-200 rounded-lg text-[15px] text-black outline-none transition-colors shadow-sm focus:border-indigo-400"
          required
        />
        <input
          type="text"
          placeholder="Custom code (optional)"
          value={customCode}
          onChange={e => setCustomCode(e.target.value)}
          className="flex-1 min-w-[120px] max-w-[160px] px-4 py-2.5 border-2 border-indigo-200 rounded-lg text-[15px] text-black outline-none transition-colors shadow-sm focus:border-indigo-400"
          maxLength={16}
        />
        <input
          type="date"
          placeholder="Expiration (optional)"
          value={expiresAt}
          onChange={e => setExpiresAt(e.target.value)}
          className="flex-1 min-w-[120px] max-w-[160px] px-4 py-2.5 border-2 border-indigo-200 rounded-lg text-[15px] text-black outline-none transition-colors shadow-sm focus:border-indigo-400"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2.5 rounded-lg font-semibold text-lg text-white shadow-md transition-colors ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result && (
        <div className="text-green-600 mt-2">
          Short URL: <a href={result.shortUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{result.shortUrl}</a>
        </div>
      )}
    </div>
  );
} 