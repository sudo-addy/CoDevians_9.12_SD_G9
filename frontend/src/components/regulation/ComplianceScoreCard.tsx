'use client';

import { ShieldCheck, Lock, FileCheck, Server } from 'lucide-react';

export default function ComplianceScoreCard() {
    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-green-400" /> Compliance Status
                    </h3>
                    <p className="text-xs text-slate-400">Institutional Grade • Real-time Monitoring</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <span className="text-xl font-bold text-white">92</span>
                </div>
            </div>

            <div className="space-y-4 mb-6 relative z-10">
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                    <span className="text-sm text-slate-300 flex items-center gap-2"><FileCheck className="w-4 h-4 text-blue-400" /> SEBI Regulations</span>
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Active</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                    <span className="text-sm text-slate-300 flex items-center gap-2"><Server className="w-4 h-4 text-purple-400" /> RBI Digital Rupee</span>
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Enabled</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                    <span className="text-sm text-slate-300 flex items-center gap-2"><Lock className="w-4 h-4 text-amber-400" /> ISO 27001 Audit</span>
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Verified</span>
                </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2">
                <div className="text-[10px] text-slate-500 text-center bg-white/5 p-1 rounded">GDPR Ready</div>
                <div className="text-[10px] text-slate-500 text-center bg-white/5 p-1 rounded">256-bit Encrypted</div>
            </div>
        </div>
    );
}
