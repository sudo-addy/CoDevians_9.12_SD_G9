'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, ChevronRight, X, ExternalLink, Copy, AlertTriangle, Check, RefreshCw, Sparkles } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { useDemoWallet } from '../../providers/DemoWalletProvider';

// Wallet icons as SVG components for better visuals
const WalletIcons = {
  MetaMask: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <defs>
        <linearGradient id="metamask-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8821E" />
          <stop offset="100%" stopColor="#F5841F" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#metamask-gradient)" />
      <path d="M28.5 10L21 15.5L22.5 12L28.5 10Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M11.5 10L18.9 15.6L17.5 12L11.5 10Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M26 24.5L24 28L28 29L29 24.6L26 24.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M11 24.6L12 29L16 28L14 24.5L11 24.6Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M15.8 18.5L14.5 20.5L18.5 20.7L18.3 16.3L15.8 18.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M24.2 18.5L21.6 16.2L21.5 20.7L25.5 20.5L24.2 18.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M16 28L18.2 27L16.3 24.7L16 28Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
      <path d="M21.8 27L24 28L23.7 24.7L21.8 27Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.25" />
    </svg>
  ),
  WalletConnect: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <defs>
        <linearGradient id="wc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B99FC" />
          <stop offset="100%" stopColor="#2B6CB0" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#wc-gradient)" />
      <path d="M14.5 16C17.5 13 22.5 13 25.5 16L26 16.5C26.2 16.7 26.2 17 26 17.2L24.5 18.7C24.4 18.8 24.2 18.8 24.1 18.7L23.5 18.1C21.5 16.1 18.5 16.1 16.5 18.1L15.8 18.8C15.7 18.9 15.5 18.9 15.4 18.8L13.9 17.3C13.7 17.1 13.7 16.8 13.9 16.6L14.5 16ZM28.5 19L29.8 20.3C30 20.5 30 20.8 29.8 21L24.5 26.3C24.3 26.5 23.9 26.5 23.7 26.3L20 22.6L16.3 26.3C16.1 26.5 15.7 26.5 15.5 26.3L10.2 21C10 20.8 10 20.5 10.2 20.3L11.5 19C11.7 18.8 12.1 18.8 12.3 19L16 22.7C16.1 22.8 16.3 22.8 16.4 22.7L20.1 19L23.6 22.5C23.7 22.6 23.9 22.6 24 22.5L27.7 18.8C27.9 18.6 28.3 18.6 28.5 18.8V19Z" fill="white" />
    </svg>
  ),
  Coinbase: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <defs>
        <linearGradient id="cb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052FF" />
          <stop offset="100%" stopColor="#0040C8" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#cb-gradient)" />
      <circle cx="20" cy="20" r="12" fill="white" />
      <rect x="16" y="16" width="8" height="8" rx="1" fill="#0052FF" />
    </svg>
  ),
  TrustWallet: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <defs>
        <linearGradient id="tw-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3375BB" />
          <stop offset="100%" stopColor="#0500FF" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#tw-gradient)" />
      <path d="M20 10C15.5 13 12 13 12 13V20C12 26 20 30 20 30C20 30 28 26 28 20V13C28 13 24.5 13 20 10Z" fill="white" />
      <path d="M20 12C16.5 14.5 14 14.5 14 14.5V20C14 24.5 20 28 20 28C20 28 26 24.5 26 20V14.5C26 14.5 23.5 14.5 20 12Z" fill="url(#tw-gradient)" />
    </svg>
  ),
  Demo: () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
      <Sparkles className="w-4 h-4 text-white" />
    </div>
  ),
};

interface WalletOption {
  id: string;
  name: string;
  subtitle: string;
  icon: keyof typeof WalletIcons;
  connectorId?: string;
}

const walletOptions: WalletOption[] = [
  { id: 'metamask', name: 'MetaMask', subtitle: 'Recommended', icon: 'MetaMask', connectorId: 'io.metamask' },
  { id: 'walletconnect', name: 'WalletConnect', subtitle: 'Mobile Supported', icon: 'WalletConnect', connectorId: 'walletConnect' },
  { id: 'coinbase', name: 'Coinbase Wallet', subtitle: 'Institutional', icon: 'Coinbase', connectorId: 'coinbaseWalletSDK' },
  { id: 'trust', name: 'Trust Wallet', subtitle: 'Popular Choice', icon: 'TrustWallet', connectorId: 'io.metamask' },
];

