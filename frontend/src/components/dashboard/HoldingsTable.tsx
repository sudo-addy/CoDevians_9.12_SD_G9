'use client';

import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function HoldingsTable() {
    const holdings = [
        { id: 1, name: 'NHAI Green Bond Series IV', qty: 50, avg: 1000, current: 1042, risk: 'Low', score: 92 },
        { id: 2, name: 'Mumbai Metro Infrastructure', qty: 200, avg: 500, current: 525, risk: 'Low', score: 88 },
        { id: 3, name: 'Adani Green Energy', qty: 150, avg: 750, current: 720, risk: 'Medium', score: 75 },
        { id: 4, name: 'L&T Finance Holdings', qty: 100, avg: 1200, current: 1280, risk: 'Medium', score: 82 },
    ];

    return (
        <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Your Holdings</h3>
                <button className="text-sm text-blue-400 hover:text-white transition">View Portfolio</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase border-b border-slate-800">
                        <tr>
                            <th className="pb-3 pl-2">Bond Asset</th>
                            <th className="pb-3 text-right">Qty</th>
                            <th className="pb-3 text-right">Avg Price</th>
                            <th className="pb-3 text-right">Current Price</th>
                            <th className="pb-3 text-right">Gain/Loss</th>
                            <th className="pb-3 text-center">Risk Score</th>
                            <th className="pb-3 text-right pr-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {holdings.map((bond) => {
                            const gain = (bond.current - bond.avg) * bond.qty;
                            const percent = ((bond.current - bond.avg) / bond.avg) * 100;
                            const isPositive = gain >= 0;

                            return (
                                <tr key={bond.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-2 font-medium text-white">
                                        <div className="flex flex-col">
                                            <span>{bond.name}</span>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">{bond.id === 1 ? 'GOVT' : 'CORP'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right font-mono text-slate-300">{bond.qty}</td>
                                    <td className="py-4 text-right font-mono text-slate-400">₹{bond.avg}</td>
                                    <td className="py-4 text-right font-mono text-white">₹{bond.current}</td>
                                    <td className="py-4 text-right">
                                        <div className={`flex items-center justify-end gap-1 font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            <span>₹{Math.abs(gain).toLocaleString()}</span>
                                            <span className="opacity-70 text-xs">({Math.abs(percent).toFixed(2)}%)</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${bond.score > 90 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            bond.score > 80 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            {bond.score}/100
                                        </span>
                                    </td>
                                    <td className="py-4 text-right pr-2">
                                        <button className="p-1 hover:bg-white/10 rounded transition text-slate-500 hover:text-white">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
