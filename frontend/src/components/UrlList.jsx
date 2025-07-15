import { useEffect, useState } from 'react';
import { getMyUrls, getStats } from '../services/api';
import { getUrlOwner } from '../services/blockchain';

function isExpired(expiresAt) {
  return expiresAt && new Date(expiresAt) < new Date();
}

function StatusBadge({ expired }) {
  return expired ? (
    <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold ml-2">Expired</span>
  ) : (
    <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold ml-2">Active</span>
  );
}

function FieldBadge({ value, color, children }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${color}`}>{children || value}</span>
  );
}

export default function UrlList({ walletAddress, provider }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({});
  const [owners, setOwners] = useState({});

  useEffect(() => {
    if (!walletAddress) {
      setUrls([]);
      setStats({});
      setOwners({});
      setError('');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    async function fetchUrls() {
      try {
        const data = await getMyUrls(walletAddress);
        setUrls(data);
        const statsObj = {};
        const ownersObj = {};
        for (const url of data) {
          try {
            statsObj[url.shortCode] = await getStats(url.shortCode);
            if (provider) {
              ownersObj[url.shortCode] = await getUrlOwner(provider, url.shortCode);
            }
          } catch {}
        }
        setStats(statsObj);
        setOwners(ownersObj);
      } catch {
        setError('Failed to load URLs');
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, [walletAddress, provider]);

  if (!walletAddress) return <div className="text-gray-500 mt-4">Connect your wallet to see your URLs.</div>;

  return (
    <div className="overflow-x-auto mt-4">
      {loading && <div>Loading URLs...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="min-w-[600px] w-full bg-white rounded-2xl shadow-lg border border-indigo-200">
        <thead>
          <tr>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2 rounded-tl-2xl">Short Code</th>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2">Custom Code</th>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2">Original URL</th>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2">Clicks</th>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2">Created At</th>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2">Expires At</th>
            <th className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-[15px] py-3 px-2 rounded-tr-2xl">Owner (on-chain)</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 && !loading && !error && (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-6">No URLs found for this wallet.</td>
            </tr>
          )}
          {urls.map((url, idx) => {
            const stat = stats[url.shortCode] || {};
            const expired = isExpired(stat.expiresAt || url.expiresAt);
            const rowClass = expired
              ? 'bg-red-50'
              : idx % 2 === 0
              ? 'bg-slate-50'
              : 'bg-white';
            const cellClass = 'py-2 px-2 align-middle';
            const linkClass = expired
              ? 'text-red-700 font-semibold underline'
              : 'text-blue-600 font-semibold underline';
            return (
              <tr key={url.shortCode} className={`${rowClass} hover:bg-indigo-50 transition-colors`}>
                <td className={`${cellClass} whitespace-nowrap`}>
                  <a href={`/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className={linkClass}>{url.shortCode}</a>
                  <StatusBadge expired={expired} />
                </td>
                <td className={cellClass}>
                  {url.customCode ? (
                    <FieldBadge color="bg-indigo-100 text-indigo-700">{url.customCode}</FieldBadge>
                  ) : (
                    <FieldBadge color="bg-gray-100 text-gray-500">None</FieldBadge>
                  )}
                </td>
                <td className={`${cellClass} max-w-[180px] truncate`}>
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>{url.originalUrl}</a>
                </td>
                <td className={cellClass}>
                  <FieldBadge color="bg-blue-100 text-blue-700">{stat.clicks ?? url.clickCount}</FieldBadge>
                </td>
                <td className={cellClass}>
                  <FieldBadge color="bg-green-100 text-green-700">{new Date(stat.createdAt || url.createdAt).toLocaleString()}</FieldBadge>
                </td>
                <td className={cellClass}>
                  {stat.expiresAt || url.expiresAt ? (
                    expired ? (
                      <FieldBadge color="bg-red-100 text-red-700">{new Date(stat.expiresAt || url.expiresAt).toLocaleDateString()}</FieldBadge>
                    ) : (
                      <FieldBadge color="bg-yellow-100 text-yellow-700">{new Date(stat.expiresAt || url.expiresAt).toLocaleDateString()}</FieldBadge>
                    )
                  ) : (
                    <FieldBadge color="bg-gray-100 text-gray-500">None</FieldBadge>
                  )}
                </td>
                <td className={cellClass}>
                  {owners[url.shortCode] ? (
                    <FieldBadge color="bg-indigo-100 text-indigo-700">{owners[url.shortCode].slice(0, 6) + '...' + owners[url.shortCode].slice(-4)}</FieldBadge>
                  ) : (
                    <FieldBadge color="bg-gray-100 text-gray-500">...</FieldBadge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 