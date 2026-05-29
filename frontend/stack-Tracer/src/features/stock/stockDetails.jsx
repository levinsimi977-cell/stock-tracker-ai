import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExecuteTransactionMutation } from '../transaction/transactionApi';
import {
  useGetStockBySymbolQuery,
  useGetFullAnalysisQuery,
  useGetExpertAdviceQuery,
  usePredictFutureQuery
} from './stockApi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, TrendingUp, HelpCircle, ArrowLeft, ShieldAlert, 
  CheckCircle2, X, Loader2, Landmark, Layers, Coins 
} from 'lucide-react';

const StockDetails = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [executeTransaction, { isLoading: isBuying }] = useExecuteTransactionMutation();
  
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, type: 'success', message: '' });

  const { data: stock, isLoading: isStockLoading } = useGetStockBySymbolQuery(symbol);
  const stockId = stock?.id;

const {
  data: analysis,
  isLoading: isAnalysisLoading,
} = useGetFullAnalysisQuery(stockId, {
  skip: !stockId,
});
  const { data: expertAdvice, isLoading: isAdviceLoading } =
useGetExpertAdviceQuery(stockId, { skip: !stockId });
const advice = expertAdvice?.advice || {};
  const { data: predictedValue, isLoading: isPredictLoading } = usePredictFutureQuery(stock?.id, { skip: !stock?.id });

  if (isStockLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#07080b] text-slate-500 font-mono text-xs tracking-widest gap-4">
        <Loader2 className="animate-spin text-indigo-500" size={42} />
        <span className="font-black uppercase tracking-wider">מנתח נתוני שוק מבוזרים...</span>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#07080b] text-rose-400 font-black text-center p-6" dir="rtl">
        <ShieldAlert size={48} className="mb-4 text-rose-500 animate-bounce" />
        <h2 className="text-2xl font-black">נכס פיננסי לא נמצא</h2>
        <p className="text-slate-500 text-xs mt-2">הסימול המבוקש אינו רשום ברשימות המסחר של הבורסה.</p>
        <button onClick={() => navigate(-1)} className="mt-6 flex items-center gap-2 text-indigo-400 font-bold text-xs hover:underline">
          חזרה לדשבורד המרכזי →
        </button>
      </div>
    );
  }

  const renderSkeleton = () => (
    <div className="animate-pulse space-y-2.5 mt-3">
      <div className="h-2.5 bg-slate-800/80 rounded-full w-full" />
      <div className="h-2.5 bg-slate-800/50 rounded-full w-5/6" />
      <div className="h-2.5 bg-slate-800/30 rounded-full w-2/3" />
    </div>
  );

  const handleBuy = async () => {
    if (quantity <= 0) {
      setAlertConfig({ isOpen: true, type: 'error', message: 'נא להזין כמות מניות חיובית ותקינה למסחר.' });
      return;
    }
    try {
      await executeTransaction({ type: 'BUY', symbol: stock.symbol, amount: quantity }).unwrap();
      setShowTradeModal(false);
      setAlertConfig({
        isOpen: true,
        type: 'success',
        message: `רכישת ${quantity} מניות של ${stock.symbol} בוצעה וסונכרנה מול הבלוקצ'יין והארנק האישי שלך!`
      });
      setTimeout(() => navigate('/portfolio'), 1800);
    } catch (error) {
      
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-[#07080b] min-h-screen text-slate-200 pb-24 relative overflow-hidden" dir="rtl">
      
      <div className="absolute top-0 right-1/3 w-[500px] h-[250px] bg-gradient-to-b from-indigo-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-white font-black text-xs transition-colors group cursor-pointer"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:translate-x-[3px]" /> חזרה לבורסה
      </button>

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            {stock.companyName}
            <span className="text-indigo-400 font-mono text-2xl font-black bg-indigo-500/5 px-3 py-1 rounded-xl border border-indigo-500/10">
              {stock.symbol}
            </span>
          </h1>
          <p className="text-slate-500 text-xs font-bold mt-2">// סקירה אנליטית מתקדמת ומסחר בזמן אמת</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8"
      >
        {[
          { label: 'סקטור שוק', value: stock.sector || 'טכנולוגיה', icon: Layers },
          { label: 'מחיר שוק נוכחי', value: `$${stock.currentPrice?.toFixed(2)}`, color: 'text-emerald-400 font-mono', icon: Coins },
          { label: 'מלאי זמין למסחר', value: stock.availableShares?.toLocaleString(), icon: Landmark },
          { label: 'שווי שוק מוערך', value: `$${Number(stock.valueCompany || 0).toLocaleString()}`, icon: TrendingUp }
        ].map((item, i) => (
          <div key={i} className="bg-[#0d111c]/60 p-5 rounded-2xl border border-slate-900/80 shadow-md relative group overflow-hidden">
            <div className="flex justify-between items-start mb-2 text-slate-500 group-hover:text-indigo-400 transition-colors">
              <span className="block text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              <item.icon size={13} />
            </div>
            <b className={`text-xl tracking-tight ${item.color || 'text-white font-black'}`}>{item.value}</b>
          </div>
        ))}
      </motion.div>

      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <Cpu size={14} className="text-indigo-400 animate-pulse" /> מערכות ניתוח פרודקטיביות (AI Modules)
      </h3>
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 mb-10"
      >
        <div className="bg-[#0d111c]/60 p-6 rounded-2xl border border-slate-900 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-indigo-500/30 group-hover:bg-indigo-400 transition-colors" />
          <h2 className="font-black text-indigo-400 text-sm flex items-center gap-2 mb-3">🔍 תובנות בינה מלאכותית</h2>
          {isAnalysisLoading ? renderSkeleton() : (
           <p className="text-xs font-semibold leading-relaxed text-slate-400 italic">
  {analysis?.aiInsight || "המערכת לא זיהתה חריגות במניה זו כרגע."}
</p>
          )}
        </div>

        <div className="bg-[#0d111c]/60 p-6 rounded-2xl border border-slate-900 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-amber-500/30 group-hover:bg-amber-400 transition-colors" />
          <h2 className="font-black text-amber-400 text-sm flex items-center gap-2 mb-3">📈 תחזית שווי עתידי</h2>
          {isPredictLoading ? renderSkeleton() : (
            <div className="mt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">מחיר יעד ל-30 יום:</span>
              <p className="text-3xl font-mono font-black text-white mt-1">
                
{predictedValue && predictedValue !== 0 ? (
  <span style={{ direction: 'ltr', display: 'inline-block' }}>
    ${Number(predictedValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
  </span>
) : "אין תחזית"}              </p>
            </div>
          )}
        </div>

        {/* ADVICE */}
        <div className="bg-[#0d111c]/60 p-6 rounded-2xl border border-slate-900 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors" />
          <h2 className="font-black text-emerald-400 text-sm flex items-center gap-2 mb-3">💡 המלצת מומחה אלגוריתמי</h2>
          {isAdviceLoading ? renderSkeleton() : (
<div className="text-xs font-semibold leading-relaxed text-slate-400 whitespace-pre-wrap">
  {!advice ? (
    "המלצה ניטרלית – החזק בנכס הנוכחי."
  ) : (
    <>
      📊 מגמה: {advice.trend ?? "לא זמין"}
      {"\n"}
      ⚠️ סיכון: {advice.risk ?? "לא זמין"}
      {"\n"}
      📈 מומנטום: {advice.momentum ?? "לא זמין"}
      {"\n"}
      💡 פעולה: {advice.action ?? "לא זמין"}
      {"\n"}
      🎯 ביטחון: {advice.confidence ?? 0}%
    </>
  )}
</div>
          )}
        </div>
      </motion.section>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setShowTradeModal(true)}
        disabled={stock.availableShares <= 0}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-4.5 rounded-2xl transition-all shadow-xl shadow-indigo-950/50 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 border disabled:border-slate-800/60 uppercase tracking-widest text-sm cursor-pointer"
      >
        {stock.availableShares > 0 ? `בצע פקודת רכישה עבור ${stock.symbol} ←` : 'המלאי אזל לחלוטין (Out of Stock)'}
      </motion.button>

      <AnimatePresence>
        {showTradeModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setShowTradeModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#0d111c] border border-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative" 
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowTradeModal(false)} className="absolute top-6 left-6 text-slate-500 hover:text-white transition-colors">
                <X size={18} />
              </button>

              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">רכישת פוזיציה בשוק</h2>
              
              <div className="bg-[#07080b] rounded-2xl p-5 mb-6 border border-slate-900 shadow-inner">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stock.companyName}</p>
                <p className="text-emerald-400 font-mono font-black text-3xl mt-1.5">${stock.currentPrice?.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <label className="block font-black text-slate-400 text-[10px] uppercase tracking-widest pr-1">כמות יחידות לרכישה</label>
                <input
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-4 rounded-xl bg-[#07080b] border border-slate-800 text-white text-center text-3xl font-mono font-black outline-none focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all"
                />
              </div>

              <div className="flex justify-between items-center mt-5 px-1 text-xs font-bold text-slate-500">
                <span>סה"כ משוער לתשלום:</span>
                <span className="font-mono text-white text-sm">${(quantity * stock.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-[#141a29] hover:bg-slate-800 text-slate-300 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors border border-slate-800/80 cursor-pointer" onClick={() => setShowTradeModal(false)}>ביטול</button>
                <button 
                  disabled={isBuying}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-950/40 flex items-center justify-center gap-2 cursor-pointer" 
                  onClick={handleBuy}
                >
                  {isBuying ? <Loader2 className="animate-spin" size={14} /> : 'אישור רכישה'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {alertConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className={`w-full max-w-md p-8 bg-[#0d111c] border rounded-[2.5rem] text-center shadow-2xl relative ${
                alertConfig.type === 'success' ? 'border-emerald-500/30' : 'border-rose-500/30'
              }`}
            >
              <div className="flex flex-col items-center mt-2">
                {alertConfig.type === 'success' ? (
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full mb-4 border border-emerald-500/20">
                    <CheckCircle2 size={44} className="animate-bounce" />
                  </div>
                ) : (
                  <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full mb-4 border border-rose-500/20">
                    <ShieldAlert size={44} className="animate-pulse" />
                  </div>
                )}
                <h3 className={`text-xl font-black ${alertConfig.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {alertConfig.type === 'success' ? 'הפעולה אושרה!' : 'הפקודה נדחתה'}
                </h3>
                <p className="text-slate-300 text-xs font-bold mt-3 leading-relaxed px-2">{alertConfig.message}</p>
                <button 
                  onClick={() => setAlertConfig({ ...alertConfig, isOpen: false })}
                  className="mt-6 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-black rounded-lg transition-colors cursor-pointer"
                >
                  סגור חלונית
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StockDetails;