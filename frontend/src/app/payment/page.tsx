'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Timer, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const plan = searchParams.get('plan') || 'Premium Plan';
    const amount = searchParams.get('amount') || '499';

    const [timeLeft, setTimeLeft] = useState(10);
    const [status, setStatus] = useState<'pending' | 'success'>('pending');

    useEffect(() => {
        if (timeLeft > 0 && status === 'pending') {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && status === 'pending') {
            handlePaymentSuccess();
        }
    }, [timeLeft, status]);

    const handlePaymentSuccess = () => {
        setStatus('success');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#1d4ed8', '#60a5fa', '#ffffff']
        });

        // Update User State
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            const updatedUser = {
                ...user,
                subscription_tier: plan.toLowerCase().replace(' ', '_'),
                role: 'premium' // Upgrade role to premium for access
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Also update cookie if possible or needed, though client-side cookie access is limited depending on HttpOnly
            // Just relying on localStorage for this demo
        }

        // Redirect after animation
        setTimeout(() => {
            // Force hard reload or ensure dashboard re-checks localStorage
            window.location.href = '/dashboard';
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">

                {/* Header */}
                <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-600/20 blur-3xl rounded-full scale-150 -translate-y-10"></div>
                    <button onClick={() => router.back()} className="absolute left-4 top-1/2 -translate-y-1/2 hover:bg-white/10 p-2 rounded-full transition">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold relative z-10">Complete Payment</h1>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-1 relative z-10">
                        <ShieldCheck className="w-3 h-3" /> Secure Gateway
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'pending' ? (
                        <motion.div
                            key="payment-pending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-8 flex flex-col items-center"
                        >
                            <div className="text-center mb-8">
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total Amount</p>
                                <div className="text-4xl font-bold text-slate-900 dark:text-white">
                                    ₹{Number(amount).toLocaleString()}
                                </div>
                                <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mt-2">
                                    {plan}
                                </div>
                            </div>

                            {/* Fake QR Code */}
                            <div className="relative mb-8 p-4 bg-white rounded-2xl shadow-inner border border-slate-100">
                                <QRCodeSVG
                                    value={`upi://pay?pa=mudra@upi&pn=MudraInvest&am=${amount}&cu=INR`}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-10 h-10 bg-white rounded-full p-1 shadow-md">
                                        <img src="/logo.png" alt="" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Timer className="w-4 h-4" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-slate-900 dark:text-white">Processing...</p>
                                        <p className="text-xs text-slate-500">Auto-confirming in</p>
                                    </div>
                                </div>
                                <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 min-w-[3ch]">
                                    00:{timeLeft.toString().padStart(2, '0')}
                                </div>
                            </div>

                            <p className="text-xs text-center text-slate-400 max-w-xs mx-auto">
                                Scan the QR code with any UPI app effectively simulates a real transaction for this demo.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="payment-success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center"
                        >
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 text-green-500 animate-[bounce_1s_infinite]">
                                <Check className="w-12 h-12" strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">
                                You have successfully upgraded to <br />
                                <strong className="text-slate-900 dark:text-white">{plan}</strong>
                            </p>

                            <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-500">Transaction ID</span>
                                    <span className="font-mono text-slate-900 dark:text-white">TXN_{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-500">Amount Paid</span>
                                    <span className="font-bold text-slate-900 dark:text-white">₹{Number(amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Status</span>
                                    <span className="text-green-500 font-bold flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Completed
                                    </span>
                                </div>
                            </div>

                            <p className="mt-8 text-sm text-slate-400">Redirecting to dashboard...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
