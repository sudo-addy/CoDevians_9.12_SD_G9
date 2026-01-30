'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import PaperWalletOverview from '@/components/paper-trading/PaperWalletOverview';
import PracticeMarketplace from '@/components/paper-trading/PracticeMarketplace';
import PaperTradeTerminal from '@/components/paper-trading/PaperTradeTerminal';
import AITradingCoach from '@/components/paper-trading/AITradingCoach';
import PaperPortfolio from '@/components/paper-trading/PaperPortfolio';
import GamificationPanel from '@/components/paper-trading/GamificationPanel';
import { Menu, Zap, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaperTradingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Auth check
        const user = localStorage.getItem('user');
        if (!user) router.push('/login');
        setLoading(false);
    }, [router]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-indigo-500/30">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
                    <div className="lg:hidden">
                        <Menu className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold text-lg text-white flex items-center gap-2">
                            Paper Trading Arena <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">Simulated</span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-amber-500" /> Learning Mode Active • SEBI Compliant Simulation
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-xs font-bold rounded-lg shadow-lg items-center gap-2 transition transform hover:scale-105">
                            <Zap className="w-3 h-3 fill-current" /> Switch to Live
                        </button>
                    </div>
                </header>

                <main className="p-4 lg:p-6 space-y-6">
                    {/* Top Stats Strip (Risk Meter & Balance) */}
                    <PaperWalletOverview />

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                        {/* LEFT COLUMN: Market & Charts (7 cols) */}
                        <div className="xl:col-span-8 space-y-6">

                            {/* Market Chart / Marketplace */}
                            <div className="h-[500px] w-full">
                                <PracticeMarketplace />
                            </div>

                            {/* Portfolio Holdings & History */}
                            <div className="min-h-[300px]">
                                <PaperPortfolio />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Action & Coaching (5 cols) */}
                        <div className="xl:col-span-4 space-y-6">

                            {/* Trade Terminal (Buy/Sell) */}
                            <PaperTradeTerminal />

                            {/* AI Coach */}
                            <div className="min-h-[250px]">
                                <AITradingCoach />
                            </div>

                            {/* Gamification / Leaderboard */}
                            <GamificationPanel />

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
