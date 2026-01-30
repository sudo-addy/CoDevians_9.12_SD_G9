'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LogOut, Bell, Menu } from 'lucide-react';

// Components
import Sidebar from '@/components/dashboard/Sidebar';
import InvestorOverviewHeader from '@/components/dashboard/InvestorOverviewHeader';
import PortfolioPerformanceChart from '@/components/dashboard/PortfolioPerformanceChart';
import EnhancedAIRecommendations from '@/components/dashboard/EnhancedAIRecommendations';
import HoldingsTable from '@/components/dashboard/HoldingsTable';
import MarketMoversWidget from '@/components/dashboard/MarketMoversWidget';
import TokenizationTracker from '@/components/dashboard/TokenizationTracker';
import SmartAlerts from '@/components/dashboard/SmartAlerts';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock Data
  const portfolioData = {
    total_value: 4520000,
    total_invested: 4000000,
    current_value: 4520000,
    current_gains: 520000,
    gain_percentage: 13.0
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-amber-500/30">

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[100px]" />
      </div>

      <Sidebar />

      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

        {/* Top Ticker */}
        <MarketMoversWidget />

        {/* Header / Nav (Mobile Optimized) */}
        <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
          <div className="lg:hidden">
            <Menu className="w-6 h-6 text-white" />
          </div>

          <div className="hidden lg:block text-sm text-slate-400">
            Global Market Status: <span className="text-green-400 font-bold">Open</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search bonds, ISIN..."
                className="bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:border-blue-500 focus:outline-none w-64 text-white"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2" />
            </div>

            <button className="p-2 text-slate-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#050b14]" />
            </button>

            <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="lg:hidden text-slate-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* 1. Header Stats */}
          <InvestorOverviewHeader user={user || { name: 'Guest', subscription_tier: 'basic' }} portfolioValue={portfolioData.total_value} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Left Col - Main Charts & Tables */}
            <div className="xl:col-span-2 space-y-6">
              <PortfolioPerformanceChart data={portfolioData} />

              <EnhancedAIRecommendations />

              <HoldingsTable />
            </div>

            {/* Right Col - Widgets */}
            <div className="space-y-6">
              <SmartAlerts />

              <TokenizationTracker />

              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => router.push('/bonds')} className="col-span-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-900/20 transition">
                    Buy Bonds
                  </button>
                  <button className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold text-xs border border-slate-700 transition">
                    Add Funds
                  </button>
                  <button className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold text-xs border border-slate-700 transition">
                    Reports
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
