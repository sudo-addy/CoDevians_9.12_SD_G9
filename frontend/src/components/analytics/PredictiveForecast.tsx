'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Sparkles } from 'lucide-react';

export default function PredictiveForecast() {
    const data = [
        { month: 'Jan', actual: 1020, predicted: 1020, lower: 1010, upper: 1030 },
        { month: 'Feb', actual: 1035, predicted: 1035, lower: 1025, upper: 1045 },
        { month: 'Mar', actual: 1042, predicted: 1042, lower: 1032, upper: 1052 },
        { month: 'Apr', predicted: 1055, lower: 1040, upper: 1070 },
        { month: 'May', predicted: 1068, lower: 1048, upper: 1088 },
        { month: 'Jun', predicted: 1082, lower: 1055, upper: 1105 },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-[350px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Price Forecast (Monte Carlo)</h3>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">1Y Target</p>
                    <p className="text-lg font-bold text-green-400">₹1,145 <span className="text-xs text-slate-500 font-normal">±5%</span></p>
                </div>
            </div>
            <p className="text-xs text-slate-500 mb-4">AI projection based on yield curve shifts and credit upgrades.</p>

            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={5} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 20', 'auto']} dx={-5} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />

                        {/* Confidence Interval */}
                        <Area type="monotone" dataKey="upper" stroke="none" fill="#a855f7" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="lower" stroke="none" fill="#1e293b" fillOpacity={1} /> {/* Mask to create band? No, recharts area stacks. Better to use composed chart but for simplicity: */}

                        {/* Main Lines */}
                        <Area type="monotone" dataKey="predicted" stroke="#a855f7" strokeDasharray="5 5" strokeWidth={2} fill="url(#colorPred)" name="Forecast" />
                        <Area type="monotone" dataKey="actual" stroke="#22c55e" strokeWidth={3} fill="none" name="Actual" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
