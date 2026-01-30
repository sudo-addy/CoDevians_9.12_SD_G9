'use client';

import { Trophy, Medal, Crown } from 'lucide-react';

export default function GamificationPanel() {
    const leaderboard = [
        { rank: 1, name: 'CryptoKing', return: '+45%', score: 980 },
        { rank: 2, name: 'BondWhale', return: '+32%', score: 850 },
        { rank: 3, name: 'SafeHands', return: '+28%', score: 810 },
        { rank: 4, name: 'You', return: '0%', score: 100 },
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Leaderboard
                </h3>
                <span className="text-xs text-slate-400">Weekly Challenge</span>
            </div>

            {/* Top 3 List */}
            <div className="flex-1 space-y-2 mb-4">
                {leaderboard.map((user) => (
                    <div key={user.rank} className={`flex items-center justify-between p-3 rounded-xl border ${user.name === 'You' ? 'bg-indigo-600/20 border-indigo-500/50' : 'bg-slate-900/50 border-white/5'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${user.rank === 1 ? 'bg-amber-400 text-amber-900' :
                                    user.rank === 2 ? 'bg-slate-300 text-slate-900' :
                                        user.rank === 3 ? 'bg-amber-700 text-amber-100' :
                                            'bg-slate-700 text-slate-300'
                                }`}>
                                {user.rank}
                            </div>
                            <span className={`text-sm font-bold ${user.name === 'You' ? 'text-indigo-300' : 'text-slate-300'}`}>{user.name}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-green-400">{user.return}</p>
                            <p className="text-[10px] text-slate-500">{user.score} XP</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Badges */}
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Your Badges</h4>
                <div className="flex gap-2">
                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 opacity-50 grayscale hover:grayscale-0 transition cursor-help" title="Locked: Complete 1st trade">
                        <Medal className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700 opacity-50 grayscale hover:grayscale-0 transition cursor-help" title="Locked: Top 10 Rank">
                        <Crown className="w-5 h-5 text-amber-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}
