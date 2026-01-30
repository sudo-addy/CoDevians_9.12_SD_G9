'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketMoversWidget() {
    const movers = [
        { symbol: 'NHAI 27', price: 1042.50, change: +1.2, type: 'up' },
        { symbol: 'IRFC 28', price: 980.00, change: -0.5, type: 'down' },
        { symbol: 'MUM-METRO', price: 525.00, change: +2.4, type: 'up' },
        { symbol: 'GREEN-PWR', price: 1100.20, change: +0.8, type: 'up' },
        { symbol: 'ADANI-PT', price: 720.00, change: -1.1, type: 'down' },
        { symbol: 'TATA-PWR', price: 850.50, change: +0.5, type: 'up' },
    ];

    return (
        <div className="w-full h-12 bg-slate-900/80 border-b border-white/5 flex items-center overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050b14] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050b14] to-transparent z-10" />

            <div className="flex items-center px-4 font-bold text-xs text-blue-400 shrink-0 z-20 bg-[#050b14] h-full border-r border-white/5">
                MARKET PULSE
            </div>

            <motion.div
                className="flex items-center gap-8 px-4"
                animate={{ x: [0, -500] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {[...movers, ...movers, ...movers].map((m, i) => ( // Tripled for seamless loop loop
                    <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                        <span className="font-bold text-slate-300">{m.symbol}</span>
                        <span className="font-mono text-white">₹{m.price.toFixed(2)}</span>
                        <div className={`flex items-center text-[10px] font-bold ${m.type === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {m.type === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(m.change)}%
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
