import { useState } from 'react';
import WalletConnect from './components/WalletConnect.jsx';
import ShortenForm from './components/ShortenForm.jsx';
import UrlList from './components/UrlList.jsx';
import { ethers } from 'ethers';

function App() {
  const [wallet, setWallet] = useState('');
  const [provider, setProvider] = useState(null);

  // Handle wallet connection and set ethers provider
  const handleWalletConnect = (address) => {
    setWallet(address);
    if (window.ethereum) {
      setProvider(new ethers.BrowserProvider(window.ethereum));
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>URL Shortener with Blockchain Ownership</h1>
      <p style={{ color: '#555', marginBottom: 24 }}>
        Shorten your URLs, track analytics, and prove ownership on the blockchain.<br/>
        Bonus: Custom short codes, expiration dates, and rate limiting included!
      </p>
      <WalletConnect onConnect={handleWalletConnect} />
      <ShortenForm walletAddress={wallet} />
      <UrlList walletAddress={wallet} provider={provider} />
      <footer style={{ marginTop: 40, fontSize: 12, color: '#888' }}>
        Powered by React, Ethers.js, MongoDB, and Solidity (Sepolia)<br/>
        <a href="https://github.com/your-repo-url" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </footer>
    </div>
  );
}

export default App; 