export default function WalletConnectModule() {
  const [isOpen, setIsOpen] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Wagmi hooks for real wallets
  const { address, isConnected: isWagmiConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Demo wallet hook
  const {
    isDemoMode,
    isConnected: isDemoConnected,
    address: demoAddress,
    fullAddress: demoFullAddress,
    balance: demoBalance,
    bonds: demoBonds,
    isConnecting: isDemoConnecting,
    connectDemo,
    disconnectDemo,
    resetDemo,
  } = useDemoWallet();

  // Combined connection state
  const isConnected = isWagmiConnected || isDemoConnected;
  const displayAddress = isDemoMode ? demoAddress : address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const fullAddress = isDemoMode ? demoFullAddress : address || '';

  // Format balance for display
  const formatBalance = (bal: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(bal);
  };

  // Check if on wrong network
  const isWrongNetwork = isWagmiConnected && chain?.id !== polygonAmoy.id;

  // Handle wallet connection
  const handleConnect = async (wallet: WalletOption) => {
    setError(null);
    setConnectingWallet(wallet.id);

    try {
      const connector = connectors.find(c =>
        c.id === wallet.connectorId ||
        c.name.toLowerCase().includes(wallet.name.toLowerCase().split(' ')[0])
      );

      if (connector) {
        connect({ connector }, {
          onSuccess: () => {
            setConnectingWallet(null);
            setIsOpen(false);
          },
          onError: (err) => {
            setError(err.message || 'Failed to connect. Please try again.');
            setConnectingWallet(null);
          },
        });
      } else {
        // Fallback: try to open external wallet
        if (wallet.id === 'metamask' && typeof window !== 'undefined') {
          window.open('https://metamask.io/download/', '_blank');
        }
        setError(`${wallet.name} not detected. Please install the wallet extension.`);
        setConnectingWallet(null);
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
      setConnectingWallet(null);
    }
  };

  // Handle demo wallet connection
  const handleDemoConnect = async () => {
    setError(null);
    setConnectingWallet('demo');
    await connectDemo();
    setConnectingWallet(null);
    setIsOpen(false);
  };

  // Handle disconnect
  const handleDisconnect = () => {
    if (isDemoMode) {
      disconnectDemo();
    } else {
      disconnect();
    }
  };

  // Handle network switch
  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: polygonAmoy.id });
    }
  };

  // Copy address to clipboard
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Clear error after delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // 1. POST-CONNECTION STATE
  if (isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-gradient-to-br from-blue-900/40 to-purple-900/30 border border-blue-500/30 rounded-xl p-4 relative overflow-hidden backdrop-blur-sm"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Wallet className="w-20 h-20 text-blue-400" />
        </div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

        {/* Demo mode badge */}
        {isDemoMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-bold text-purple-300">DEMO MODE</span>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
            />
            <span className="text-sm font-bold text-blue-100">
              {isWrongNetwork ? 'Wrong Network' : isDemoMode ? 'Demo Connected' : 'Polygon Amoy Connected'}
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-xs text-red-400 hover:text-red-300 font-medium transition hover:underline"
          >
            Disconnect
          </button>
        </div>

        {/* Network warning */}
        {isWrongNetwork && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-2 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-200">Please switch to Polygon Amoy</span>
            </div>
            <button
              onClick={handleSwitchNetwork}
              className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-1 rounded-md transition"
            >
              Switch
            </button>
          </motion.div>
        )}

        {/* Address & Actions */}
        <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg mb-4 border border-white/5 relative z-10">
          <code className="text-xs text-blue-200 font-mono flex-1 truncate">{displayAddress}</code>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyAddress}
            className="p-1.5 hover:bg-white/10 rounded-md transition text-slate-400 hover:text-white"
            title="Copy Address"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </motion.button>
          {!isDemoMode && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(`https://amoy.polygonscan.com/address/${fullAddress}`, '_blank')}
              className="p-1.5 hover:bg-white/10 rounded-md transition text-slate-400 hover:text-white"
              title="View on Explorer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-600/30 to-blue-800/20 rounded-lg p-3 border border-blue-500/20"
          >
            <p className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">Balance (e₹)</p>
            <p className="text-lg font-bold text-white">
              {isDemoMode ? formatBalance(demoBalance) : '₹0'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-amber-600/20 to-orange-800/10 rounded-lg p-3 border border-amber-500/20"
          >
            <p className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">Bond Tokens</p>
            <p className="text-lg font-bold text-amber-400">
              {isDemoMode ? demoBonds : 0} Units
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 relative z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            Start Tokenized Investing <ChevronRight className="w-3 h-3" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-blue-200 rounded-lg text-xs font-medium transition border border-white/5"
          >
            View Portfolio on Blockchain
          </motion.button>
          {isDemoMode && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetDemo}
              className="w-full py-2 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3 h-3" /> Reset Demo Balance
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // 2. PRE-CONNECTION STATE
  return (
    <>
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="w-full relative border border-white/20 bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 text-blue-100 font-bold py-4 rounded-xl transition-all flex items-center justify-between px-4 group-hover:border-blue-400/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <Wallet className="w-5 h-5 text-blue-300" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">Connect Wallet</p>
              <p className="text-[10px] text-blue-300">Polygon Amoy Testnet</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </motion.button>

        {/* Security Note */}
        <div className="mt-3 flex items-start gap-2 px-2 opacity-60">
          <ShieldCheck className="w-3 h-3 text-green-400 mt-0.5" />
          <p className="text-[10px] text-blue-200 leading-tight">
            Non-custodial connection. We verify ownership without accessing your private keys.
          </p>
        </div>
      </div>

      {/* 3. CONNECTION MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => !connectingWallet && setIsOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] border border-white/10 w-full max-w-sm rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Select Wallet</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !connectingWallet && setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded-lg transition"
                  disabled={!!connectingWallet}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Network Info */}
              <div className="bg-blue-500/10 px-5 py-2.5 border-b border-blue-500/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xs text-blue-200 font-medium">Connecting to Polygon Amoy Testnet</span>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 px-5 py-2.5 border-b border-red-500/10 flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-xs text-red-200">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wallet Options */}
              <div className="p-5 space-y-3">
                {walletOptions.map((wallet, index) => {
                  const Icon = WalletIcons[wallet.icon];
                  const isCurrentConnecting = connectingWallet === wallet.id;

                  return (
                    <motion.button
                      key={wallet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleConnect(wallet)}
                      disabled={!!connectingWallet}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <Icon />
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-200 group-hover:text-white transition">
                            {wallet.name}
                          </p>
                          <p className={`text-[10px] ${
                            wallet.subtitle === 'Recommended' ? 'text-green-400' :
                            wallet.subtitle === 'Mobile Supported' ? 'text-blue-400' :
                            wallet.subtitle === 'Institutional' ? 'text-purple-400' :
                            'text-slate-400'
                          }`}>
                            {wallet.subtitle}
                          </p>
                        </div>
                      </div>
                      {isCurrentConnecting ? (
                        <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      )}
                    </motion.button>
                  );
                })}

                {/* Divider */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">or try demo</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Demo Wallet Option */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemoConnect}
                  disabled={!!connectingWallet}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <WalletIcons.Demo />
                    <div className="text-left">
                      <p className="text-sm font-bold text-white group-hover:text-white transition">
                        Demo Wallet
                      </p>
                      <p className="text-[10px] text-purple-300">
                        Try without real funds • ₹1,00,000 balance
                      </p>
                    </div>
                  </div>
                  {connectingWallet === 'demo' ? (
                    <div className="w-5 h-5 border-2 border-purple-500 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition" />
                  )}
                </motion.button>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/10 text-center bg-black/20">
                <p className="text-xs text-slate-500">
                  By connecting, you agree to our{' '}
                  <span className="text-blue-400 cursor-pointer hover:underline">Terms of Service</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
