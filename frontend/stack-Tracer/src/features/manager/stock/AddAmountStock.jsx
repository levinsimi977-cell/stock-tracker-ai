import React, { useState } from 'react';
import { useGetAllStockQuery, useAddAmountStockMutation } from '../../stock/stockApi';
import AdminPageLayout from '../AdminPageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { PackagePlus, Database, CheckCircle2, AlertTriangle, X, Loader2, Sparkles } from 'lucide-react';

const AddAmountStock = () => {
  const { data: stocks } = useGetAllStockQuery();
  const [addAmount, { isLoading }] = useAddAmountStockMutation();
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  // סטייט למודאל המהפנט
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', message: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedId || !amount) {
      setModalConfig({
        isOpen: true,
        type: 'error',
        message: 'שדות חסרים! אנא בחרי נכס והזיני כמות חוקית לעדכון המלאי.'
      });
      return;
    }

    try {
      await addAmount({ id: selectedId, amount: Number(amount) }).unwrap();
      
      // מציאת השם של המניה בשביל להציג הודעה מטורפת
      const currentStock = stocks?.find(s => s.id === selectedId);
      
      setModalConfig({
        isOpen: true,
        type: 'success',
        message: `המלאי של ${currentStock?.symbol || 'הנכס'} שודרג בהצלחה! התווספו ${amount} יחידות חדשות למערכת.`
      });
      setAmount("");
    } catch (err) {
      setModalConfig({
        isOpen: true,
        type: 'error',
        message: err.data || 'פעימת השרת נכשלה. לא ניתן לעדכן את המלאי כעת, נסי שנית מאוחר יותר.'
      });
    }
  };

  return (
    <AdminPageLayout title="עדכון מלאי" subtitle="Inventory Management" icon={PackagePlus}>
      <div className="relative min-h-[70vh] flex items-center justify-center px-4">
        
        {/* קארד מרכזי משופר עם מסגרת זוהרת בעדינות */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-[#0d111c]/80 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-slate-800/80 relative overflow-hidden"
        >
          
          {/* אפקט תאורת ניאון אחורית שזז קצת ברקע */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/[0.06] rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
            
            {/* בחירת נכס */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 pr-1">
                <Database size={14} className="text-cyan-400 animate-pulse"/> בחר נכס להוספה
              </label>
              <div className="relative group">
                <select 
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full p-4.5 bg-[#141a29] border border-slate-800/80 focus:border-cyan-500/50 focus:shadow-[0_0_25px_rgba(6,182,212,0.15)] focus:outline-none rounded-2xl font-bold text-slate-200 transition-all duration-300 cursor-pointer appearance-none"
                >
                  <option value="" className="bg-[#0d111c]">בחר מניה מהרשימה...</option>
                  {stocks?.map(s => (
                    <option key={s.id} value={s.id} className="bg-[#0d111c]">
                      {s.symbol} — {s.companyName}
                    </option>
                  ))}
                </select>
                {/* חץ מעוצב ומתוחכם */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 font-black transition-transform group-hover:translate-y-[-2px]">
                  ▼
                </div>
              </div>
            </div>

            {/* כמות להוספה */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pr-1 flex items-center gap-2">
                <Sparkles size={13} className="text-blue-400" /> כמות מניות להזרקה למלאי
              </label>
              <input 
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,000"
                className="w-full p-5 bg-[#141a29] border border-slate-800/80 focus:border-cyan-500/50 focus:shadow-[0_0_30px_rgba(6,182,212,0.15)] focus:outline-none rounded-2xl font-mono font-black text-4xl text-cyan-400 placeholder-slate-800 tracking-wider transition-all duration-300"
              />
            </div>

            {/* כפתור עדכון עם אפקט ריחוף עוצמתי */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full py-4.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={20} />
                  <span>מעדכן מסדי נתונים...</span>
                </>
              ) : (
                <span>בצע הזרקת מלאי כעת ←</span>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* 🌟 המודאל המהפנט: שחור עמוק, ניאון זוהר ואנימציה סופר מקצועית */}
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
                    {modalConfig.type === 'success' ? 'המלאי עודכן בהצלחה!' : 'פעולת העדכון נכשלה'}
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
                    {modalConfig.type === 'success' ? 'מעולה, המשך לעבוד' : 'סגור ונסה שוב'}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminPageLayout>
  );
};

export default AddAmountStock;