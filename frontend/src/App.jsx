import { useState, useMemo } from 'react';
import WalletConnect from './components/WalletConnect.jsx';
import ShortenForm from './components/ShortenForm.jsx';
import UrlList from './components/UrlList.jsx';
import { ethers } from 'ethers';
import './index.css';

function App() {
  const [wallet, setWallet] = useState('');
  // Memoize provider to prevent infinite re-renders
  const provider = useMemo(() => {
    if (window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }
    return null;
  }, [window.ethereum]);

  // Handle wallet connection and set ethers provider
  const handleWalletConnect = (address) => {
    setWallet(address);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex flex-col items-center justify-center p-0 m-0">
      <header className="w-screen bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-center rounded-b-3xl shadow-md mb-0">
        <h1 className="m-0 font-bold text-3xl sm:text-4xl tracking-tight py-6">🔗 URL Shortener</h1>
        <div className="text-base opacity-95 mt-2 pb-4">
          Blockchain Ownership • Analytics • Custom Codes • Expiration
        </div>
      </header>
      <main className="bg-white rounded-2xl shadow-xl p-8 w-[90%] flex flex-col items-stretch box-border my-8 mx-4 sm:mx-auto">
        <WalletConnect onConnect={handleWalletConnect} />
        <ShortenForm walletAddress={wallet} />
        <UrlList walletAddress={wallet} provider={provider} />
      </main>
      <footer className="mt-10 text-sm text-gray-500 text-center w-screen pb-4">
        Powered by React, Ethers.js, MongoDB, and Solidity (Sepolia)<br/>
        <a href="https://github.com/your-repo-url" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">View on GitHub</a>
      </footer>
    </div>
  );
}

export default App;
