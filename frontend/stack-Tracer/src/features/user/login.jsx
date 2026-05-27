import React, { useState } from 'react';
import { useLoginMutation } from './authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Mail, Loader2, Sparkles } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // שולחים את נתוני ההתחברות ומחכים לתשובה מהשרת
            const response = await login({ email, password }).unwrap();
            const user = response.user;
    
            // קביעת תפקיד המשתמש בצורה נקייה
            const role = user.role === 'ADMIN' ? 'ADMIN' : 'USER';
    
            // שמירה מינימלית וממוקדת ב-LocalStorage ללא כפילויות
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', user.username);
    
            // עדכון ה-Redux Store שמשפיע מיד על ה-Sidebar ודף הבית
            dispatch(setCredentials({
                token: response.token,
                role: role,
                username: user.username
            }));
    
            // ניווט מותאם תפקיד
            if (role === 'ADMIN') {
                navigate('/manager');
            } else {
                navigate('/stocks');
            }
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#07080b] px-6 py-12 relative overflow-hidden" dir="rtl">
            
            {/* אפקטי תאורת אווירה דיגיטליים ויוקרתיים ברקע (אינדיגו וסגול קריסטל) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="w-full max-w-md bg-[#0d111c]/70 backdrop-blur-md border border-slate-900 p-10 rounded-[2.5rem] shadow-[0_40px_90px_rgba(0,0,0,0.7)] relative z-10"
            >
                {/* קו זוהר עליון מינימליסטי בגוון אינדיגו עמוק */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                
                {/* לוגו אייקון סייבר מלוטש בהתאמה להרשמה */}
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-indigo-500/10 border border-indigo-400/20">
                  <span className="text-white font-black text-xl tracking-tighter">S</span>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-light text-white tracking-wide flex items-center justify-center gap-2">
                        כניסה ל- <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">STOCKAI</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] font-black mt-2 uppercase tracking-widest">// מערכת מסחר ואנליזה מבוססת בינה מלאכותית</p>
                </div>

                {/* התראת שגיאה מינימליסטית מלוטשת עם אפקט ניאון אדום */}
                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 mb-6 bg-rose-500/5 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)] text-rose-400 text-xs text-center rounded-xl font-bold leading-relaxed"
                        >
                            {error?.data?.message || 'פרטי הגישה שגויים או שהחשבון לא קיים במערכת.'}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* שדה אימייל */}
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pr-1 flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-500" /> כתובת אימייל מורשית
                        </label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-3.5 bg-[#07080b] border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.05)] rounded-xl focus:outline-none text-slate-200 placeholder-slate-600 text-xs font-semibold transition-all"
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
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3.5 bg-[#07080b] border border-slate-900 focus:border-indigo-500/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.05)] rounded-xl focus:outline-none text-slate-200 placeholder-slate-600 text-xs font-semibold transition-all"
                            required
                        />
                    </div>

                    {/* כפתור כניסה סייבר-פרימיום יוקרתי */}
                    <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 border border-transparent disabled:border-slate-800/60 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all mt-8 cursor-pointer shadow-xl shadow-indigo-950/20 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={14} /> מאמת פרוטוקול גישה...
                            </>
                        ) : (
                            <>
                                התחבר למערכת <Sparkles size={13} />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="text-center mt-8 pt-6 border-t border-slate-900">
                    <p className="text-xs text-slate-500 font-medium">
                        משקיע חדש בזירה?{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-black transition-colors mr-1">
                            צור חשבון פרימיום מהיר
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;