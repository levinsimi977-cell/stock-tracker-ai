import React, { useState } from 'react';
import { useDepositMoneyMutation, useWithdrawMoneyMutation } from './userApi'; 
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Coins, CheckCircle2, ShieldAlert, Loader2, Plus, Minus, Landmark } from 'lucide-react';

const AddFunds = () => {
    const [amount, setAmount] = useState('');
    const [depositMoney, { isLoading: isDepositLoading }] = useDepositMoneyMutation();
    const [withdrawMoney, { isLoading: isWithdrawLoading }] = useWithdrawMoneyMutation(); 

    const navigate = useNavigate();

    // מערכת הודעות ניאון פנימית אחידה
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: 'success', message: '' });

    const handleDeposit = async () => {
        if (!amount || amount <= 0) {
            setAlertConfig({ isOpen: true, type: 'error', message: 'נא להזין סכום חיובי ותקין להפקדה.' });
            return;
        }
        try {
            await depositMoney(Number(amount)).unwrap();
            setAlertConfig({
                isOpen: true,
                type: 'success',
                message: `סכום של $${Number(amount).toLocaleString()} הופקד בהצלחה וסונכרן מול חשבון המערכת!`
            });
            setTimeout(() => navigate('/dashboard'), 1800);
        } catch (err) {
            setAlertConfig({
                isOpen: true,
                type: 'error',
                message: err?.data?.message || 'שגיאה בעיבוד ההפקדה. נא לנסות שוב מאוחר יותר.'
            });
        }
    };

    const handleWithdraw = async () => {
        if (!amount || amount <= 0) {
            setAlertConfig({ isOpen: true, type: 'error', message: 'נא להזין סכום חיובי ותקין למשיכה.' });
            return;
        }
        try {
            await withdrawMoney(Number(amount)).unwrap();
            setAlertConfig({
                isOpen: true,
                type: 'success',
                message: `פעולת המשיכה עבור $${Number(amount).toLocaleString()} בוצעה בהצלחה והועברה לחשבונך!`
            });
            setTimeout(() => navigate('/dashboard'), 1800);
        } catch (err) {
            setAlertConfig({
                isOpen: true,
                type: 'error',
                message: err?.data?.message || 'הפעולה נדחתה. נא לוודא שיש מספיק הון נזיל בארנק.'
            });
        }
    };

    const isLoading = isDepositLoading || isWithdrawLoading;

    return (
        <div className="p-8 max-w-md mx-auto min-h-screen bg-[#07080b] text-slate-200 text-right flex flex-col items-center justify-center relative overflow-hidden" dir="rtl">
            
            {/* אפקט הילת אור עמוקה ברקע הפאנל */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-b from-indigo-600/[0.02] to-transparent rounded-full blur-[100px] pointer-events-none" />

            {/* כפתור חזרה מהיר */}
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-8 right-8 flex items-center gap-2 text-slate-500 hover:text-white font-black text-xs transition-colors group cursor-pointer"
            >
                חזרה <ArrowLeft size={13} className="transition-transform group-hover:translate-x-[2px]" />
            </button>

            {/* קונטיינר הארנק */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#0d111c]/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-slate-900 relative overflow-hidden"
            >
                {/* קו זוהר דק עליון */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-indigo-500/20" />

                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 mb-3 text-indigo-400">
                        <Landmark size={24} />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                        ניהול תזרים מזומנים
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black mt-1.5 uppercase tracking-widest">// הפקדה ומשיכה מיידית מחשבון המסחר שלך</p>
                </div>

                {/* קלט דיגיטלי מלוטש */}
                <div className="relative group mb-6">
                    <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-5 bg-[#07080b] border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_25px_rgba(99,102,241,0.06)] rounded-2xl text-center text-3xl font-mono font-black text-white outline-none transition-all"
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono font-black text-slate-600 text-lg group-focus-within:text-indigo-400 transition-colors">$</span>
                </div>

                {/* לחצני בחירה מהירה */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[100, 500, 1000].map((value) => (
                        <button
                            key={value}
                            onClick={() => setAmount(value)}
                            className="bg-[#141a29] hover:bg-indigo-600 border border-slate-800/60 hover:border-transparent p-3.5 rounded-xl font-black font-mono text-slate-400 hover:text-white text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                            ${value.toLocaleString()}
                        </button>
                    ))}
                </div>

                {/* לחצני פעולה אחידים */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleDeposit}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/20 disabled:opacity-40"
                    >
                        {isDepositLoading ? <Loader2 className="animate-spin" size={13} /> : <><Plus size={13} /> הפקדת הון</>}
                    </button>
                    
                    <button
                        onClick={handleWithdraw}
                        disabled={isLoading}
                        className="bg-[#141a29] hover:bg-slate-800 text-slate-300 py-4 rounded-xl font-black text-xs uppercase tracking-wider border border-slate-800/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                        {isWithdrawLoading ? <Loader2 className="animate-spin" size={13} /> : <><Minus size={13} /> משיכת הון</>}
                    </button>
                </div>
            </motion.div>

            {/* 🌟 חלונית הודעות ניאון מונפשת ומאוחדת */}
            <AnimatePresence>
                {alertConfig.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
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
                                    {alertConfig.type === 'success' ? 'העברת כספים אושרה' : 'הפעולה נכשלה'}
                                </h3>
                                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed px-1">{alertConfig.message}</p>
                                
                                <button 
                                    onClick={() => setAlertConfig({ ...alertConfig, isOpen: false })}
                                    className="mt-6 px-5 py-2 bg-[#141a29] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-black rounded-lg transition-colors cursor-pointer"
                                >
                                    סגור חלונית
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddFunds;