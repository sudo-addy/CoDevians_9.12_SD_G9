'use client';

import { Sparkles, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function EnhancedAIRecommendations() {
    const router = useRouter();

    const data = [
        { x: 10, y: 8, z: 200, name: 'Safe Govt', fill: '#4ade80' },
        { x: 40, y: 12, z: 100, name: 'Solar', fill: '#fbbf24' },
        { x: 80, y: 15, z: 80, name: 'High Yield', fill: '#f87171' },
        { x: 30, y: 10, z: 150, name: 'You are here', fill: '#60a5fa' },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" /> AI Insights
                    </h3>
                    <p className="text-xs text-slate-400">Based on your conservative risk profile</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition flex items-center gap-1">
                    <Info className="w-3 h-3" /> Why Recommended?
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Recommendations List */}
                <div className="space-y-4">
                    {[
                        { name: 'Green Energy Solar Bond', score: 94, yield: '12.5%', reason: 'Matches your sector interest' },
                        { name: 'NHAI Infra Series V', score: 98, yield: '9.8%', reason: 'High stability for portfolio' },
                    ].map((rec, i) => (
                        <div key={i} className="group p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition cursor-pointer" onClick={() => router.push('/bonds')}>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-white group-hover:text-amber-400 transition">{rec.name}</h4>
                                <span className="text-green-400 font-mono font-bold text-xs">{rec.yield}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-3">"{rec.reason}"</p>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full" style={{ width: `${rec.score}%` }} />
                            </div>
                            <p className="text-[10px] text-right text-amber-500 mt-1 font-bold">{rec.score}% Match</p>
                        </div>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="h-48 bg-slate-900/50 rounded-xl border border-white/5 p-2 relative">
                    <p className="absolute top-2 left-2 text-[10px] text-slate-500 font-bold uppercase">Risk (X) vs Yield (Y)</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <XAxis type="number" dataKey="x" name="Risk" hide />
                            <YAxis type="number" dataKey="y" name="Yield" hide />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
                            <Scatter name="Bonds" data={data} fill="#8884d8">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
