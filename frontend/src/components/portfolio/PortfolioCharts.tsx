'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function PortfolioCharts() {
    const allocationData = [
        { name: 'Govt Infra', value: 45, color: '#3b82f6' },  // Blue
        { name: 'Green Energy', value: 30, color: '#10b981' }, // Green
        { name: 'Corporate', value: 25, color: '#a855f7' },    // Purple
    ];

    const incomeData = [
        { month: 'Jan', amount: 2400 },
        { month: 'Feb', amount: 0 },
        { month: 'Mar', amount: 4800 },
        { month: 'Apr', amount: 2400 },
        { month: 'May', amount: 1200 },
        { month: 'Jun', amount: 6000 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* Asset Allocation */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Asset Allocation</h3>
                <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={allocationData}
                                cx="50%" cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {allocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <p className="text-xs text-slate-400">Total</p>
                        <p className="text-xl font-bold text-white">100%</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    {allocationData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-slate-300">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Income */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4"> Projected Income</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={incomeData}>
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Bar dataKey="amount" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-xs text-slate-500 mt-4">Estimated future coupon payouts based on current holdings.</p>
            </div>

        </div>
    );
}
