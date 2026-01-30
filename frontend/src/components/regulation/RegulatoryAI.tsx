'use client';

import { Send, Bot, Sparkles, HelpCircle } from 'lucide-react';

export default function RegulatoryAI() {
    return (
        <div className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col relative overflow-hidden border border-blue-500/20">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Bot className="w-32 h-32 text-blue-500" />
            </div>

            <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        RegulAI Assistant <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 uppercase">Beta</span>
                    </h3>
                    <p className="text-xs text-slate-400">Ask about SEBI rules, Taxation & Compliance</p>
                </div>
            </div>

            <div className="flex-1 space-y-4 mb-4 overflow-y-auto custom-scrollbar">
                {/* AI Message */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-sm text-slate-200 leading-relaxed shadow-sm">
                        <p>Hello! I am your regulatory compliance assistant. I can help interpret complex SEBI circulars or explain tax implications on your bond portfolio. Try asking:</p>
                        <div className="mt-3 grid gap-2">
                            <button className="text-left text-xs bg-black/20 hover:bg-black/40 p-2 rounded-lg transition border border-white/5 flex items-center gap-2 text-slate-300">
                                <HelpCircle className="w-3 h-3 text-blue-400" /> Is interest from Green Bonds taxable?
                            </button>
                            <button className="text-left text-xs bg-black/20 hover:bg-black/40 p-2 rounded-lg transition border border-white/5 flex items-center gap-2 text-slate-300">
                                <HelpCircle className="w-3 h-3 text-blue-400" /> Explain SEBI's new fractional ownership rules.
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mock User Message */}
                <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0 mt-1">
                        <span className="text-xs font-bold">ME</span>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-sm text-white leading-relaxed shadow-lg shadow-blue-900/20">
                        <p>What are the KYC requirements for institutional investors?</p>
                    </div>
                </div>

                {/* AI Response (Streaming) */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-sm text-slate-200 leading-relaxed shadow-sm">
                        <p>For institutional investors, SEBI requires:</p>
                        <ul className="list-disc ml-4 mt-1 space-y-1 text-slate-300">
                            <li>Certificate of Incorporation</li>
                            <li>Board Resolution for trading</li>
                            <li>PAN Card of the entity</li>
                            <li>Authorized Signatory list</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Ask a compliance question..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 shadow-inner"
                />
                <button className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition">
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
