'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Use placeholder for development - replace with real WalletConnect Cloud project ID in production
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'DEMO_PROJECT_ID';

// Configure chains - Mumbai testnet as default for demo, Polygon mainnet available
const config = getDefaultConfig({
  appName: 'Bond Platform',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [polygonAmoy, polygon],
  transports: {
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true,
});

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#3b82f6',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          initialChain={polygonAmoy}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export { config };
