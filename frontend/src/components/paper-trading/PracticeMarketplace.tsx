'use client';

import { Search, Filter, TrendingUp } from 'lucide-react';

export default function PracticeMarketplace() {
    const practiceBonds = [
        { name: 'NHAI Green Bond', coupon: '8.5%', risk: 'Low', price: 1042, score: 95 },
        { name: 'Adani Porsts SEZ', coupon: '11.2%', risk: 'High', price: 980, score: 72 },
        { name: 'Pune Smart City', coupon: '9.1%', risk: 'Medium', price: 1005, score: 88 },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Practice Market</h3>
                <div className="flex gap-2">
                    <div className="relative">
                        <input type="text" placeholder="Search..." className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-1.5 text-xs text-white w-32 focus:w-48 transition-all" />
                        <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-2" />
                    </div>
                    <button className="p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:text-white"><Filter className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
                {practiceBonds.map((bond, i) => (
                    <div key={i} className="p-4 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/30 rounded-xl transition cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition">{bond.name}</h4>
                                <p className="text-[10px] text-slate-500">ISIN: IN002RA192</p>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${bond.risk === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    bond.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>{bond.risk} Risk</span>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-slate-400">Coupon</p>
                                <p className="text-sm font-mono text-white">{bond.coupon}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400">Price</p>
                                <p className="text-sm font-mono text-white">₹{bond.price}</p>
                            </div>
                            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg">
                                Trade
                            </button>
                        </div>

                        {/* AI Score */}
                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2">
                            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${bond.score}%` }} />
                            </div>
                            <span className="text-[10px] text-purple-400 font-bold">{bond.score}% Match</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
