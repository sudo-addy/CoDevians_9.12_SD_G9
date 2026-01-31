'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Demo wallet configuration
const DEMO_ADDRESS = '0xDEMO...4B2F';
const DEMO_FULL_ADDRESS = '0xDEMO1234567890ABCDEF1234567890ABCDEF4B2F';
const INITIAL_BALANCE = 100000; // ₹1,00,000 starting balance
const INITIAL_BONDS = 0;

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  amount: number;
  bondName?: string;
  bondUnits?: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

interface DemoWalletState {
  isConnected: boolean;
  address: string;
  fullAddress: string;
  balance: number;
  bonds: number;
  transactions: Transaction[];
}

interface DemoWalletContextType {
  // State
  isDemoMode: boolean;
  isConnected: boolean;
  address: string;
  fullAddress: string;
  balance: number;
  bonds: number;
  transactions: Transaction[];
  isConnecting: boolean;

  // Actions
  connectDemo: () => Promise<void>;
  disconnectDemo: () => void;
  simulateBuyBond: (bondName: string, amount: number, units: number) => Promise<boolean>;
  simulateSellBond: (bondName: string, amount: number, units: number) => Promise<boolean>;
  simulateDeposit: (amount: number) => Promise<boolean>;
  resetDemo: () => void;
}

const DemoWalletContext = createContext<DemoWalletContextType | null>(null);

const STORAGE_KEY = 'demo_wallet_state';

// Helper to generate transaction ID
const generateTxId = () => `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;

export function DemoWalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoWalletState>({
    isConnected: false,
    address: DEMO_ADDRESS,
    fullAddress: DEMO_FULL_ADDRESS,
    balance: INITIAL_BALANCE,
    bonds: INITIAL_BONDS,
    transactions: [],
  });
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as DemoWalletState;
          setState(parsed);
          if (parsed.isConnected) {
            setIsDemoMode(true);
          }
        } catch (e) {
          console.error('Failed to parse demo wallet state:', e);
        }
      }
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isDemoMode) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isDemoMode]);

  const connectDemo = useCallback(async () => {
    setIsConnecting(true);

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    setState(prev => ({
      ...prev,
      isConnected: true,
    }));
    setIsDemoMode(true);
    setIsConnecting(false);
  }, []);

  const disconnectDemo = useCallback(() => {
    setState(prev => ({
      ...prev,
      isConnected: false,
    }));
    setIsDemoMode(false);
  }, []);

  const simulateBuyBond = useCallback(async (bondName: string, amount: number, units: number): Promise<boolean> => {
    if (state.balance < amount) {
      return false;
    }

    // Create pending transaction
    const txId = generateTxId();
    const transaction: Transaction = {
      id: txId,
      type: 'buy',
      amount,
      bondName,
      bondUnits: units,
      timestamp: Date.now(),
      status: 'pending',
    };

    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }));

    // Simulate blockchain confirmation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setState(prev => ({
      ...prev,
      balance: prev.balance - amount,
      bonds: prev.bonds + units,
      transactions: prev.transactions.map(tx =>
        tx.id === txId ? { ...tx, status: 'completed' as const } : tx
      ),
    }));

    return true;
  }, [state.balance]);

  const simulateSellBond = useCallback(async (bondName: string, amount: number, units: number): Promise<boolean> => {
    if (state.bonds < units) {
      return false;
    }

    const txId = generateTxId();
    const transaction: Transaction = {
      id: txId,
      type: 'sell',
      amount,
      bondName,
      bondUnits: units,
      timestamp: Date.now(),
      status: 'pending',
    };

    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    setState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      bonds: prev.bonds - units,
      transactions: prev.transactions.map(tx =>
        tx.id === txId ? { ...tx, status: 'completed' as const } : tx
      ),
    }));

    return true;
  }, [state.bonds]);

  const simulateDeposit = useCallback(async (amount: number): Promise<boolean> => {
    const txId = generateTxId();
    const transaction: Transaction = {
      id: txId,
      type: 'deposit',
      amount,
      timestamp: Date.now(),
      status: 'pending',
    };

    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    setState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      transactions: prev.transactions.map(tx =>
        tx.id === txId ? { ...tx, status: 'completed' as const } : tx
      ),
    }));

    return true;
  }, []);

  const resetDemo = useCallback(() => {
    const newState: DemoWalletState = {
      isConnected: true,
      address: DEMO_ADDRESS,
      fullAddress: DEMO_FULL_ADDRESS,
      balance: INITIAL_BALANCE,
      bonds: INITIAL_BONDS,
      transactions: [],
    };
    setState(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }
  }, []);

  return (
    <DemoWalletContext.Provider
      value={{
        isDemoMode,
        isConnected: state.isConnected,
        address: state.address,
        fullAddress: state.fullAddress,
        balance: state.balance,
        bonds: state.bonds,
        transactions: state.transactions,
        isConnecting,
        connectDemo,
        disconnectDemo,
        simulateBuyBond,
        simulateSellBond,
        simulateDeposit,
        resetDemo,
      }}
    >
      {children}
    </DemoWalletContext.Provider>
  );
}

export function useDemoWallet() {
  const context = useContext(DemoWalletContext);
  if (!context) {
    throw new Error('useDemoWallet must be used within a DemoWalletProvider');
  }
  return context;
}
