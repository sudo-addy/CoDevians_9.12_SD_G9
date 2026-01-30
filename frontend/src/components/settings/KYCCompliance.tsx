'use client';

import { CheckCircle, Shield, FileText, Upload } from 'lucide-react';

export default function KYCCompliance() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Status Header */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-green-900/40 to-slate-900 border border-green-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white shadow-xl shadow-green-900/40">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">KYC Verified</h3>
                        <p className="text-slate-400 font-medium mt-1">Your account is fully compliant with SEBI & RBI regulations.</p>
                        <div className="flex gap-3 mt-4">
                            <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 flex items-center gap-2">
                                <Shield className="w-3 h-3" /> AML Monitoring Active
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Audit Logs Enabled
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0a111e]/50 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" /> Submitted Documents
                    </h4>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated: Jan 2026</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 flex items-center justify-between group hover:border-blue-500/30 transition">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition">PAN Card</p>
                                <p className="text-xs text-slate-500">Verified on Jan 15, 2026</p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 flex items-center justify-between group hover:border-blue-500/30 transition">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white group-hover:text-purple-400 transition">GST Certificate</p>
                                <p className="text-xs text-slate-500">Verified on Jan 15, 2026</p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                        <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-300">Upload Additional Documents</p>
                    <p className="text-xs text-slate-500 mb-4 max-w-sm">
                        Need to update your address or bank details? Upload the relevant proofs here for manual verification.
                    </p>
                    <button className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition border border-slate-600">
                        Select Files
                    </button>
                </div>
            </div>
        </div>
    );
}
