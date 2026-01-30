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
}

export default function InvestorOverviewHeader({ user, portfolioValue }: InvestorHeaderProps) {
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
                        <p className="text-xl font-bold text-green-400">+2.4%</p>
                    </div>
                </div>

                {/* Wallet Balance */}
                <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Wallet (e₹)</p>
                        <p className="text-xl font-bold text-white">₹45,200</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
