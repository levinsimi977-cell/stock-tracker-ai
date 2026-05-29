import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { hideModal } from '../app/uiSlice';

const GlobalModal = () => {
  const { isOpen, type, message, title } = useSelector((state) => state.ui.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const isError = type === 'error';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z- flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative max-w-md w-full bg-[#0d111c] border ${isError ? 'border-rose-500/30' : 'border-emerald-500/30'} rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}
        >
          {/* אפקט תאורת רקע ניאונית */}
          <div className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] ${isError ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`} />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={`p-4 rounded-2xl mb-4 ${isError ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
              {isError ? <AlertTriangle size={40} /> : <CheckCircle2 size={40} />}
            </div>
            
            <h2 className={`text-2xl font-black mb-2 ${isError ? 'text-rose-400' : 'text-emerald-400'}`}>{title}</h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">{message}</p>
            
            <button
              onClick={() => dispatch(hideModal())}
              className={`w-full py-4 rounded-xl font-black tracking-widest uppercase transition-all active:scale-95 ${
                isError 
                ? 'bg-rose-600 hover:bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              } text-white`}
            >
              הבנתי, המשך
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GlobalModal;