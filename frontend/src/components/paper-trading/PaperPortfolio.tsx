'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';

export default function PaperPortfolio() {
    const [tab, setTab] = useState<'holdings' | 'history'>('holdings');

    const holdings = [
        { name: 'NHAI Green Bond', qty: 50, avg: 1040, ltp: 1042, pl: 100 },
        { name: 'Pune Smart City', qty: 20, avg: 1000, ltp: 1005, pl: 100 },
    ];

    const history = [
        { id: 1, date: 'Jan 30', type: 'Buy', asset: 'NHAI Green Bond', qty: 50, price: 1040 },
        { id: 2, date: 'Jan 28', type: 'Buy', asset: 'Pune Smart City', qty: 20, price: 1000 },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                    <button onClick={() => setTab('holdings')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${tab === 'holdings' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}>Holdings</button>
                    <button onClick={() => setTab('history')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${tab === 'history' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}>History</button>
                </div>
                <button className="text-slate-500 hover:text-white p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    <Download className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase border-b border-slate-800">
                        <tr>
                            {tab === 'holdings' ? (
                                <>
                                    <th className="pb-3 pl-2">Asset</th>
                                    <th className="pb-3 text-right">Qty</th>
                                    <th className="pb-3 text-right">Avg Price</th>
                                    <th className="pb-3 text-right">LTP</th>
                                    <th className="pb-3 text-right pr-2">P&L</th>
                                </>
                            ) : (
                                <>
                                    <th className="pb-3 pl-2">Date</th>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Asset</th>
                                    <th className="pb-3 text-right">Qty</th>
                                    <th className="pb-3 text-right pr-2">Price</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {tab === 'holdings' ? holdings.map((h, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 pl-2 font-medium text-white">{h.name}</td>
                                <td className="py-3 text-right font-mono text-slate-300">{h.qty}</td>
                                <td className="py-3 text-right font-mono text-slate-400">₹{h.avg}</td>
                                <td className="py-3 text-right font-mono text-white">₹{h.ltp}</td>
                                <td className={`py-3 text-right pr-2 font-bold ${h.pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {h.pl >= 0 ? '+' : ''}₹{h.pl}
                                </td>
                            </tr>
                        )) : history.map((h) => (
                            <tr key={h.id} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 pl-2 text-slate-500 text-xs">{h.date}</td>
                                <td className={`py-3 text-xs font-bold uppercase ${h.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>{h.type}</td>
                                <td className="py-3 font-medium text-white">{h.asset}</td>
                                <td className="py-3 text-right font-mono text-slate-300">{h.qty}</td>
                                <td className="py-3 text-right pr-2 font-mono text-slate-400">₹{h.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
