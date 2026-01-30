'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function RecentTrades() {
    const trades = [
        { time: '14:32:05', price: 1042.50, qty: 50, side: 'buy' },
        { time: '14:32:01', price: 1042.45, qty: 120, side: 'sell' },
        { time: '14:31:58', price: 1042.50, qty: 200, side: 'buy' },
        { time: '14:31:45', price: 1042.50, qty: 500, side: 'buy' },
        { time: '14:31:30', price: 1042.40, qty: 50, side: 'sell' },
        { time: '14:31:12', price: 1042.35, qty: 1000, side: 'sell' },
        { time: '14:30:55', price: 1042.50, qty: 15, side: 'buy' },
        { time: '14:30:40', price: 1042.55, qty: 100, side: 'buy' },
    ];

    return (
        <div className="glass-panel rounded-xl h-[400px] flex flex-col">
            <div className="p-3 border-b border-white/5 bg-[#050b14]">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Market Trades</h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-xs text-left">
                    <thead className="text-slate-500 font-medium border-b border-slate-800 bg-[#050b14]/50 sticky top-0">
                        <tr>
                            <th className="px-3 py-2">Price</th>
                            <th className="px-3 py-2 text-right">Qty</th>
                            <th className="px-3 py-2 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {trades.map((t, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className={`px-3 py-1.5 font-mono font-medium ${t.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                    <span className="flex items-center gap-1">
                                        {t.side === 'buy' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {t.price.toFixed(2)}
                                    </span>
                                </td>
                                <td className="px-3 py-1.5 text-right font-mono text-slate-300">{t.qty}</td>
                                <td className="px-3 py-1.5 text-right font-mono text-slate-500">{t.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
