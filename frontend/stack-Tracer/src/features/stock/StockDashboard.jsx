import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetBalanceQuery } from '../user/userApi';
import { useGetAllStockQuery } from '../stock/stockApi';
import StockCard from './StockCard'; 
import { Search, Wallet, TrendingUp, ArrowUpRight, LogIn, UserPlus, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const StockDashboard = () => {
    const navigate = useNavigate();
    
    // בדיקת סטייט התחברות
    const auth = useSelector((state) => state.auth);
    const token = auth?.token || localStorage.getItem('token');

    // שליפת נתונים דינמית מהשרת
    const { data: balanceData } = useGetBalanceQuery(undefined, { skip: !token });
    const { data: stocks, isLoading } = useGetAllStockQuery();

    const [search, setSearch] = useState("");

    const filteredStocks = stocks?.filter(stock =>
        stock?.symbol?.toLowerCase().includes(search.toLowerCase())
    );

    // אנימציות קונטיינר
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', sharpness: 200 } }
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#07080b] text-slate-500 font-mono text-xs tracking-widest gap-4">
                <Loader2 className="animate-spin text-indigo-500" size={42} />
                <span className="font-black uppercase tracking-wider">מסתנכרן מול מדדי הבורסה העולמיים...</span>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#07080b] min-h-screen relative overflow-hidden pb-24" dir="rtl">
            
            {/* אפקטי תאורת אווירה פסיכיים ויוקרתיים ברקע האתר */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-b from-indigo-500/[0.03] to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/[0.02] to-transparent rounded-full blur-[120px] pointer-events-none" />

            {/* HEADER */}
            <motion.header 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-900 pb-8 relative z-10"
            >
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        סקירה כללית <Sparkles size={20} className="text-indigo-400" />
                    </h1>
                    <p className="text-slate-500 font-bold mt-1.5 text-xs">// {token ? `${auth?.username || 'משקיע חסוי'} — הנה מצב השוק הנוכחי שלך` : 'ברוכים הבאים ל-STOCKAI. צפו במניות ובנכסים המובילים'}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* שורת חיפוש מלוטשת */}
                    <div className="relative w-full sm:w-72 lg:w-80 group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" size={16} />
                        <input
                            type="text"
                            placeholder="חפש סימול מניה (e.g. AAPL)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-3.5 pr-11 bg-[#0d111c]/60 border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.08)] focus:outline-none rounded-xl text-slate-200 placeholder-slate-600 text-xs font-black transition-all"
                        />
                    </div>

                    {/* כפתורי אורחים בעיצוב הייטק קיצוני */}
                    {!token && (
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button 
                                onClick={() => navigate('/login')}
                                className="flex items-center justify-center gap-2 bg-[#141a29] hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-white px-5 py-3.5 rounded-xl text-xs font-black transition-all w-full sm:w-auto cursor-pointer"
                            >
                                <LogIn size={13} /> התחברות למערכת
                            </button>
                            <button 
                                onClick={() => navigate('/register')}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-3.5 rounded-xl text-xs font-black transition-all shadow-xl shadow-indigo-950/40 w-full sm:w-auto cursor-pointer"
                            >
                                <UserPlus size={13} /> יצירת חשבון מהיר
                            </button>
                        </div>
                    )}
                </div>
            </motion.header>

            {/* TOP CARDS - מוצג רק למשקיעים רשומים */}
            {token && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 relative z-10"
                >
                    {/* כרטיס ארנק פיננסי */}
                    <div className="lg:col-span-2 bg-[#0d111c]/60 border border-slate-900 rounded-2xl p-8 text-white shadow-[0_30px_70px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <span className="text-indigo-400 font-mono text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
                                    <Wallet size={12} /> הון נזיל זמין למסחר
                                </span>
                                <h2 className="text-5xl font-black mt-4 tracking-tight font-mono text-white group-hover:text-indigo-400 transition-colors duration-300">
                                    ${balanceData?.balance ? Number(balanceData.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                                </h2>
                            </div>

                            <button
                                onClick={() => navigate('/wallet')}
                                className="mt-8 self-start bg-[#141a29] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-slate-400 hover:text-white px-6 py-3 rounded-xl font-black text-xs transition-all border border-slate-800/80 hover:border-transparent flex items-center gap-2 cursor-pointer shadow-lg group"
                            >
                                ניהול פוזיציות והפקדות <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
                            </button>
                        </div>
                    </div>

                    {/* כרטיס המניה המובילה היומית */}
                    <div className="bg-[#0d111c]/60 border border-slate-900 rounded-2xl p-8 shadow-[0_30px_70px_rgba(0,0,0,0.5)] flex flex-col justify-between group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div>
                            <span className="text-slate-500 font-mono text-[10px] font-black uppercase tracking-widest block mb-4">
                                מניית המחר (Top gainer) 🚀
                            </span>

                            {stocks?.[0] ? (
                                <div className="mt-2">
                                    <h3 className="text-3xl font-mono font-black text-white group-hover:text-emerald-400 transition-colors duration-200">
                                        {stocks[0].symbol}
                                    </h3>
                                    <p className="text-emerald-400 font-mono font-black text-lg mt-1.5 flex items-center gap-1">
                                        +{stocks[0].changePercent?.toFixed(2) || '2.40'}%
                                    </p>
                                </div>
                            ) : (
                                <div className="animate-pulse bg-slate-800/40 h-12 w-28 rounded-xl mt-2" />
                            )}
                        </div>

                        <button
                            onClick={() => navigate('/stocks')}
                            className="text-indigo-400 hover:text-indigo-300 font-black text-xs transition-colors text-right flex items-center gap-1 mt-8 cursor-pointer group"
                        >
                            צפה בכל לוח המסחר <span className="transition-transform group-hover:translate-x-[-4px]">←</span>
                        </button>
                    </div>
                </motion.div>
            )}

            {/* כותרת משנית לרשימת המניות */}
            <div className="flex items-center justify-between mb-6 relative z-10 px-1">
                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <TrendingUp size={16} className="text-indigo-400" /> נכסים דיגיטליים למסחר בזמן אמת
                </h3>
                <span className="text-slate-500 font-mono text-xs font-bold bg-[#0d111c] border border-slate-900/60 px-2.5 py-1 rounded-lg">
                    {filteredStocks?.length || 0} חברות רשומות
                </span>
            </div>

            {/* GRID המניות המונפש */}
            {filteredStocks && filteredStocks.length > 0 ? (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10"
                >
                    {filteredStocks.map(stock => (
                        <motion.div key={stock.symbol || stock.id} variants={itemVariants}>
                            <StockCard stock={stock} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-[#0d111c]/30 rounded-2xl border border-slate-900 border-dashed"
                >
                    <p className="text-slate-500 text-sm font-black">לא נמצאו מניות העונות לסימול החיפוש החשוף.</p>
                </motion.div>
            )}
        </div>
    );
};

export default StockDashboard;