import { useState, useEffect } from 'react';

const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Hex for 11155111
const SEPOLIA_PARAMS = {
  chainId: SEPOLIA_CHAIN_ID,
  chainName: 'Sepolia Test Network',
  nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/q0bkxByPgXyYVFa-fIlbk'],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};

export default function WalletConnect({ onConnect }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [network, setNetwork] = useState('');
  const [connecting, setConnecting] = useState(false);

  // Auto-connect if already authorized and set up listeners only once
  useEffect(() => {
    if (!window.ethereum) return;

    async function checkConnection() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts[0]) {
          setAddress(accounts[0]);
          if (onConnect) onConnect(accounts[0]);
        }
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setNetwork(currentChainId);
      } catch {}
    }
    checkConnection();

    // Named handlers for cleanup
    const handleAccountsChanged = (accounts) => {
      setAddress(accounts[0] || '');
      if (onConnect) onConnect(accounts[0] || '');
    };
    const handleChainChanged = (chainId) => {
      setNetwork(chainId);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Cleanup listeners on unmount
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [onConnect]);

  const connect = async () => {
    setError('');
    setConnecting(true);
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        // Check network
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setNetwork(currentChainId);
        if (currentChainId !== SEPOLIA_CHAIN_ID) {
          // Prompt user to switch to Sepolia
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: SEPOLIA_CHAIN_ID }],
            });
          } catch (switchError) {
            // If not added, prompt to add
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [SEPOLIA_PARAMS],
                });
              } catch (addError) {
                setError('Please add Sepolia Testnet to MetaMask.');
                setConnecting(false);
                return;
              }
            } else {
              setError('Please switch to Sepolia Testnet in MetaMask.');
              setConnecting(false);
              return;
            }
          }
        }
        // Request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        if (onConnect) onConnect(accounts[0]);
      } catch (err) {
        setError('MetaMask connection failed: ' + (err.message || err));
      }
    } else {
      setError('Please install and enable MetaMask!');
    }
    setConnecting(false);
  };

  return (
    <div className="mb-4">
      {address ? (
        <span className="text-indigo-600 font-semibold">Connected: {address.slice(0, 6)}...{address.slice(-4)} (Sepolia)</span>
      ) : (
        <button
          onClick={connect}
          disabled={connecting}
          className={`px-5 py-2 rounded-lg font-semibold text-white text-base transition-colors shadow-md ${connecting ? 'bg-indigo-300 cursor-not-allowed opacity-70' : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
} 