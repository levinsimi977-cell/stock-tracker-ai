import React from 'react';
import { useGetTodayTransactionsQuery } from '../transaction/transactionApi';
import AdminPageLayout from './AdminPageLayout';
import { History, ArrowUpRight, ArrowDownLeft, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const TodayTransactions = () => {
   const { data: transactions, isLoading } = useGetTodayTransactionsQuery();

  if (isLoading) return <div className="text-center p-20 text-indigo-500 animate-pulse font-black uppercase">Scanning Network...</div>;

  return (
    <AdminPageLayout title="לוג עסקאות בזמן אמת" subtitle="Daily Transaction Surveillance" icon={History}>
      <div className="bg-[#0d111c]/60 backdrop-blur-xl rounded-[2.5rem] border border-slate-800/50 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
           <h3 className="text-slate-100 font-black uppercase tracking-widest text-sm">נפח מסחר יומי</h3>
           <span className="px-4 py-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-black">
             {transactions?.length || 0} OPERATIONS
           </span>
        </div>
        
        <table className="w-full text-right border-collapse">
          <thead className="bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              <th className="p-8">Trader</th>
              <th className="p-8">Type</th>
              <th className="p-8">Asset</th>
              <th className="p-8">Amount</th>
              <th className="p-8">Price</th>
              <th className="p-8">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {transactions?.map((t, index) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={t.id} 
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="p-8 text-slate-300 font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-500">
                    <User size={14} />
                  </div>
                  {t.user?.email}
                </td>
                <td className="p-8">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${t.type === 'BUY' ? 'bg-emerald-950 text-emerald-400 border-emerald-900' : 'bg-rose-950 text-rose-400 border-rose-900'}`}>
                    {t.type}
                  </span>
                </td>
                <td className="p-8 font-black text-indigo-400">{t.stock?.symbol}</td>
                <td className="p-8 font-mono font-bold text-slate-300">{t.amount}</td>
                <td className="p-8 font-mono text-slate-400">₪{t.priceAtExecution?.toFixed(2)}</td>
                <td className="p-8 text-slate-500 font-mono text-xs">{new Date(t.executionTime).toLocaleTimeString('he-IL')}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
};

export default TodayTransactions;