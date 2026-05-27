import React, { useState } from 'react';
import { useGetAllStockQuery, useDeleteStockMutation, useAddAmountStockMutation, useGetFullAnalysisQuery } from '../../stock/stockApi';
import StockMiniChart from './StockMiniChart';
import { useNavigate } from 'react-router-dom';
import AdminPageLayout from '../AdminPageLayout';
import { Trash2, Plus, TrendingUp, TrendingDown, Cpu, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const StockRow = ({ stock, amounts, setAmounts, handleUpdate, handleDelete }) => {
  const { data: aiAnalysis } = useGetFullAnalysisQuery(stock.id);

  const calculateChange = () => {
    const prices = stock.movePrice || [];
    if (prices.length < 2) return { p: "0.00", up: true };
    const cur = prices[prices.length - 1];
    const prev = prices[prices.length - 2];
    return { p: (((cur - prev) / prev) * 100).toFixed(2), up: cur >= prev };
  };
  const change = calculateChange();

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-white/5 hover:bg-white/5 transition-all group"
    >
      <td className="p-8">
        <div className="h-12 w-24">
          <StockMiniChart stock={stock} />
        </div>
      </td>
      <td className="p-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-black flex items-center justify-center font-black text-white border border-white/10 shadow-xl group-hover:from-cyan-500 group-hover:to-blue-600 transition-all">
            {stock.symbol[0]}
          </div>
          <div>
            <div className="font-black text-white text-lg">{stock.companyName}</div>
            <div className="text-cyan-500 font-mono text-[10px] font-bold">{stock.symbol}</div>
          </div>
        </div>
      </td>

      <td className="p-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5">
          <Cpu size={14} className="text-purple-400" />
          <span className="text-[11px] font-black text-slate-300 uppercase leading-none">
            {aiAnalysis?.aiInsight?.slice(0, 20) || "מנתח נתונים..."}
          </span>
        </div>
      </td>

      <td className="p-8">
        <div className="font-mono font-black text-xl text-white">₪{stock.currentPrice?.toLocaleString()}</div>
      </td>

      <td className="p-8">
        <div className={`flex items-center gap-1 font-black ${change.up ? 'text-emerald-400' : 'text-rose-400'}`}>
          {change.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {change.p}%
        </div>
      </td>

      <td className="p-8">
        <div className="flex items-center justify-center gap-3">
          <input
            type="number"
            className="w-20 bg-slate-900 border border-white/10 rounded-lg p-2 text-center text-white font-bold outline-none focus:ring-1 ring-cyan-500"
            placeholder="כמות"
            value={amounts[stock.id] || ""}
            onChange={(e) => setAmounts(prev => ({ ...prev, [stock.id]: e.target.value }))}
          />
          <button onClick={() => handleUpdate(stock.id)} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
            <Plus size={18} />
          </button>
          <button onClick={() => handleDelete(stock.id)} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500 hover:text-white transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

const StockManagement = () => {
  const { data: stocks } = useGetAllStockQuery();
  const [deleteStock] = useDeleteStockMutation();
  const [addAmount] = useAddAmountStockMutation();
  const [amounts, setAmounts] = useState({});

  const handleUpdate = async (id) => {
    const amount = Number(amounts[id]);
    if (!amount) return;
    await addAmount({ id, amount });
    setAmounts(prev => ({ ...prev, [id]: "" }));
    alert("המלאי עודכן");
  };

  const handleDelete = async (id) => {
    if (window.confirm("למחוק מניה זו מהבורסה?")) {
      await deleteStock(id);
    }
  };

  return (
    <AdminPageLayout title="ניהול נכסי בורסה" subtitle="Asset Control Center" icon={Briefcase}>
      <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="p-8">Asset / ID</th>
              <th className="p-8 text-center">AI Intelligence</th>
              <th className="p-8">Live Price</th>
              <th className="p-8">Trend</th>
              <th className="p-8">Mini Chart</th> {/* עמודה חדשה */}
              <th className="p-8 text-center">Operation</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map(stock => (
              <StockRow
                key={stock.id}
                stock={stock}
                amounts={amounts}
                setAmounts={setAmounts}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
};

export default StockManagement;