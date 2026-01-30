'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import PaperWalletOverview from '@/components/paper-trading/PaperWalletOverview';
import PracticeMarketplace from '@/components/paper-trading/PracticeMarketplace';
import PaperTradeTerminal from '@/components/paper-trading/PaperTradeTerminal';
import AITradingCoach from '@/components/paper-trading/AITradingCoach';
import PaperPortfolio from '@/components/paper-trading/PaperPortfolio';
import GamificationPanel from '@/components/paper-trading/GamificationPanel';
import { Menu, Zap } from 'lucide-react';
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

                    <div className="font-bold text-lg text-white flex items-center gap-2">
                        Paper Trading Arena <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">Simulated</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 transition transform hover:scale-105">
                            <Zap className="w-3 h-3 fill-current" /> Go Live Trading
                        </button>
                    </div>
                </header>

                <main className="p-6">
                    <PaperWalletOverview />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Left Column (2/3) */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="h-[400px]">
                                <PracticeMarketplace />
                            </div>
                            <PaperPortfolio />
                        </div>

                        {/* Right Column (1/3) */}
                        <div className="space-y-6">
                            <PaperTradeTerminal />
                            <div className="h-[350px]">
                                <AITradingCoach />
                            </div>
                            <GamificationPanel />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
