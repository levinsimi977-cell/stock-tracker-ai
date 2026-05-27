import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { Search, RefreshCcw, LayoutDashboard, TrendingUp, ShieldCheck } from "lucide-react"; 
import { useGetAllStockQuery } from "../stock/stockApi";
import StockMiniChart from './stock/StockMiniChart';
import SectorPieChart from '../manager/stock/SectorPieChart';

function ManagerPage() {
  const { data: stocks, isLoading, refetch } = useGetAllStockQuery();
  const [search, setSearch] = useState("");

  // 1. אופטימיזציה נשמרה: סינון מניות חכם ב-useMemo
  const filteredStocks = useMemo(() => {
    return stocks?.filter(s => s.symbol.toLowerCase().includes(search.toLowerCase())) || [];
  }, [stocks, search]);

  // 2. אופטימיזציה נשמרה: ריענון מאובטח
  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="h-screen bg-[#06080f] flex flex-col items-center justify-center font-black animate-pulse text-indigo-400">
        <div className="text-2xl tracking-widest text-slate-400 mb-2">SECURITY CHECK...</div>
        <div className="text-sm text-indigo-500">INITIALIZING EXECUTIVE DASHBOARD</div>
      </div>
    );
  }

  // חישוב נתונים מהירים לכרטיסי המידע (KPIs)
  const totalStocks = stocks?.length || 0;
  const totalShares = stocks?.reduce((acc, s) => acc + (s.availableShares || 0), 0) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8" 
      dir="rtl"
    >
      {/* 👑 הדר יוקרתי ומתוחכם עם אפקט זכוכית כהה */}
      <header className="relative overflow-hidden bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 border border-slate-800/60 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <ShieldCheck size={22} />
            </div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">ADMINISTRATOR INTERFACE</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-100 tracking-tight mt-1">לוח בקרה גלובלי</h1>
          <p className="text-slate-400 text-sm font-medium">ניהול, מעקב ופיקוח על המניות הפעילות בזמן אמת</p>
        </div>
        
        
        <div className="absolute top-[-20px] left-[-20px] w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      </header>

      {/* 📊 שורת סטטיסטיקה מלוטשת (מידע מנהלים מהיר) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-[#0f172a]/60 border border-slate-800/40 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">נכסים רשומים</p>
            <h3 className="text-2xl font-black text-slate-200 mt-1 font-mono">{totalStocks} מניות</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <LayoutDashboard size={20} />
          </div>
        </div>
        
        <div className="p-6 bg-[#0f172a]/60 border border-slate-800/40 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">סך מניות במלאי</p>
            <h3 className="text-2xl font-black text-slate-200 mt-1 font-mono">{totalShares.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="p-6 bg-[#0f172a]/60 border border-slate-800/40 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">סטטוס הגנה</p>
            <h3 className="text-base font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              מערכת מאובטחת
            </h3>
          </div>
 
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <ShieldCheck size={20} />
          </div>
        </div>
      </section>
      {/* אחרי ה-section של הסטטיסטיקות, תוסיפי: */}
<section className="bg-[#0f172a]/60 border border-slate-800/40 rounded-2xl p-6 shadow-xl flex items-center justify-between">
    <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">פיזור סקטורים בשוק</p>
        <h3 className="text-xl font-black text-slate-200">Portfolio Diversity</h3>
    </div>
    <div className="h-40 w-64">
        <SectorPieChart stocks={stocks || []} />
    </div>
</section>

      {/* 🔍 שורת חיפוש יוקרתית בהתאמה לקו העיצובי */}
      <div className="relative group">
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
        <input 
          type="text"
          placeholder="חפש מניה לפי סימול (Symbol)..."
          className="w-full p-4 pr-14 bg-[#0f172a]/40 border border-slate-800 focus:border-indigo-500/70 rounded-2xl shadow-2xl transition-all text-slate-100 placeholder-slate-500 text-base outline-none focus:ring-1 focus:ring-indigo-500/30"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📈 תצוגת המניות המוצעות באתר - Dark Luxury קשוח ואחיד */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStocks.map((stock) => (
            <motion.div 
              layout
              key={stock.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -4, border: "1px solid rgba(99, 102, 241, 0.3)" }}
              className="bg-[#0f172a]/70 border border-slate-800/80 p-6 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* כותרת הכרטיס ומחיר */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-100 font-mono tracking-tight group-hover:text-indigo-400 transition-colors">
                    {stock.symbol}
                  </h3>
                  <p className="text-slate-400 text-[11px] font-bold mt-0.5 tracking-wider uppercase">
                    {stock.companyName || stock.sector}
                  </p>
                </div>
                <div className="text-left">
                  <span className="text-xl font-mono font-black bg-gradient-to-l from-slate-100 to-slate-300 bg-clip-text text-transparent">
                    ₪{stock.currentPrice?.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* גרף המיניאטורי */}
              <div className="h-28 w-full bg-[#06080f]/60 border border-slate-800/40 rounded-xl overflow-hidden mb-4 p-1">
                <StockMiniChart stock={stock} />
              </div>

              {/* מידע תחתון וכפתור פרטים מנקר עיניים */}
              <div className="flex justify-between items-center text-[11px] font-bold tracking-wide mt-2">
                <span className="text-slate-500">
                  מלאי זמין: <span className="text-slate-300 font-mono">{stock.availableShares}</span>
                </span>
                
                <Link 
                  to={`/stock/${stock.symbol}`} 
                  className="px-4 py-1.5 bg-slate-800/70 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg border border-slate-700/60 hover:border-indigo-500 transition-all duration-200 shadow-md"
                >
                  סקירה מלאה
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* הודעת "אין תוצאות" תואמת עיצוב */}
      {filteredStocks.length === 0 && (
        <div className="p-20 text-center text-slate-500 font-bold border border-dashed border-slate-800 rounded-3xl bg-[#0f172a]/20">
          לא נמצאו מניות העונות לסימול המבוקש.
        </div>
      )}
    </motion.div>
  );
}

export default ManagerPage;