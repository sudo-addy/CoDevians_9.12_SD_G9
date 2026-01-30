'use client';

import { Bell, Mail, MessageSquare, Radio } from 'lucide-react';

export default function NotificationPrefs() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-purple-900/40 to-slate-900 border border-purple-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-900/40">
                        <Bell className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Notifications</h3>
                        <p className="text-slate-400 font-medium mt-1">Customize how and when you want to be alerted.</p>
                    </div>
                </div>
            </div>

            {/* Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#0a111e]/80 rounded-3xl border border-blue-500/50 flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden group shadow-lg shadow-blue-900/20">
                    <div className="absolute top-0 right-0 p-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition">
                        <Mail className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-white block">Email Alerts</span>
                        <span className="text-xs text-slate-400">Daily Digest</span>
                    </div>
                </div>

                <div className="p-6 bg-[#0a111e]/80 rounded-3xl border border-amber-500/50 flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden group shadow-lg shadow-amber-900/20">
                    <div className="absolute top-0 right-0 p-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition">
                        <Bell className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-white block">Push Notifications</span>
                        <span className="text-xs text-slate-400">Real-time</span>
                    </div>
                </div>

                <div className="p-6 bg-[#0a111e]/40 rounded-3xl border border-white/5 flex flex-col items-center gap-4 cursor-not-allowed opacity-60">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-slate-500" />
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-slate-400 block">SMS Alerts</span>
                        <span className="text-[10px] text-slate-500 border border-slate-700 px-2 py-0.5 rounded mt-1 inline-block">PREMIUM ONLY</span>
                    </div>
                </div>
            </div>

            {/* Toggles */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Radio className="w-5 h-5 text-purple-400" /> Alert Preferences
                </h4>
                <div className="space-y-6">
                    {[
                        { label: 'Trade Executions', desc: 'Notify when buy/sell orders are filled.', active: true },
                        { label: 'Price Alerts', desc: 'Notify when assets hit your target price.', active: true },
                        { label: 'Regulatory Updates', desc: 'Notify on new SEBI/RBI circulars.', active: true },
                        { label: 'Security Logins', desc: 'Alert for new device logins.', active: true },
                        { label: 'Marketing & Tips', desc: 'Product updates and investment tips.', active: false }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition">
                            <div>
                                <span className="text-sm text-white font-bold block">{item.label}</span>
                                <span className="text-xs text-slate-400">{item.desc}</span>
                            </div>
                            <div className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-purple-600' : 'bg-slate-700'}`}>
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${item.active ? 'left-6' : 'left-1'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
