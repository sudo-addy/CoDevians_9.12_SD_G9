'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import ProfileSettings from '@/components/settings/ProfileSettings';
import KYCCompliance from '@/components/settings/KYCCompliance';
import SecurityPrivacy from '@/components/settings/SecurityPrivacy';
import APIAccess from '@/components/settings/APIAccess';
import NotificationPrefs from '@/components/settings/NotificationPrefs';
import { Menu, User, ShieldCheck, Lock, Key, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        // Auth check
        const user = localStorage.getItem('user');
        if (!user) router.push('/login');
        setLoading(false);
    }, [router]);

    if (loading) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'kyc': return <KYCCompliance />;
            case 'security': return <SecurityPrivacy />;
            case 'api': return <APIAccess />;
            case 'notifications': return <NotificationPrefs />;
            default: return <ProfileSettings />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans selection:bg-blue-500/30">
            <Sidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">

                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-[#050b14]/80 backdrop-blur-xl z-30 border-b border-white/5">
                    <div className="lg:hidden">
                        <Menu className="w-6 h-6 text-white" />
                    </div>

                    <div className="font-bold text-lg text-white">Settings</div>
                </header>

                <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Settings Navigation */}
                    <div className="lg:col-span-1 space-y-1">
                        {[
                            { id: 'profile', label: 'Profile', icon: User },
                            { id: 'kyc', label: 'KYC & Compliance', icon: ShieldCheck },
                            { id: 'security', label: 'Security', icon: Lock },
                            { id: 'api', label: 'API Access', icon: Key },
                            { id: 'notifications', label: 'Notifications', icon: Bell },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" /> {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {renderContent()}
                    </div>

                </main>
            </div>
        </div>
    );
}
