'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, PieChart } from 'lucide-react';

interface PortfolioPerformanceProps {
    data: {
        total_invested: number;
        current_value: number;
        gain_percentage: number;
    } | null;
}

export default function PortfolioPerformanceChart({ data }: PortfolioPerformanceProps) {
    if (!data) return null;

    const allocation = [
        { label: 'Govt Bonds', value: 45, color: 'bg-blue-500' },
        { label: 'Green Energy', value: 30, color: 'bg-green-500' },
        { label: 'Corp Debt', value: 25, color: 'bg-purple-500' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Performance Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="col-span-2 bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" /> Portfolio Performance
                        </h3>
                        <p className="text-slate-400 text-xs">Real-time valuation updates</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white tracking-tight">
                            {data.gain_percentage >= 0 ? '+' : ''}{data.gain_percentage}%
                        </p>
                        <p className={`text-xs font-bold ${data.gain_percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            Annualized Return (XIRR)
                        </p>
                    </div>
                </div>

                {/* Mock Chart Area */}
                <div className="h-48 w-full bg-gradient-to-t from-blue-500/5 to-transparent rounded-xl border border-white/5 flex items-end justify-between px-2 pt-10 pb-2 relative">
                    {/* Simple CSS Bar Chart for demo visual */}
                    {[40, 65, 55, 80, 70, 95, 85, 100].map((h, i) => (
                        <div
                            key={i}
                            className="w-[10%] bg-blue-500/20 hover:bg-blue-500/40 rounded-t-sm transition-all relative group"
                            style={{ height: `${h}%` }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Value: {h}
                            </div>
                        </div>
                    ))}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-slate-700" />
                </div>
            </motion.div>

            {/* Asset Allocation Donut */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-6"
            >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-400" /> Asset Allocation
                </h3>

                <div className="space-y-6">
                    {allocation.map((item) => (
                        <div key={item.label}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-300">{item.label}</span>
                                <span className="text-white font-bold">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${item.color}`}
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition text-sm font-medium flex items-center justify-center gap-2">
                    <ArrowUpRight className="w-4 h-4" /> Rebalance Portfolio
                </button>
            </motion.div>
        </div>
    );
}
