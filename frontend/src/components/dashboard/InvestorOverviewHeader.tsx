'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Wallet, PieChart, Crown } from 'lucide-react';

interface InvestorHeaderProps {
    user: {
        name: string;
        subscription_tier: string;
        kyc_status: string;
    };
    portfolioValue: number;
    walletBalance: number;
    dailyPnL: number;
}

import { useState } from 'react';
import PaymentModal from '@/components/dashboard/PaymentModal';

interface InvestorHeaderProps {
    user: {
        name: string;
        subscription_tier: string;
        kyc_status: string;
    };
    portfolioValue: number;
    walletBalance: number;
    dailyPnL: number;
}

export default function InvestorOverviewHeader({ user, portfolioValue, walletBalance, dailyPnL }: InvestorHeaderProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [displayBalance, setDisplayBalance] = useState(walletBalance);

    // Update local display on successful deposit
    const handleDepositSuccess = (newBalance: number) => {
        setDisplayBalance(newBalance);
        // Ideally we also refresh the global context or parent state
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Name & Tier */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="col-span-1"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2">
                    Hello, {user.name.split(' ')[0]}
                    {user.subscription_tier === 'premium' && (
                        <Crown className="w-6 h-6 text-amber-400 fill-amber-400" />
                    )}
                </h1>
                <p className="text-slate-400 text-sm">
                    Here is your investment snapshot for today.
                </p>
            </motion.div>

            {/* Quick Stats Strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
                {/* Portfolio Value */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <PieChart className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Net Worth</p>
                        <p className="text-xl font-bold text-white">₹{(portfolioValue / 100000).toFixed(2)}L</p>
                    </div>
                </div>

                {/* Day's Change */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Day's P&L</p>
                        <p className={`text-xl font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {dailyPnL >= 0 ? '+' : ''}{dailyPnL}%
                        </p>
                    </div>
                </div>

                {/* Wallet Balance with Add Button */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-4 flex items-center justify-between gap-4 relative group cursor-pointer hover:border-blue-500/30 transition" onClick={() => setIsPaymentOpen(true)}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Wallet (e₹)</p>
                            <p className="text-xl font-bold text-white">₹{displayBalance.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 absolute right-2 top-2">
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-md font-bold">+ Add</span>
                    </div>
                </div>
            </motion.div>

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onSuccess={handleDepositSuccess}
            />
        </div>
    );
}
