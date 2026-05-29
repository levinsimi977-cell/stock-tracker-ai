import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StockMiniChart from '../manager/stock/StockMiniChart'; 
import { TrendingUp, TrendingDown, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const StockCard = ({ stock }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const stockName = stock?.companyName ?? 'שם לא זמין';
   const prices = stock?.movePrice || [];
    const firstPrice = prices.length > 0 ? prices[0] : 0;
    const currentPrice = stock?.currentPrice || 0;
    const isPositive = currentPrice >= firstPrice;
    
    const changePercent = firstPrice !== 0 ? ((currentPrice - firstPrice) / firstPrice) * 100 : 0;
    const glowColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
    const strokeLine = isPositive ? 'bg-emerald-500' : 'bg-rose-500';

    const handleNavigateToDetails = (e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/register');
            return;
        }
        navigate(`/stock/${stock.symbol}`);
    };

    return (
        <motion.div 
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={handleNavigateToDetails}
            className="group bg-[#0d111c]/70 backdrop-blur-md border border-slate-900/80 hover:border-slate-800/80 p-6 rounded-2xl flex flex-col cursor-pointer relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
            style={{ '--hover-glow': `0 20px 50px ${glowColor}` }}
            dir="rtl"
        >
            <div className={`absolute top-0 inset-x-0 h-[3px] transition-all duration-300 opacity-30 group-hover:opacity-100 ${strokeLine}`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <h3 className="font-mono font-black text-white text-xl tracking-wide group-hover:text-indigo-400 transition-colors duration-200">
                        {stock?.symbol ?? 'לא זמין'}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 truncate max-w-[140px] font-bold">
                        {stockName}
                    </p>
                </div>
                
                <div className="text-left" dir="ltr">
                    <div className="font-mono font-black text-lg text-white group-hover:text-amber-400 transition-colors duration-200">
                        ${currentPrice.toFixed(2)}
                    </div>
                    <div className={`text-sm font-mono font-black flex items-center gap-1 justify-end mt-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span className="tracking-tighter">
                            {isPositive ? '+' : ''}{stock?.changePercent?.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
            
            <div className={`h-24 w-full bg-[#07090f] rounded-xl my-4 overflow-hidden border border-slate-900/80 p-2 relative flex items-center justify-center transition-all duration-300`}>
                <div className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <StockMiniChart stock={stock} />
                </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-2 relative z-10">
                <div className="min-h-[22px]">
                    {stock?.isAtHigh && (
                        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] px-2.5 py-1 rounded-lg font-black tracking-widest uppercase">
                            <Award size={11} className="animate-pulse" />
                            <span>ATH</span>
                        </div>
                    )}
                </div>
                <button className="py-2 px-4 bg-[#141a29] text-slate-400 hover:text-white rounded-xl text-[11px] font-black transition-all duration-300 border border-slate-800/80 cursor-pointer">
                    נתח שוק ←
                </button>
            </div>
        </motion.div>
    );
};

export default StockCard;