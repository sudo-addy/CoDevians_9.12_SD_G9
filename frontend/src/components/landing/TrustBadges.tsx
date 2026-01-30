'use client';

import { ShieldCheck, Lock, FileCheck, Building2 } from 'lucide-react';

export function TrustBadges() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900 py-10 border-y border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">
                    Trusted by Regulators & Audited by Top Firms
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 transition duration-500">
                    <div className="flex items-center gap-2 group">
                        <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition" />
                        <span className="text-lg font-bold text-slate-700 dark:text-slate-300">RBI Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400 group-hover:scale-110 transition" />
                        <span className="text-lg font-bold text-slate-700 dark:text-slate-300">SEBI Registered</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <Lock className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition" />
                        <span className="text-lg font-bold text-slate-700 dark:text-slate-300">AML/KYC Ready</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <FileCheck className="w-8 h-8 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition" />
                        <span className="text-lg font-bold text-slate-700 dark:text-slate-300">ISO 27001 Audited</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
