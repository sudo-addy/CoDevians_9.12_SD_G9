'use client';

import { FileText, AlertTriangle, ExternalLink, Bot } from 'lucide-react';

export default function RegulatoryFeed() {
    const updates = [
        { title: 'SEBI New Guideline on Fractional Ownership', source: 'SEBI Circular', time: '2h ago', level: 'High', color: 'text-red-400' },
        { title: 'RBI CBDC Pilot Expansion for Retail', source: 'RBI Notification', time: '5h ago', level: 'Medium', color: 'text-amber-400' },
        { title: 'Infrastructure Debt Fund Rules Update', source: 'Ministry of Finance', time: '1d ago', level: 'Low', color: 'text-blue-400' },
        { title: 'Corporate Bond Repo Market Reforms', source: 'SEBI Circular', time: '2d ago', level: 'Medium', color: 'text-amber-400' },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Live Regulatory Feed</h3>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-red-400 uppercase font-bold">Live Updates</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                {updates.map((item, i) => (
                    <div key={i} className="group p-4 bg-slate-900/40 hover:bg-slate-800 border border-white/5 rounded-xl transition cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300 border border-white/10 uppercase tracking-widest font-bold">{item.source}</span>
                            <span className={`text-xs font-bold ${item.color} flex items-center gap-1`}>
                                {item.level === 'High' && <AlertTriangle className="w-3 h-3" />}
                                {item.level} Impact
                            </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition">{item.title}</h4>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">{item.time}</span>
                            <div className="flex gap-2">
                                <button className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-500/20">
                                    <Bot className="w-3 h-3" /> AI Summary
                                </button>
                                <button className="text-slate-500 hover:text-white transition">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
