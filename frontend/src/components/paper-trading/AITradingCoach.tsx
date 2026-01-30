'use client';

import { Sparkles, GraduationCap, TrendingUp, Info } from 'lucide-react';

export default function AITradingCoach() {
    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col h-full bg-gradient-to-br from-slate-900 to-amber-900/20 border-amber-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap className="w-24 h-24 text-amber-500" />
            </div>

            <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900">
                    <Sparkles className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-lg font-bold text-white">AI Coach</h3>
            </div>

            <div className="flex-1 relative z-10 space-y-4">
                <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">Recommendation</p>
                    <h4 className="text-2xl font-black text-white flex items-center gap-2">
                        STRONG BUY <TrendingUp className="w-5 h-5 text-green-400" />
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        "NHAI Green Bond fits your conservative profile. It offers 8.5% yield which beats inflation by 2.1%. Low volatility expected."
                    </p>
                </div>

                <div className="space-y-2">
                    <h5 className="text-xs text-slate-500 font-bold uppercase">Learning Points</h5>
                    <div className="flex items-start gap-2 text-xs text-slate-300">
                        <Info className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                        <span>Government backing reduces credit risk near zero.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-300">
                        <Info className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                        <span>Yield is tax-free (Section 54EC), boosting effective return.</span>
                    </div>
                </div>
            </div>

            <button className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition">
                View Detailed Analysis
            </button>
        </div>
    );
}
