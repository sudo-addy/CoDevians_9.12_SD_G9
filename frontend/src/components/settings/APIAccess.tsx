'use client';

import { Key, RefreshCw, Copy, BarChart, Zap, Shield } from 'lucide-react';

export default function APIAccess() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-amber-900/40 to-slate-900 border border-amber-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-amber-900/40">
                        <Key className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">API Access</h3>
                        <p className="text-slate-400 font-medium mt-1">Manage your keys for high-frequency trading.</p>
                        <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">
                            Enterprise Tier
                        </span>
                    </div>
                </div>
            </div>

            {/* API Keys */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-slate-400" /> Credentials
                    </h4>
                    <button className="text-xs text-amber-500 font-bold hover:underline">Regenerate Keys</button>
                </div>

                <div className="space-y-6">
                    <div className="group">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block group-hover:text-amber-400 transition-colors">Public API Key</label>
                        <div className="flex gap-3">
                            <code className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-xl px-5 py-4 text-sm font-mono text-slate-300 tracking-wide">
                                pk_live_592834...9283
                            </code>
                            <button className="px-5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition shadow-lg">
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="group">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block group-hover:text-amber-400 transition-colors">Secret Key</label>
                        <div className="flex gap-3">
                            <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-xl px-5 py-4 flex items-center justify-between">
                                <span className="text-sm font-mono text-slate-600 tracking-widest">••••••••••••••••••••••••••••••</span>
                                <button className="text-xs text-blue-400 hover:text-blue-300 font-bold bg-blue-500/10 px-3 py-1.5 rounded-lg transition">Reveal</button>
                            </div>
                            <button className="px-5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition shadow-lg">
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-2xl bg-[#0a111e]/50 border border-white/5 flex flex-col items-center justify-center text-center group hover:border-blue-500/30 transition">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                        <BarChart className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Requests Today</p>
                    <p className="text-3xl font-black text-white">14.2k</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl bg-[#0a111e]/50 border border-white/5 flex flex-col items-center justify-center text-center group hover:border-green-500/30 transition">
                    <div className="p-3 bg-green-500/10 text-green-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Avg Latency</p>
                    <p className="text-3xl font-black text-green-400">42ms</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl bg-[#0a111e]/50 border border-white/5 flex flex-col items-center justify-center text-center group hover:border-amber-500/30 transition">
                    <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Rate Limit</p>
                    <p className="text-3xl font-black text-blue-400">100/s</p>
                </div>
            </div>
        </div>
    );
}
