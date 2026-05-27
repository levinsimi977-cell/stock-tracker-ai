import React, { useState } from 'react';
import { useRegisterMutation } from './authApi';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Loader2, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ text: '', isError: false });
    
    try {
      await register(form).unwrap();
      setStatusMessage({ text: 'החשבון הוקם בהצלחה! מעביר אותך לדף התחברות...', isError: false });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMsg = err?.data?.message || err?.data || 'אופס! שגיאה בהרשמה. ודא שהפרטים נכונים ונסה שנית.';
      setStatusMessage({ text: errorMsg, isError: true });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#07080b] px-6 py-12 relative overflow-hidden" dir="rtl">
      
      {/* אפקט תאורת אמביינט עמוקה ברקע המסך */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] bg-purple-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="w-full max-w-md bg-[#0d111c]/70 backdrop-blur-md border border-slate-900 p-10 rounded-[2.5rem] shadow-[0_40px_90px_rgba(0,0,0,0.7)] relative z-10"
      >
        {/* קו זוהר עליון מינימליסטי */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        
        {/* לוגו אייקון קטן בראש הכרטיס */}
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-indigo-500/10 border border-indigo-400/20">
          <span className="text-white font-black text-xl tracking-tighter">S</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-white tracking-wide">
            הצטרף ל- <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">STOCKAI</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black mt-2 uppercase tracking-widest">// הקם את תיק ההשקעות החכם שלך עוד היום</p>
        </div>

        {/* התראת סטטוס מונפשת (שגיאה או הצלחה) */}
        <AnimatePresence mode="wait">
          {statusMessage.text && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 mb-6 text-xs text-center rounded-xl font-bold leading-relaxed flex items-center justify-center gap-2 border ${
                statusMessage.isError 
                  ? 'bg-rose-500/5 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)] text-rose-400' 
                  : 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] text-emerald-400'
              }`}
            >
              {statusMessage.isError ? <ShieldAlert size={14} /> : <CheckCircle2 size={14} />}
              {statusMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* שדה שם משתמש */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pr-1 flex items-center gap-1.5">
              <User size={12} className="text-slate-500" /> שם משתמש או שם מלא
            </label>
            <input 
              type="text" 
              placeholder="ישראל ישראלי" 
              className="w-full px-4 py-3.5 bg-[#07080b] border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.05)] rounded-xl focus:outline-none text-slate-200 placeholder-slate-600 text-xs font-semibold transition-all"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})} 
              required
            />
          </div>

          {/* שדה אימייל */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pr-1 flex items-center gap-1.5">
              <Mail size={12} className="text-slate-500" /> כתובת אימייל
            </label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full px-4 py-3.5 bg-[#07080b] border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.05)] rounded-xl focus:outline-none text-slate-200 placeholder-slate-600 text-xs font-semibold transition-all"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} 
              required
            />
          </div>

          {/* שדה סיסמה */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pr-1 flex items-center gap-1.5">
              <Lock size={12} className="text-slate-500" /> מפתח סיסמה מאובטח
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3.5 bg-[#07080b] border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.05)] rounded-xl focus:outline-none text-slate-200 placeholder-slate-600 text-xs font-semibold transition-all"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} 
              required
            />
          </div>

          {/* כפתור הרשמה יוקרתי */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 border disabled:border-slate-800/60 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all mt-8 cursor-pointer shadow-lg shadow-indigo-950/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={14} /> מקים פרופיל השקעות...
              </>
            ) : (
              <>
                צור חשבון משקיע <Sparkles size={13} />
              </>
            )}
          </motion.button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-900">
          <p className="text-xs text-slate-500 font-medium">
            כבר יש לך חשבון במערכת?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-black transition-colors mr-1">
              התחבר כאן
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;