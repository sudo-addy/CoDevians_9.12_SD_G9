'use client';

import { Briefcase } from 'lucide-react';

export default function ActivePosition() {
    return (
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <Briefcase className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Your Position</p>
                    <p className="text-lg font-bold text-white flex gap-2 items-baseline">
                        50 Qty
                        <span className="text-xs font-normal text-slate-500">@ ₹1,000 avg</span>
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Unrealized P&L</p>
                <p className="text-lg font-bold text-green-400">
                    +₹2,125.00 <span className="text-xs opacity-70">(+4.25%)</span>
                </p>
            </div>
        </div>
    );
}
