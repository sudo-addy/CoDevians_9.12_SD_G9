'use client';

export function ImpactDashboard() {
    const metrics = [
        { label: 'CO2 Offset (Tons)', value: '12,450', color: 'text-green-500' },
        { label: 'Jobs Created', value: '8,500', color: 'text-blue-500' },
        { label: 'Green Energy (MW)', value: '450', color: 'text-yellow-500' },
        { label: 'Roads Built (km)', value: '1,200', color: 'text-orange-500' }
    ];

    return (
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-3xl rounded-full translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-green-900/30 border border-green-800 text-green-400 text-sm font-semibold">
                            SDG 9: Industry, Innovation & Infrastructure
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Investing for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                                Sustainable Impact
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-md">
                            Your investments don't just earn interest—they build the future. We track real-time impact metrics aligned with UN SDG Goals.
                        </p>
                        <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition">
                            View Impact Report
                        </button>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-2 gap-6">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                                <p className={`text-4xl font-bold mb-2 ${m.color}`}>{m.value}</p>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{m.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
