import React from 'react';
import { useLazyGetAIAdviceQuery } from './stockOwnershipApi';

const StockOwnership = ({ item, navigate }) => {
const [triggerAI, result] = useLazyGetAIAdviceQuery();
const [activeAIStockId, setActiveAIStockId] = React.useState(null);
    return (
        <div className="p-6 border border-slate-800/60 rounded-3xl bg-[#0d0e12] flex flex-col md:flex-row justify-between items-center gap-6 hover:border-slate-700/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="flex-1 w-full text-right">
                <div className="flex items-center gap-3">
                    <h3 className="font-black text-2xl text-white font-mono tracking-tight">{item.stock.symbol}</h3>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase font-black tracking-wider border border-slate-700/40">
                        {item.stock.companyName || 'Stock'}
                    </span>
                </div>
                
                <p className="text-sm text-slate-400 mt-2 font-medium">
                    כמות: <span className="font-black text-white font-mono">{item.quantity}</span> | 
                    מחיר קנייה ממוצע: <span className="text-emerald-400 font-bold font-mono">${item.purchasePrice?.toFixed(2)}</span>
                </p>

                <button
onClick={() => {
    setActiveAIStockId(item.stock.id);
    triggerAI(item.stock.id)
    
}}            
   disabled={result.isFetching}
                    className="text-xs text-amber-500 font-black mt-5 block hover:text-amber-400 disabled:opacity-50 transition-colors uppercase tracking-wider"
                >
{result.isFetching ? '✨ המוח הדיגיטלי חושב...' : '✨ קבל ניתוח AI חכם למניה'}
                </button>
                

                
              {activeAIStockId === item.stock.id && result.data && (
    <div className="text-sm bg-indigo-500/5 p-4 mt-4 rounded-2xl border border-indigo-500/20 text-indigo-300 italic shadow-inner">
        <span className="font-black block mb-1 text-indigo-400 not-italic">
            תובנת AI:
        </span>
{result.data?.advice}
    </div>
)}
            </div>

            <div className="flex gap-3 w-full md:w-auto">
                <button
                    onClick={() => navigate(`/trade?symbol=${item.stock.symbol}&type=BUY`)}
                    className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black transition-all shadow-md active:scale-95 text-sm"
                >
                    קנה עוד
                </button>
                <button
                    onClick={() => navigate(`/trade?symbol=${item.stock.symbol}&type=SELL`)}
                    className="flex-1 md:flex-none bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-2xl font-black transition-all shadow-md active:scale-95 text-sm"
                >
                    מכור
                </button>
            </div>
        </div>
    );
};

export default StockOwnership;