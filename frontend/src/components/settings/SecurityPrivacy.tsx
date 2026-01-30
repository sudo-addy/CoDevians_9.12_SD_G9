'use client';

import { Lock, Smartphone, LogOut, ShieldAlert, Key } from 'lucide-react';

export default function SecurityPrivacy() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-red-900/40 to-slate-900 border border-red-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-white shadow-xl shadow-red-900/40">
                        <Lock className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Security Center</h3>
                        <p className="text-slate-400 font-medium mt-1">Manage your password, 2FA, and active sessions.</p>
                    </div>
                </div>
            </div>

            {/* Password & 2FA */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Key className="w-5 h-5 text-amber-500" /> Authentication
                    </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase transition-colors group-hover:text-amber-400">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-white transition-all outline-none" />
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase transition-colors group-hover:text-amber-400">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-500 focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-white transition-all outline-none" />
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50 group hover:border-blue-500/30 transition">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-white group-hover:text-blue-400 transition">Two-Factor Authentication (2FA)</p>
                            <p className="text-sm text-slate-400">Secure your account with OTP via Authenticator App</p>
                        </div>
                    </div>
                    <div className="w-14 h-8 bg-green-500 rounded-full relative cursor-pointer shadow-lg shadow-green-500/20">
                        <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform" />
                    </div>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-slate-400" /> Active Sessions
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-xs text-slate-500 border-b border-slate-800">
                                <th className="pb-4 pl-2 font-bold uppercase tracking-wider">Device</th>
                                <th className="pb-4 font-bold uppercase tracking-wider">Location</th>
                                <th className="pb-4 font-bold uppercase tracking-wider">Status</th>
                                <th className="pb-4 text-right pr-2 font-bold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            <tr className="group hover:bg-white/5 transition">
                                <td className="py-4 pl-2 text-white font-medium">Chrome / Windows (This Device)</td>
                                <td className="py-4 text-slate-400">Mumbai, India</td>
                                <td className="py-4"><span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20">Active Now</span></td>
                                <td className="py-4 text-right pr-2"></td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition">
                                <td className="py-4 pl-2 text-white font-medium">Safari / iPhone 15 Pro</td>
                                <td className="py-4 text-slate-400">Mumbai, India</td>
                                <td className="py-4 text-slate-500 text-xs font-medium">2h ago</td>
                                <td className="py-4 text-right pr-2">
                                    <button className="text-red-400 hover:text-red-300 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded transition">Revoke</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="mt-8 w-full py-3 bg-red-500/10 hover:bg-red-900/40 text-red-500 hover:text-red-400 border border-red-500/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition">
                    <LogOut className="w-4 h-4" /> Logout from All Devices
                </button>
            </div>
        </div>
    );
}
