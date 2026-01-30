'use client';

import { Calendar, Bell, ChevronRight, Clock } from 'lucide-react';

export default function ComplianceCalendar() {
    const events = [
        { day: '15', month: 'FEB', title: 'Q4 Tax Planning Filing', type: 'Tax', urgent: true },
        { day: '28', month: 'FEB', title: 'Annual KYC Renewal', type: 'Compliance', urgent: false },
        { day: '10', month: 'MAR', title: 'Start of Bond Maturity Period', type: 'Action', urgent: false },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" /> Compliance Calendar
                </h3>
                <button className="text-xs text-blue-400 hover:text-white flex items-center gap-1 transition">
                    View All <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="flex-1 space-y-4">
                {events.map((event, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition group cursor-pointer border border-transparent hover:border-white/5">
                        <div className={`flex flex-col items-center justify-center w-12 h-14 rounded-lg bg-slate-900 border border-slate-700 ${event.urgent ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : ''}`}>
                            <span className="text-[10px] uppercase font-bold text-slate-500">{event.month}</span>
                            <span className="text-xl font-bold text-white">{event.day}</span>
                        </div>
                        <div className="flex-1 py-0.5">
                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition mb-1">{event.title}</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{event.type}</span>
                                {event.urgent && <span className="text-[10px] text-red-400 flex items-center gap-1 font-bold animate-pulse"><Clock className="w-3 h-3" /> Due Soon</span>}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition">
                                <Bell className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center justify-center gap-2">
                Sync with Google Calendar
            </button>
        </div>
    );
}
