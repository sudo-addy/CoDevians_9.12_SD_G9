'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TradingHeader from '@/components/trading/TradingHeader';
import TradingChart from '@/components/trading/TradingChart';
import OrderBook from '@/components/trading/OrderBook';
import OrderEntryPanel from '@/components/trading/OrderEntryPanel';
import RecentTrades from '@/components/trading/RecentTrades';
import ActivePosition from '@/components/trading/ActivePosition';
import TradingAI from '@/components/trading/TradingAI';
import TokenizationTracker from '@/components/dashboard/TokenizationTracker';
import { ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TradingPage() {
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
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-amber-500/30">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                <TradingHeader />

                <main className="p-4 grid grid-cols-1 xl:grid-cols-4 gap-4">

                    {/* LEFT COLUMN: Chart & Position (Wide) */}
                    <div className="xl:col-span-2 space-y-4">
                        <TradingChart />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ActivePosition />
                            <div className="glass-panel p-4 rounded-xl flex items-center justify-between border border-blue-500/20 bg-blue-500/5">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                                    <div>
                                        <p className="text-xs font-bold text-blue-300 uppercase">Settlement</p>
                                        <p className="text-sm text-white font-mono">T+0 (Instant)</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400">Blockchain</p>
                                    <p className="text-xs font-bold text-green-400">Verified ✅</p>
                                </div>
                            </div>
                        </div>
                        {/* Mobile/Tablet only: Recent Trades move here if low space, but we keep structure simple */}
                    </div>

                    {/* MIDDLE COLUMN: Market Data (Narrower) */}
                    <div className="space-y-4">
                        <OrderBook />
                        <RecentTrades />
                    </div>

                    {/* RIGHT COLUMN: Execution & AI (Right Hand) */}
                    <div className="space-y-4">
                        <OrderEntryPanel />
                        <TradingAI />
                        <div className="hidden 2xl:block">
                            <TokenizationTracker />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
