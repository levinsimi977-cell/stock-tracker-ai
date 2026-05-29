import React from 'react';
import { useGetTransactionsQuery } from './transactionApi';
import { ArrowLeftRight, Loader2, Calendar } from 'lucide-react';

const ListTransaction = () => {
    const { data: transactions, isLoading } = useGetTransactionsQuery();

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#07080b] text-slate-400 font-mono text-sm tracking-widest gap-4">
                <Loader2 className="animate-spin text-amber-500" size={48} />
                <span>מפענח יומן עסקאות...</span>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#07080b] min-h-screen rtl text-right">
            <header className="max-w-5xl mx-auto mb-10">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    <ArrowLeftRight className="text-amber-500" /> יומן עסקאות
                </h1>
                <p className="text-slate-500 font-medium mt-2 text-sm">מעקב מלא אחרי היסטוריית המסחר שלך</p>
            </header>

            <div className="max-w-5xl mx-auto bg-[#0d0e12] border border-slate-800/40 rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/60 bg-[#121622]/50">
                                <th className="p-5 text-slate-400 font-bold text-xs uppercase tracking-widest">תאריך</th>
                                <th className="p-5 text-slate-400 font-bold text-xs uppercase tracking-widest">נכס</th>
                                <th className="p-5 text-slate-400 font-bold text-xs uppercase tracking-widest">כמות</th>
                                <th className="p-5 text-slate-400 font-bold text-xs uppercase tracking-widest">מחיר</th>
                                <th className="p-5 text-slate-400 font-bold text-xs uppercase tracking-widest">סוג</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                            {transactions?.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="p-5 text-sm text-slate-400 font-mono">
                                        {new Date(t.transactionDate).toLocaleString('he-IL')}
                                    </td>
                                    <td className="p-5 font-black text-white text-lg">{t.stockSymbol || t.stock?.symbol}</td>
                                    <td className="p-5 font-mono text-slate-300">{t.quantity}</td>
                                    <td className="p-5 font-mono text-emerald-400 font-bold">${t.priceAtTransaction?.toFixed(2)}</td>
                                    <td className="p-5">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                            t.type === 'BUY' 
                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                            : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                                        }`}>
                                            {t.type === 'BUY' ? 'קנייה' : 'מכירה'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {transactions?.length === 0 && (
                    <div className="p-20 text-center text-slate-500">
                        <p className="font-black text-lg">אין עסקאות עדיין.</p>
                        <p className="text-sm mt-2">הזמן להתחיל לבנות את התיק שלך! 🚀</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListTransaction;