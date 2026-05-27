import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useExecuteTransactionMutation } from './transactionApi';
import { useGetStockBySymbolQuery } from '../stock/stockApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, TrendingUp, AlertTriangle, CheckCircle2, ArrowLeft, X } from 'lucide-react';

const TransactionForm = ({ stock: propStock }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const symbolFromUrl = searchParams.get('symbol');
    const typeFromUrl = searchParams.get('type') || 'BUY';

    const [quantity, setQuantity] = useState(1);
    
    // סטייט לניהול הפופ-אפים היוקרתיים
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', message: '' });
    
    const { data: fetchedStock, isLoading: isStockLoading } = useGetStockBySymbolQuery(
        symbolFromUrl || propStock?.symbol, 
        { skip: !symbolFromUrl && !propStock }
    );

    const stock = propStock || fetchedStock;
    const [executeTransaction, { isLoading }] = useExecuteTransactionMutation();

    const handleAction = async (type) => {
        if (!stock) return;
        
        const parsedAmount = parseInt(quantity, 10);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                message: 'כמות שגויה! אנא הזן מספר יחידות גדול מ-0.'
            });
            return;
        }

        try {
            await executeTransaction({ 
                symbol: stock.symbol, 
                amount: parsedAmount, 
                type: type 
            }).unwrap();
            
            // הקפצת הודעת הצלחה מפוצצת
            setModalConfig({
                isOpen: true,
                type: 'success',
                message: type === 'BUY' 
                    ? `הרכישה בוצעה! ${parsedAmount} יחידות של ${stock.symbol} התווספו לתיק שלך.`
                    : `המכירה בוצעה! מימשת בהצלחה ${parsedAmount} יחידות של ${stock.symbol}.`
            });
        } catch (err) {
            // הקפצת הודעת שגיאה באדום ניאון
            setModalConfig({
                isOpen: true,
                type: 'error',
                message: err.data || 'העסקה נדחתה. בדוק יתרה בארנק או זמינות מלאי במערכת.'
            });
        }
    };

    const handleCloseModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        if (modalConfig.type === 'success') {
            navigate('/portfolio'); // העברה לתיק רק אחרי הצלחה וסגירת המודאל
        }
    };

    if (isStockLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 font-mono text-xs tracking-widest bg-[#06080f]">
            <Loader2 className="animate-spin mb-4 text-amber-500" size={42} />
            <span className="font-black tracking-widest uppercase">טוען נתוני שוק בזמן אמת...</span>
        </div>
    );
    
    if (!stock) return (
        <div className="text-center p-10 text-rose-500 font-black">
            <p>שגיאה חמורה: לא נמצאה מניה זמינה לפעילות מסחר.</p>
        </div>
    );

    return (
        <div className="relative min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 bg-[#0d0e12] border border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-[2.5rem] text-right text-slate-200 relative overflow-hidden">
                
                {/* אפקט עיצובי ברקע כסגנון Cyberpunk */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 rounded-full ${typeFromUrl === 'BUY' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                <header className="mb-8">
                    <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        {typeFromUrl === 'BUY' ? 'קנייה מאובטחת' : 'מימוש מכירה'}
                        <TrendingUp size={24} className={typeFromUrl === 'BUY' ? 'text-emerald-500' : 'text-rose-500'} />
                    </h2>
                    <div className="flex items-center gap-2 mt-2 font-mono">
                        <span className="font-black text-amber-500 text-lg tracking-wider">{stock.symbol}</span>
                        <span className="text-slate-500 font-bold text-xs">// {stock.companyName}</span>
                    </div>
                </header>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 bg-[#121622] p-4 rounded-2xl border border-slate-800/80">
                        <div>
                            <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">מחיר שוק יחיד</span>
                            <span className="text-xl font-mono font-black text-emerald-400">${stock.currentPrice?.toFixed(2)}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">זמין למסחר</span>
                            <span className="text-xl font-mono font-black text-slate-200">{stock.availableShares}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">כמות יחידות לביצוע</label>
                        <input 
                            type="number" 
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full p-4 bg-[#07080b] border border-slate-800 rounded-2xl text-center text-3xl font-mono font-black focus:border-amber-500 text-white outline-none transition-all"
                        />
                    </div>

                    <div className="flex justify-between items-center py-4 border-y border-slate-800/80 border-dashed">
                        <span className="text-sm font-bold text-slate-400">שווי עסקה כולל:</span>
                        <span className="font-mono font-black text-2xl text-white">${(quantity * stock.currentPrice).toFixed(2)}</span>
                    </div>

                    <button 
                        onClick={() => handleAction(typeFromUrl)}
                        disabled={isLoading}
                        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center shadow-lg ${
                            typeFromUrl === 'BUY' 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20' 
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/20'
                        }`}
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : `${typeFromUrl === 'BUY' ? 'אשר הוראת קנייה 📈' : 'אשר הוראת מכירה 📉'}`}
                    </button>
                </div>
            </div>

            {/* 🌟 המודאל המטורף: מחליף את ה-Alert עם אנימציית פופ-אין פסיכית */}
            <AnimatePresence>
                {modalConfig.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                            className={`w-full max-w-sm p-6 bg-[#0d0e12] border rounded-[2rem] text-center shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative ${
                                modalConfig.type === 'success' ? 'border-emerald-500/40' : 'border-rose-500/40'
                            }`}
                        >
                            <button onClick={handleCloseModal} className="absolute top-4 left-4 text-slate-500 hover:text-white transition-colors">
                                <X size={18} />
                            </button>

                            <div className="mt-4 flex flex-col items-center">
                                {modalConfig.type === 'success' ? (
                                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-4 shadow-inner">
                                        <CheckCircle2 size={48} className="animate-bounce" />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full mb-4 shadow-inner">
                                        <AlertTriangle size={48} className="animate-pulse" />
                                    </div>
                                )}

                                <h3 className={`text-xl font-black ${modalConfig.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {modalConfig.type === 'success' ? 'הוראת מסחר בוצעה!' : 'הוראת מסחר נדחתה'}
                                </h3>
                                
                                <p className="text-slate-300 text-sm font-medium mt-3 leading-relaxed">
                                    {modalConfig.message}
                                </p>

                                <button 
                                    onClick={handleCloseModal}
                                    className={`mt-6 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all active:scale-[0.97] ${
                                        modalConfig.type === 'success' 
                                        ? 'bg-emerald-600 hover:bg-emerald-500' 
                                        : 'bg-rose-600 hover:bg-rose-500'
                                    }`}
                                >
                                    {modalConfig.type === 'success' ? 'המשך לתיק הנכסים ←' : 'הבנתי, סגור'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionForm;