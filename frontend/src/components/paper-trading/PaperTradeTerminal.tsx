'use client';

import { useState } from 'react';
import { ShoppingCart, RefreshCw } from 'lucide-react';

export default function PaperTradeTerminal() {
    const [side, setSide] = useState('buy');
    const [qty, setQty] = useState(10);
    const price = 1042.00;
    const total = qty * price;

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-indigo-400" /> Trade Console
                </h3>
                <span className="text-[10px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    Simulation Mode
                </span>
            </div>

            {/* Bond Info */}
            <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-white/5">
                <h4 className="text-sm font-bold text-white">NHAI Green Bond IV</h4>
                <p className="text-xs text-slate-400 mb-2">Government Backed • AAA Rated</p>
                <p className="text-2xl font-bold text-white">₹{price.toFixed(2)}</p>
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-lg">
                    <button onClick={() => setSide('buy')} className={`py-2 text-sm font-bold rounded-md transition ${side === 'buy' ? 'bg-green-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Buy</button>
                    <button onClick={() => setSide('sell')} className={`py-2 text-sm font-bold rounded-md transition ${side === 'sell' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Sell</button>
                </div>

                <div>
                    <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Quantity (Units)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono font-bold focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="py-4 border-t border-white/5">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Total Simulation Cost</span>
                        <span className="text-white font-bold font-mono">₹{total.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 text-right">Fee: ₹0.00 (Waived for Paper)</p>
                </div>
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-sm shadow-xl transform active:scale-95 transition flex items-center justify-center gap-2 ${side === 'buy' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
                }`}>
                {side === 'buy' ? 'Simulate Buy Order' : 'Simulate Sell Order'}
            </button>
        </div>
    );
}
