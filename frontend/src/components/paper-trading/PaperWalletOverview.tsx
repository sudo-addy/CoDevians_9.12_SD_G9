'use client';

import { Wallet, RotateCcw, TrendingUp, Award } from 'lucide-react';

export default function PaperWalletOverview() {
    return (
        <div className="glass-panel p-6 rounded-2xl mb-6 bg-gradient-to-r from-slate-900 to-indigo-900/10 border-indigo-500/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                {/* Balance Section */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                        <Wallet className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-xs text-indigo-200 font-bold uppercase tracking-wider mb-1">Virtual Balance</p>
                        <h2 className="text-3xl font-black text-white tracking-tight">₹10,00,000</h2>
                        <p className="text-xs text-slate-400">Paper Wallet • Reset Available</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-6">
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Invested</p>
                        <p className="text-lg font-bold text-white">₹0</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Unrealized P&L</p>
                        <p className="text-lg font-bold text-slate-500">--</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">Return</p>
                        <p className="text-lg font-bold text-slate-500">0.0%</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition flex items-center gap-2 text-xs font-bold">
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-bold flex items-center gap-2">
                        <Award className="w-3 h-3" /> Rookie Trader
                    </div>
                </div>

            </div>
        </div>
    );
}
