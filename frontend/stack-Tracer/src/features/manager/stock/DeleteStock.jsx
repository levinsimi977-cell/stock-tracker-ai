import React, { useState } from 'react';
import { useGetAllStockQuery, useDeleteStockMutation } from '../../stock/stockApi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight, Loader2, AlertCircle, CheckCircle2, AlertTriangle, X } from 'lucide-react';

const DeleteStock = () => {
  const navigate = useNavigate();

  const { data: stocks, error, isLoading } = useGetAllStockQuery();
  const [deleteStock] = useDeleteStockMutation();

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', message: '' });
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, stockId: null, stockName: null });

  const triggerDeleteConfirm = (stockId, stockName) => {
    setConfirmConfig({
      isOpen: true,
      stockId,
      stockName
    });
  };

  const handleExecuteDelete = async () => {
    const { stockId, stockName } = confirmConfig;
    setConfirmConfig({ isOpen: false, stockId: null, stockName: null }); // סגירת מודאל האישור בבטחה

    try {
      await deleteStock(stockId).unwrap();
      
      setModalConfig({
        isOpen: true,
        type: 'success',
        message: `המניה ${stockName} נמחקה לצמיתות מהמסחר הגלובלי! מערכת ה-Java הפעילה זיכוי כספי מלא לכל בעלי המניות.`
      });
    } catch (err) {
     
    }
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    if (modalConfig.type === 'success') {
      navigate('/manager');
    }
  };

  if (isLoading) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-mono text-xs tracking-widest" dir="rtl">
      <Loader2 className="animate-spin text-rose-500" size={42} />
      <span className="font-black tracking-widest uppercase">מאחזר רשימת נכסים פעילים...</span>
    </div>
  );
  
  if (error) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-rose-500 font-black" dir="rtl">
      <AlertCircle size={36} className="animate-pulse" />
      <span>קורוזיה בתקשורת: נכשלה משיכת נתונים מהשרת.</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 relative min-h-[85vh]" dir="rtl">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800/60 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <Trash2 size={24} className="text-rose-500" /> גריעת מניות ומחיקה מהמסחר
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 font-semibold">// מחיקת חברות ממסד הנתונים והפעלת טריגר הזיכוי הפיננסי</p>
        </div>
        
        <button
          onClick={() => navigate('/manager')}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-[#141a29] hover:bg-slate-800 border border-slate-800/80 rounded-xl text-xs font-black text-slate-400 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /> חזרה לניהול
        </button>
      </div>

      {/* טבלת מחיקה מלוטשת */}
      <div className="bg-[#0d111c]/60 backdrop-blur-xl rounded-2xl border border-slate-800/60 overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#141a29]/80 border-b border-slate-800/60 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                <th className="p-4 pr-6">מזהה נכס</th>
                <th className="p-4">שם חברה</th>
                <th className="p-4">סימול (Symbol)</th>
                <th className="p-4">מחיר שוק</th>
                <th className="p-4 text-center">פעולות ניהול חסויות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-sm font-semibold text-slate-300">
              {stocks?.map((stock) => (
                <tr key={stock.id} className="hover:bg-slate-800/20 transition-all duration-150">
                  <td className="p-4 pr-6 font-mono text-xs text-slate-600">{stock.id}</td>
                  <td className="p-4 font-black text-white">{stock.companyName || stock.name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/30 rounded-lg font-mono text-xs font-black text-indigo-400 tracking-wider">
                      {stock.symbol}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-emerald-400 font-black">${(stock.currentPrice || stock.valueCompany)?.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => triggerDeleteConfirm(stock.id, stock.companyName || stock.name)}
                      className="px-4 py-2 bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 font-black text-xs rounded-xl border border-rose-500/20 transition-all duration-200 cursor-pointer shadow-lg"
                    >
                      מחק לצמיתות 🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {confirmConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-8 bg-[#0d111c] border border-rose-500/40 rounded-[2.5rem] text-center shadow-[0_30px_80px_rgba(239,68,68,0.15)] relative"
            >
              <div className="flex flex-col items-center">
                <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full mb-5 border border-rose-500/20">
                  <AlertTriangle size={52} className="animate-pulse" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-rose-400">הוראת מחיקה קריטית!</h3>
                <p className="text-slate-300 text-sm font-bold mt-4 leading-relaxed px-2">
                  האם את בטוחה שברצונך למחוק את מניית <span className="text-white font-black underline">{confirmConfig.stockName}</span>?
                  <br />
                  <span className="text-rose-400 text-xs block mt-2 font-black">🔥 אזהרה: פעולה זו אינה הפיכה, ומערכת ה-Java תבצע זיכוי כספי מלא לכל בעלי המניות הנוכחיים במערכת!</span>
                </p>

                <div className="flex gap-4 w-full mt-8">
                  <button 
                    onClick={handleExecuteDelete}
                    className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-950/50"
                  >
                    כן, מחק וזכה משתמשים
                  </button>
                  <button 
                    onClick={() => setConfirmConfig({ isOpen: false, stockId: null, stockName: null })}
                    className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                  >
                    ביטול פעולה
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 380 }}
              className={`w-full max-w-md p-8 bg-[#0d111c] border rounded-[2.5rem] text-center shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative ${
                modalConfig.type === 'success' ? 'border-emerald-500/40' : 'border-rose-500/40'
              }`}
            >
              <button onClick={handleCloseModal} className="absolute top-5 left-5 text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="mt-4 flex flex-col items-center">
                {modalConfig.type === 'success' ? (
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-5 shadow-inner border border-emerald-500/20">
                    <CheckCircle2 size={52} className="animate-bounce" />
                  </div>
                ) : (
                  <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full mb-5 shadow-inner border border-rose-500/20">
                    <AlertTriangle size={52} className="animate-pulse" />
                  </div>
                )}

                <h3 className={`text-2xl font-black tracking-tight ${modalConfig.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {modalConfig.type === 'success' ? 'הפעולה בוצעה בהצלחה!' : 'הפעולה נכשלה'}
                </h3>
                
                <p className="text-slate-300 text-sm font-semibold mt-4 leading-relaxed px-2">
                  {modalConfig.message}
                </p>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseModal}
                  className={`mt-8 w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all ${
                    modalConfig.type === 'success' 
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/50' 
                    : 'bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/50'
                  }`}
                >
                  {modalConfig.type === 'success' ? 'הבנתי, חזרה לניהול ←' : 'סגור'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DeleteStock;