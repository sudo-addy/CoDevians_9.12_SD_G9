'use client';

import { useState } from 'react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    Tooltip, BarChart, Bar, ComposedChart, CartesianGrid
} from 'recharts';
import { Maximize2, RefreshCcw } from 'lucide-react';

export default function TradingChart() {
    const [timeframe, setTimeframe] = useState('1D');

    const data = [
        { time: '09:30', price: 1040.2, volume: 2400 },
        { time: '10:00', price: 1042.5, volume: 1398 },
        { time: '10:30', price: 1041.8, volume: 9800 },
        { time: '11:00', price: 1043.2, volume: 3908 },
        { time: '11:30', price: 1044.5, volume: 4800 },
        { time: '12:00', price: 1044.0, volume: 3800 },
        { time: '12:30', price: 1043.5, volume: 4300 },
        { time: '13:00', price: 1042.8, volume: 2400 },
        { time: '13:30', price: 1042.5, volume: 1398 },
        { time: '14:00', price: 1043.0, volume: 9800 },
        { time: '14:30', price: 1043.8, volume: 3908 },
        { time: '15:00', price: 1044.1, volume: 4800 },
        { time: '15:30', price: 1044.2, volume: 3800 },
    ];

    return (
        <div className="glass-panel p-4 rounded-xl h-[450px] flex flex-col">
            {/* Chart Controls */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                    {['1D', '1W', '1M', '6M', 'YTD', '5Y'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition ${timeframe === tf
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 text-slate-500">
                    <button className="hover:text-white p-1"><RefreshCcw className="w-4 h-4" /></button>
                    <button className="hover:text-white p-1"><Maximize2 className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Main Chart Area */}
            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `₹${val}`}
                            domain={['auto', 'auto']}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="volume" barSize={20} fill="#1e293b" yAxisId="volume" opacity={0.5} />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                        <YAxis yAxisId="volume" hide />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
