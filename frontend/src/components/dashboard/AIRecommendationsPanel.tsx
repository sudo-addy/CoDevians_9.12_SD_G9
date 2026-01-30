'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AIRecommendationsPanel() {
    const router = useRouter();

    const recommendations = [
        {
            id: 'rec1',
            name: 'Green Energy Solar Bond 2026',
            yield: '12.5%',
            risk: 'Low',
            confidence: 94,
            reason: 'Strong govt backing + High solar sector growth expected in Q3.'
        },
        {
            id: 'rec2',
            name: 'NHAI Infrastructure Series V',
            yield: '9.8%',
            risk: 'Very Low',
            confidence: 98,
            reason: 'Safest bet for capital preservation with consistent payouts.'
        },
        {
            id: 'rec3',
            name: 'Adani Ports Expansion Bond',
            yield: '14.2%',
            risk: 'Medium',
            confidence: 88,
            reason: 'High yield opportunity due to recent port volume surge.'
        }
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> AI Recommendations
                </h3>
                <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20">
                    Beta v1.0
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((rec, i) => (
                    <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-amber-500/30 transition-all cursor-pointer"
                        onClick={() => router.push('/bonds')}
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-5 h-5 text-amber-500 -rotate-45" />
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                {rec.risk} Risk
                            </span>
                            <span className="text-green-400 font-mono font-bold text-sm bg-green-900/20 px-2 py-1 rounded">
                                {rec.yield} Yield
                            </span>
                        </div>

                        <h4 className="font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                            {rec.name}
                        </h4>

                        <p className="text-xs text-slate-400 leading-relaxed mb-4 border-l-2 border-slate-700 pl-3">
                            "{rec.reason}"
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                            <div className="flex items-center gap-1.5">
                                <Zap className="w-3 h-3 text-amber-500" />
                                <span className="text-xs text-slate-300 font-semibold">
                                    {rec.confidence}% Match
                                </span>
                            </div>
                            <button className="text-[10px] font-bold text-blue-400 uppercase hover:text-white transition">
                                Analyze
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
