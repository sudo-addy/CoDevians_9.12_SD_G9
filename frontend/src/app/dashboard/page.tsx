'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LogOut, Bell, Menu, Users, Activity, Database, ShieldAlert, Award } from 'lucide-react';

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
    gain_percentage: 13.0,
    wallet_balance: 45200,   // NEW
    daily_pnl: 2.4           // NEW
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  if (loading || !user) return <div className="min-h-screen bg-[#050b14] flex items-center justify-center text-blue-500">Loading Dashboard...</div>;

  const isAdmin = user.subscription_tier === 'enterprise'; // Admin
  const isInstitution = user.subscription_tier === 'premium'; // Institution
  const isRetail = !isAdmin && !isInstitution; // Retail

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-amber-500/30">

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[100px]" />
      </div>

      <Sidebar />

      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

        {/* Top Ticker - Hide for Admin maybe? Or keep global context */}
        {!isAdmin && <MarketMoversWidget />}

        {/* Header / Nav */}
        <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
          <div className="lg:hidden">
            <Menu className="w-6 h-6 text-white" />
          </div>

          <div className="hidden lg:block text-sm text-slate-400">
            {isAdmin ? (
              <span className="text-red-400 font-bold uppercase tracking-wider">System Admin Console</span>
            ) : (
              <>Global Market Status: <span className="text-green-400 font-bold">Open</span></>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isAdmin && (
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search bonds, ISIN..."
                  className="bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:border-blue-500 focus:outline-none w-64 text-white"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2" />
              </div>
            )}

            <button className="p-2 text-slate-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              {isAdmin && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#050b14]" />}
            </button>

            <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="lg:hidden text-slate-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-6 space-y-6">

          {/* ================= ADMIN VIEW ================= */}
          {isAdmin && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-red-500" /> Administrative Overview
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500">
                  <p className="text-slate-400 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Total Users</p>
                  <p className="text-2xl font-mono text-white">12,450</p>
                  <p className="text-xs text-green-400 mt-1">+125 today</p>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-amber-500">
                  <p className="text-slate-400 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Database className="w-4 h-4" /> Volume (24h)</p>
                  <p className="text-2xl font-mono text-white">₹45.2 Cr</p>
                  <p className="text-xs text-green-400 mt-1">+18% vs avg</p>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-purple-500">
                  <p className="text-slate-400 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Activity className="w-4 h-4" /> System Health</p>
                  <p className="text-2xl font-bold text-green-400">99.99%</p>
                  <p className="text-xs text-slate-500 mt-1">All services operational</p>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-red-500">
                  <p className="text-slate-400 text-xs uppercase font-bold mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> KYC Pending</p>
                  <p className="text-2xl font-mono text-white">45</p>
                  <p className="text-xs text-amber-400 mt-1">Action required</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4">Recent Registrations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="text-xs uppercase bg-white/5 text-slate-300">
                      <tr>
                        <th className="px-4 py-3 rounded-l-lg">User</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 rounded-r-lg">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-3 font-medium text-white">Amit Verma</td>
                        <td className="px-4 py-3">Retail</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs">Active</span></td>
                        <td className="px-4 py-3">Just now</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="px-4 py-3 font-medium text-white">HDFC Treasury</td>
                        <td className="px-4 py-3 text-amber-400">Institution</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">Verified</span></td>
                        <td className="px-4 py-3">2 mins ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= INSTITUTION VIEW ================= */}
          {isInstitution && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <InvestorOverviewHeader
                user={user}
                portfolioValue={portfolioData.total_value}
                walletBalance={portfolioData.wallet_balance}
                dailyPnL={portfolioData.daily_pnl}
              />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <div className="xl:col-span-2 space-y-6">
                  <EnhancedAIRecommendations />
                  <PortfolioPerformanceChart data={portfolioData} />
                  <HoldingsTable />
                </div>
                <div className="space-y-6">
                  <TokenizationTracker />
                  <SmartAlerts />
                  <div className="glass-panel p-6 rounded-2xl bg-amber-900/10 border-amber-500/20">
                    <h3 className="text-sm font-bold text-amber-500 uppercase flex items-center gap-2 mb-2"><Award className="w-4 h-4" /> Institutional Access</h3>
                    <p className="text-xs text-slate-400 mb-4">You have access to Dark Pool liquidity and OTC desk.</p>
                    <button className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs">Access OTC Desk</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= RETAIL VIEW (Default) ================= */}
          {isRetail && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <InvestorOverviewHeader
                user={user}
                portfolioValue={portfolioData.total_value}
                walletBalance={portfolioData.wallet_balance}
                dailyPnL={portfolioData.daily_pnl}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                {/* Simplified Left Col */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Retail cares about simple charts and holdings */}
                  <PortfolioPerformanceChart data={portfolioData} />
                  <HoldingsTable />
                </div>

                {/* Simplified Right Col */}
                <div className="space-y-6">
                  {/* Retail gets simplified Quick Actions */}
                  <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Quick Invest</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => router.push('/bonds')} className="col-span-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-900/20 transition flex items-center justify-center gap-2">
                        Start Investing <Search className="w-3 h-3" />
                      </button>
                      <button className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold text-xs border border-slate-700 transition">
                        Add Money
                      </button>
                      <button className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold text-xs border border-slate-700 transition">
                        Help
                      </button>
                    </div>
                  </div>

                  {/* Upsell to Premium */}
                  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Award className="w-24 h-24 text-amber-500" /></div>
                    <h3 className="text-sm font-bold text-white mb-2">Upgrade to Premium</h3>
                    <p className="text-xs text-slate-400 mb-4">Get AI Predictions and access to Tax-Free Bonds.</p>
                    <button className="w-full py-2 border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 rounded-lg text-xs font-bold transition">View Plans</button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
