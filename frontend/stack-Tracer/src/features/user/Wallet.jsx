import React, { useState } from 'react';
import { useGetBalanceQuery, useDepositMoneyMutation, useWithdrawMoneyMutation } from './userApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, CheckCircle2, ShieldAlert, Loader2, DollarSign } from 'lucide-react';

const Wallet = () => {
    const { data: balanceData, refetch, isLoading: isBalanceLoading } = useGetBalanceQuery();
    const [deposit, { isLoading: isDepositLoading }] = useDepositMoneyMutation();
    const [withdraw, { isLoading: isWithdrawLoading }] = useWithdrawMoneyMutation();
    const [amount, setAmount] = useState('');

    const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: 'success', message: '' });

    const isActionLoading = isDepositLoading || isWithdrawLoading;

    const handleAction = async (type) => {
        if (!amount || amount <= 0) {
          setAlertConfig({ isOpen: true, type: 'error', message: 'נא להזין סכום חיובי ותקין לביצוע הפעולה.' });
          return;
        }
        try {
            if (type === 'deposit') {
                await deposit(Number(amount)).unwrap();
                setAlertConfig({ isOpen: true, type: 'success', message: `סכום של $${Number(amount).toLocaleString()} הופקד בהצלחה בארנק!` });
            } else {
                await withdraw(Number(amount)).unwrap();
                setAlertConfig({ isOpen: true, type: 'success', message: `פעולת המשיכה עבור $${Number(amount).toLocaleString()} בוצעה בהצלחה!` });
            }
            setAmount('');
            refetch();
        } catch (err) {
           
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto min-h-screen bg-[#07080b] text-slate-200 text-right flex flex-col justify-center relative overflow-hidden" dir="rtl">
            
            {/* אפקט הילת אור יוקרתית ברקע */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-500/[0.02] to-transparent rounded-full blur-[120px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0d111c]/70 backdrop-blur-md rounded-[3.5rem] shadow-[0_40px_90px_rgba(0,0,0,0.7)] overflow-hidden border border-slate-900"
            >
                {/* קארד עליון - תצוגת יתרה דרמטית */}
                <div className="bg-gradient-to-b from-[#121624] to-transparent p-12 text-center text-white relative border-b border-slate-900">
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                    
                    <p className="text-amber-400 font-black uppercase tracking-widest text-[18px] mb-3 flex items-center justify-center gap-1.5">יתרה</p>
                    
                    <h2 className="text-6xl md:text-7xl font-black text-white font-mono tracking-tight my-4">
                        {isBalanceLoading ? (
                            <span className="text-slate-700 animate-pulse">$--,--</span>
                        ) : (
                            `$${(balanceData?.balance ?? 0).toLocaleString()}`
                        )}
                    </h2>
                    
                    <div className="mt-4 inline-flex bg-emerald-500/5 text-emerald-400 px-4 py-1.5 rounded-full text-[11px] font-black border border-emerald-500/10 tracking-wide gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        פרוטוקול אבטחה פעיל ✓
                    </div>
                </div>
                
                {/* חלק תחתון - טופס פעולות */}
                <div className="p-12 space-y-8">
                    <div className="space-y-3">
                        <label className="block text-slate-400 font-black mr-1 text-[10px] uppercase tracking-widest">
                          סכום לביצוע פעולה (USD)
                        </label>
                        <div className="relative group">
                            <input 
                                type="number" 
                                value={amount}
                                disabled={isActionLoading}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-6 bg-[#07080b] border border-slate-900 focus:border-amber-500/40 focus:shadow-[0_0_30px_rgba(245,158,11,0.05)] rounded-[2rem] text-4xl font-black text-white text-center font-mono transition-all outline-none disabled:opacity-50"
                                placeholder="0.00"
                            />
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-mono font-black text-slate-600 text-xl group-focus-within:text-amber-400 transition-colors">$</span>
                        </div>
                    </div>

                    {/* בחירת סכום מהירה משולבת */}
                    <div className="grid grid-cols-3 gap-3">
                        {[100, 500, 1000].map((value) => (
                            <button
                                key={value}
                                disabled={isActionLoading}
                                onClick={() => setAmount(value)}
                                className="bg-[#141a29] hover:bg-slate-800 text-slate-400 hover:text-white p-4 rounded-2xl font-black font-mono text-xs transition-all border border-slate-800/80 cursor-pointer active:scale-95 disabled:opacity-40"
                            >
                                ${value.toLocaleString()}
                            </button>
                        ))}
                    </div>

                    {/* כפתורי פעולה פיננסיים */}
                    <div className="grid grid-cols-2 gap-6 pt-2">
                        <button 
                            onClick={() => handleAction('deposit')} 
                            disabled={isActionLoading}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white p-5 rounded-[1.75rem] font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 disabled:opacity-40"
                        >
                            {isDepositLoading ? <Loader2 className="animate-spin" size={16} /> : <><ArrowUpRight size={16} /> הפקדת הון</>}
                        </button>
                        
                        <button 
                            onClick={() => handleAction('withdraw')} 
                            disabled={isActionLoading}
                            className="bg-[#141a29] hover:bg-slate-800 text-slate-300 p-5 rounded-[1.75rem] font-black text-sm uppercase tracking-wider border border-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                        >
                            {isWithdrawLoading ? <Loader2 className="animate-spin" size={16} /> : <><ArrowDownLeft size={16} /> משיכת הון</>}
                        </button>
                    </div>
                    
                    <p className="text-center text-slate-600 text-[11px] font-medium tracking-wide pt-4">
                        * סנכרון רשת המערכת הוא מיידי. העברות צד ג׳ עשויות לקחת זמן עיבוד נוסף.
                    </p>
                </div>
            </motion.div>

            {/* 🌟 חלונית הודעות ניאון מונפשת */}
            <AnimatePresence>
                {alertConfig.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.93, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 15 }}
                            className={`w-full max-w-sm p-8 bg-[#0d111c] border rounded-[2.5rem] text-center shadow-[0_40px_90px_rgba(0,0,0,0.8)] relative ${
                                alertConfig.type === 'success' ? 'border-emerald-500/20' : 'border-rose-500/20'
                            }`}
                        >
                            <div className="flex flex-col items-center mt-2">
                                {alertConfig.type === 'success' ? (
                                    <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-full mb-4 border border-emerald-500/20">
                                        <CheckCircle2 size={36} className="animate-bounce" />
                                    </div>
                                ) : (
                                    <div className="p-3.5 bg-rose-500/10 text-rose-400 rounded-full mb-4 border border-rose-500/20">
                                        <ShieldAlert size={36} className="animate-pulse" />
                                    </div>
                                )}
                                <h3 className={`text-lg font-black tracking-tight ${alertConfig.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {alertConfig.type === 'success' ? 'הפעולה בוצעה בהצלחה' : 'הפעולה נכשלה'}
                                </h3>
                                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed px-1">{alertConfig.message}</p>
                                
                                <button 
                                    onClick={() => setAlertConfig({ ...alertConfig, isOpen: false })}
                                    className="mt-6 px-6 py-2.5 bg-[#141a29] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-black rounded-xl transition-colors cursor-pointer"
                                >
                                    הבנתי, תודה
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Wallet;