import React from 'react';
import { useGetAllStockQuery, useGetFullAnalysisQuery } from '../stock/stockApi';
import AdminPageLayout from './AdminPageLayout';
import { BarChart3, TrendingUp, TrendingDown, BrainCircuit, Loader2 } from 'lucide-react';
import StockMiniChart from './stock/StockMiniChart';

const GlobalPortfolioManagement = () => {
  const { data: stocks, isLoading } = useGetAllStockQuery();

  if (isLoading) {
    return (
      <AdminPageLayout title="Market Intelligence" subtitle="INITIALIZING SYSTEM..." icon={BarChart3}>
        <div className="flex flex-col items-center justify-center h-64 text-indigo-500">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="font-black tracking-widest text-sm uppercase">Synchronizing Market Data...</p>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Market Intelligence" subtitle="Live Data & AI Analytics" icon={BarChart3}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* טבלת מניות */}
        <div className="lg:col-span-3 bg-[#0d111c]/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800/50 overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-900/50 border-b border-slate-800">
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-8">נכס / חברה</th>
                <th className="p-8 text-center">שווי שוק</th>
                <th className="p-8 text-center">מגמה</th>
                <th className="p-8 text-center">תנודות (LIVE)</th>
                <th className="p-8 text-center">AI INSIGHT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {stocks?.map(stock => {
                // חישוב אחוז שינוי אמיתי על סמך מערך המחירים הקיים מהשרת
                const prices = stock?.movePrice || [];
                let changePercent = 0;
                let isPositive = true;

                if (prices.length >= 2) {
                  const firstPrice = prices[0];
                  const currentPrice = stock.currentPrice || prices[prices.length - 1];
                  if (firstPrice > 0) {
                    changePercent = ((currentPrice - firstPrice) / firstPrice) * 100;
                  }
                  isPositive = currentPrice >= firstPrice;
                }

                return (
                  <tr key={stock.id} className="hover:bg-slate-800/30 transition-all group">
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-slate-100 leading-none">{stock.symbol}</span>
                        <span className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">{stock.companyName}</span>
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <span className="text-xl font-mono font-black text-indigo-400">₪{stock.currentPrice?.toLocaleString() || '0'}</span>
                    </td>
                    
                    <td className="p-8 text-center" dir="ltr">
                      <div className={`text-sm font-mono font-black flex items-center gap-1 justify-center ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span className="tracking-tighter">
                          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 w-64">
                      <div className="h-14 opacity-80 group-hover:opacity-100 transition-opacity">
                        <StockMiniChart stock={stock} />
                      </div>
                    </td>
                   <td className="p-8 text-center w-[260px]">
                         <AiStatusBadge stockId={stock.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* פאנל AI */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] p-8 rounded-[2rem] border border-indigo-500/10 shadow-2xl relative overflow-hidden">
            <BrainCircuit className="text-indigo-500 mb-6" size={40} />
            <h3 className="text-lg font-black text-slate-100 mb-2">תובנת מערכת</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Al-Driven Market Scanning. <span className="text-indigo-400">אינדיקציות</span> מבוססות נתונים בזמן אמת לדיוק מקסימלי.
            </p>
          </div>
          
          <div className="bg-[#0d111c] p-8 rounded-[2rem] border border-slate-800">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">סטטוס שרת</h4>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Connected (Java Backend)
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
};

const AiStatusBadge = ({ stockId }) => {
  const { data: analysis, isLoading } = useGetFullAnalysisQuery(stockId);
  if (isLoading) return <div className="w-24 h-8 bg-slate-800/50 rounded-xl animate-pulse" />;
const fullText =
  typeof analysis === 'string'
    ? analysis
    : analysis?.aiInsight || "";

let text = "ללא המלצה";

if (fullText.includes("קנייה")) {
  text = "🟢 קנייה";
} else if (fullText.includes("מכירה")) {
  text = "🔴 מכירה";
} else if (fullText.includes("החזקה")) {
  text = "⚪ החזקה";
}
  // זיהוי חכם יותר של תתי מחרוזות או אייקונים מהשרת
  const isPositive = text.includes("קנייה") || text.includes("Buy") || text.includes("📈");
  const isNegative = text.includes("מכירה") || text.includes("Sell") || text.includes("📉");

  let badgeClass = 'bg-slate-900 text-slate-400 border-slate-800';
  if (isPositive) badgeClass = 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30';
  if (isNegative) badgeClass = 'bg-rose-950/80 text-rose-400 border-rose-500/30';

  return (
    <div className={`px-3 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 border max-w-full w-full ${badgeClass}`}>
      {isPositive && <TrendingUp size={12}/>}
      {isNegative && <TrendingDown size={12}/>}
      <span className="whitespace-normal break-words text-center">{text ? text : "ללא ניתוח"}</span>
    </div>
  );
};

export default GlobalPortfolioManagement;