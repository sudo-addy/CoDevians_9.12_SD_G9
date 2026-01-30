'use client';

export default function MarketHeatmap() {
    const sectors = [
        { name: 'Govt Infra', value: 40, change: +1.2, color: 'bg-green-600' },
        { name: 'Green Bonds', value: 25, change: +2.5, color: 'bg-green-500' },
        { name: 'Power Corp', value: 15, change: -0.5, color: 'bg-red-500' },
        { name: 'Banking', value: 10, change: +0.8, color: 'bg-green-600/80' },
        { name: 'Real Estate', value: 5, change: -1.8, color: 'bg-red-600' },
        { name: 'Tech', value: 5, change: +0.2, color: 'bg-slate-600' },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Market Sector Heatmap</h3>
                <p className="text-xs text-slate-400">Size by Market Cap • Color by 24h Change</p>
            </div>

            <div className="flex-1 flex flex-wrap gap-1">
                {sectors.map((sector, i) => (
                    <div
                        key={i}
                        className={`${sector.color} hover:brightness-110 transition cursor-pointer rounded-lg relative overflow-hidden group border border-white/5 flex items-center justify-center p-2 text-center`}
                        style={{
                            width: `${sector.value}%`,
                            flexGrow: 1,
                            minWidth: '80px',
                            minHeight: '80px'
                        }}
                    >
                        <div className="z-10 group-hover:scale-105 transition-transform">
                            <p className="text-white font-bold text-xs md:text-sm leading-tight">{sector.name}</p>
                            <p className="text-white/80 font-mono text-[10px] md:text-xs mt-1">
                                {sector.change > 0 ? '+' : ''}{sector.change}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
