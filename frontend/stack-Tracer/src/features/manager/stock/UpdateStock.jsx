import React, { useState } from 'react';
import { useGetAllStockQuery, useUpdateStockMutation } from '../../stock/stockApi';
import AdminPageLayout from '../AdminPageLayout';
import { Settings2, Save, ChevronDown, Database, CheckCircle2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UpdateStock = () => {
  const { data: stocks } = useGetAllStockQuery();
  const [updateStock, { isLoading: updating }] = useUpdateStockMutation();
  const [selectedStock, setSelectedStock] = useState(null);
  const [form, setForm] = useState({ currentPrice: '', availableShares: '', sector: '' });

  // 🌟 סטייט למערכת ההודעות המהפנטת החדשה
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', message: '' });

  const handleSelect = (e) => {
    const stock = stocks?.find(s => s.id === Number(e.target.value));
    setSelectedStock(stock);
    if (stock) {
      setForm({
        currentPrice: stock.currentPrice,
        availableShares: stock.availableShares,
        sector: stock.sector || ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStock) return;
    try {
      await updateStock({ id: selectedStock.id, ...form }).unwrap();
      
      // הודעת הצלחה דרמטית בקו האחיד של האתר
      setModalConfig({
        isOpen: true,
        type: 'success',
        message: `נתוני המניה ${selectedStock.symbol} עודכנו בהצלחה! השינויים סונכרנו מול מסדי הנתונים בשרת בזמן אמת.`
      });
    } catch (err) {
      // הודעת שגיאה תואמת
      setModalConfig({
        isOpen: true,
        type: 'error',
        message: err.data || 'עדכון נתוני השוק נכשל. בדקי את תקינות השדות ונתוני התקשורת מול ה-API.'
      });
    }
  };

  return (
    <AdminPageLayout title="עריכת נכסים" subtitle="Update Market Information" icon={Settings2}>
      <div className="max-w-2xl mx-auto bg-[#0d111c]/60 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-slate-800/60 relative overflow-hidden">
        
        {/* תאורה אחורית סגולה-אינדיגו יוקרתית */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/[0.05] rounded-full blur-[100px] pointer-events-none animate-pulse" />

        <div className="relative z-10">
          <label className="block text-[11px] font-black text-slate-400 uppercase mb-3 tracking-widest pr-1 flex items-center gap-2">
            <Database size={14} className="text-indigo-400"/> בחר מניה לעדכון
          </label>
          <div className="relative mb-10 group">
            <select 
              onChange={handleSelect}
              className="w-full p-5 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] focus:outline-none rounded-2xl font-black text-slate-200 transition-all duration-300 cursor-pointer appearance-none"
            >
              <option value="" className="bg-[#0d111c]">בחר מניה מהרשימה...</option>
              {stocks?.map(s => (
                <option key={s.id} value={s.id} className="bg-[#0d111c]">
                  {s.symbol} — {s.companyName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none font-black transition-transform group-hover:translate-y-[-3px]" size={18} />
          </div>

          <AnimatePresence>
            {selectedStock && (
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 pr-2 uppercase tracking-widest">מחיר שוק ($)</label>
                    <input 
                      value={form.currentPrice} 
                      onChange={(e) => setForm({...form, currentPrice: e.target.value})}
                      className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] focus:outline-none rounded-xl font-mono font-black text-indigo-400 text-lg transition-all" 
                      type="number" 
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 pr-2 uppercase tracking-widest">מלאי זמין למסחר</label>
                    <input 
                      value={form.availableShares} 
                      onChange={(e) => setForm({...form, availableShares: e.target.value})}
                      className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] focus:outline-none rounded-xl font-mono font-black text-indigo-400 text-lg transition-all" 
                      type="number" 
                      required
                    />
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={updating}
                  className="w-full py-4.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-950/50 hover:shadow-indigo-500/20 transition-all duration-300 mt-4 cursor-pointer"
                >
                  {updating ? (
                    <>
                      <Loader2 className="animate-spin text-white" size={20} />
                      <span>מעדכן שרתי מסחר...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>שמור שינויים במערכת הגלובלית ←</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🌟 המודאל המהפנט: הקו העיצובי האחיד והיוקרתי של האפליקציה */}
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
              {/* כפתור סגירה מהיר */}
              <button 
                onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} 
                className="absolute top-5 left-5 text-slate-500 hover:text-white transition-colors"
              >
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
                  {modalConfig.type === 'success' ? 'העדכון בוצע בהצלחה!' : 'עדכון הנתונים נכשל'}
                </h3>
                
                <p className="text-slate-300 text-sm font-semibold mt-4 leading-relaxed px-2">
                  {modalConfig.message}
                </p>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                  className={`mt-8 w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all ${
                    modalConfig.type === 'success' 
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/50' 
                    : 'bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/50'
                  }`}
                >
                  {modalConfig.type === 'success' ? 'המשך עבודה בדשבורד' : 'סגור ונסה שוב'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminPageLayout>
  );
};

export default UpdateStock;