'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import ComplianceScoreCard from '@/components/regulation/ComplianceScoreCard';
import RegulatoryFeed from '@/components/regulation/RegulatoryFeed';
import RegulatoryAI from '@/components/regulation/RegulatoryAI';
import ComplianceCalendar from '@/components/regulation/ComplianceCalendar';
import { Menu, FileText, Download, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegulationHubPage() {
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
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-green-500/30">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
                    <div className="lg:hidden">
                        <Menu className="w-6 h-6 text-white" />
                    </div>

                    <div className="font-bold text-lg text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" /> Regulation Hub
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-green-400 uppercase">SEBI Compliant</span>
                        </div>
                    </div>
                </header>

                <main className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* LEFT (Score & Calendar) */}
                    <div className="space-y-6">
                        <div className="h-[300px]">
                            <ComplianceScoreCard />
                        </div>
                        <ComplianceCalendar />
                    </div>

                    {/* MIDDLE (Feed & Reports) */}
                    <div className="space-y-6">
                        <RegulatoryFeed />

                        {/* Transparency Reports Widget */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-400" /> Transparency Reports
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-white/5 group hover:bg-slate-800 transition cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-slate-700">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Annual Audit Report 2025</p>
                                            <p className="text-[10px] text-slate-500">Verified by Deloitte</p>
                                        </div>
                                    </div>
                                    <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-white/5 group hover:bg-slate-800 transition cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-slate-700">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Smart Contract Security Audit</p>
                                            <p className="text-[10px] text-slate-500">CertiK Verified</p>
                                        </div>
                                    </div>
                                    <Download className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT (AI & Premium) */}
                    <div className="space-y-6">
                        <RegulatoryAI />

                        {/* Premium Banner */}
                        <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-amber-900/20 to-slate-900 border-amber-500/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-2">Premium Intelligence</h3>
                                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                                    Get advanced "Impact Analysis" for every new SEBI circular automated by AI.
                                </p>
                                <button className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg transition">
                                    Unlock Regulatory Suite
                                </button>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
