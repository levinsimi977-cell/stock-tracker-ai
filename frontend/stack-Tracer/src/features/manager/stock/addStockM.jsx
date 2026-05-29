import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, ArrowRight, ShieldCheck, Info, CheckCircle2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAddStockMutation } from '../../stock/stockApi';

const AddStockM = () => {
  const navigate = useNavigate();
  const [addStock, { isLoading }] = useAddStockMutation();
  const [formData, setFormData] = useState({ symbol: '', companyName: '', sector: 'טכנולוגיה', currentPrice: '', availableShares: '' });

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStock(formData).unwrap();
      
      setModalConfig({
        isOpen: true,
        type: 'success',
        message: `נייר הערך ${formData.symbol.toUpperCase()} הונפק בהצלחה ונוסף למסד הנתונים הגלובלי של הבורסה!`
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 max-w-5xl mx-auto relative min-h-[85vh]"
      dir="rtl"
    >
      <button 
        onClick={() => navigate('/manager')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-all mb-8 font-black text-xs tracking-wider uppercase group"
      >
        <ArrowRight size={14} className="transition-transform group-hover:translate-x={2}" /> חזרה לדשבורד מנהל
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-[#0d111c]/60 backdrop-blur-xl rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] p-10 border border-slate-800/60 relative overflow-hidden">
          
          {/* אפקט תאורת ניאון אינדיגו זז ברקע */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/[0.05] rounded-full blur-[100px] pointer-events-none animate-pulse" />

          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl shadow-lg shadow-indigo-950/50">
              <PlusCircle size={24} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">הנפקת מניה חדשה</h1>
              <p className="text-xs text-slate-500 mt-1 font-semibold">// יצירת נייר ערך חדש בבסיס הנתונים הגלובלי</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-1">סימול בורסאי</label>
                <input 
                  className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:shadow-[0_0_25px_rgba(99,102,241,0.15)] focus:outline-none rounded-xl transition-all font-mono text-base uppercase text-indigo-400 placeholder-slate-700 font-black tracking-widest"
                  placeholder="AAPL"
                  onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-1">שם החברה</label>
                <input 
                  className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:outline-none rounded-xl transition-all text-slate-200 text-sm font-bold placeholder-slate-600"
                  placeholder="Apple Inc."
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-1">מגזר (Sector)</label>
              <div className="relative">
                <select 
                  className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:outline-none rounded-xl transition-all appearance-none text-slate-300 text-sm font-bold cursor-pointer"
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  defaultValue="טכנולוגיה"
                >
                  <option className="bg-[#0d111c]">טכנולוגיה</option>
                  <option className="bg-[#0d111c]">אנרגיה</option>
                  <option className="bg-[#0d111c]">פיננסים</option>
                  <option className="bg-[#0d111c]">בריאות</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 font-black text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-1">מחיר הנפקה ($)</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:outline-none rounded-xl transition-all font-mono text-slate-200 text-base font-bold"
                  placeholder="150.00"
                  onChange={(e) => setFormData({...formData, currentPrice: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-1">כמות מניות למסחר</label>
                <input 
                  type="number"
                  min="1"
                  className="w-full p-4 bg-[#141a29] border border-slate-800/80 focus:border-indigo-500/50 focus:outline-none rounded-xl transition-all font-mono text-slate-200 text-base font-bold"
                  placeholder="1,000,000"
                  onChange={(e) => setFormData({...formData, availableShares: e.target.value})}
                  required
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-950/50 hover:shadow-indigo-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={20} />
                  <span>מריץ פקודת הנפקה בשרת...</span>
                </>
              ) : (
                <span>אשר והנפק מניה לעולם כעת ←</span>
              )}
            </motion.button>
          </form>
        </div>

        <div className="space-y-6 flex flex-col justify-between lg:justify-start">
          <div className="bg-[#0d111c]/40 border border-slate-800/60 p-6.5 rounded-2xl relative overflow-hidden transition-all hover:border-slate-700">
            <ShieldCheck className="text-emerald-500/80 mb-3 animate-pulse" size={24} />
            <h3 className="font-black text-xs text-slate-200 mb-1.5 uppercase tracking-wide">אבטחת נתונים</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              כל הנפקת מניה עוברת בדיקת תקינות מול ה-Backend. ודא שהסימול ייחודי ולא קיים במערכת למניעת כפילויות.
            </p>
          </div>
          
          <div className="bg-[#0d111c]/40 border border-slate-800/60 p-6.5 rounded-2xl relative overflow-hidden transition-all hover:border-slate-700">
            <Info className="text-indigo-400/80 mb-3" size={24} />
            <h3 className="font-black text-xs text-slate-200 mb-1.5 uppercase tracking-wide">טיפ למנהל</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              מניות טכנולוגיה נוטות לתנודתיות גבוהה יותר במערכת האלגוריתמית. מומלץ להגדיר מחיר הנפקה שמרני ויציב.
            </p>
          </div>
        </div>

      </div>

      {/* 🌟 המודאל המהפנט והקו האחיד: פופ-אפ ניאון דינמי ומטורף */}
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
                onClick={handleCloseModal} 
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
                  {modalConfig.type === 'success' ? 'ההנפקה הושלמה!' : 'ההנפקה נכשלה'}
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
                  {modalConfig.type === 'success' ? 'מעולה, חזרה לדשבורד ←' : 'סגור ונסה שוב'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddStockM;