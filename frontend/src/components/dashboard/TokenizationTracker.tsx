'use client';

import { CheckCircle2, ExternalLink } from 'lucide-react';

export default function TokenizationTracker() {
    const steps = [
        { label: 'Bond Listed', status: 'completed', date: 'Jan 10' },
        { label: 'Tokens Minted', status: 'completed', date: 'Jan 12' },
        { label: 'Settlement', status: 'processing', date: 'In Progress' },
        { label: 'Blockchain Proof', status: 'pending', date: 'Pending' },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">Latest Tokenization Status</h3>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-2.5 left-2 right-2 h-0.5 bg-slate-800 -z-10" />

                <div className="flex justify-between relative">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-[#050b14] ${step.status === 'completed' ? 'border-green-500 text-green-500' :
                                step.status === 'processing' ? 'border-blue-500 text-blue-500 animate-pulse' :
                                    'border-slate-700 text-slate-700'
                                }`}>
                                {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                            <div className="text-center">
                                <p className={`text-[10px] font-bold ${step.status === 'completed' ? 'text-white' :
                                    step.status === 'processing' ? 'text-blue-400' : 'text-slate-600'
                                    }`}>{step.label}</p>
                                <p className="text-[9px] text-slate-500">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <button className="text-xs text-blue-400 hover:text-white flex items-center justify-center gap-1 transition">
                    View On-Chain Proof <ExternalLink className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
