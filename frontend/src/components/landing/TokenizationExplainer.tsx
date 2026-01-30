'use client';

import { FileText, Coins, BarChart3, TrendingUp } from 'lucide-react';

export function TokenizationExplainer() {
    const steps = [
        {
            icon: <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
            title: '1. Asset Selection',
            desc: 'High-value infrastructure assets (roads, ports, solar) are identified and audited.'
        },
        {
            icon: <Coins className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />,
            title: '2. Tokenization',
            desc: 'The asset value is split into digital tokens (e.g., ₹1,000 each) on the blockchain.'
        },
        {
            icon: <BarChart3 className="w-12 h-12 text-purple-600 dark:text-purple-400" />,
            title: '3. Investment',
            desc: 'Investors buy tokens and receive ownership rights + regular interest payouts.'
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400" />,
            title: '4. Returns',
            desc: 'Interest is paid directly to your wallet. Trade tokens anytime on the secondary market.'
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                    How Tokenization Works
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16">
                    We bridge the gap between traditional finance and blockchain technology.
                </p>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-700">
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                                {step.desc}
                            </p>

                            {/* Connector Line (Desktop) */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-slate-300 dark:bg-slate-700 z-10"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
