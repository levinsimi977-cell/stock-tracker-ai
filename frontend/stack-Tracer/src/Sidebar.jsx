import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/user/authSlice'; 
import { LayoutDashboard, Wallet, History, Briefcase, Settings, BarChart3, LogOut, PlusCircle, Trash2, Sliders } from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const auth = useSelector((state) => state.auth);
    const role = auth?.role || localStorage.getItem('role');
    const username = auth?.username || localStorage.getItem('username') || 'משקיע';

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate('/login');
    };

    const navItems = [
        { name: 'בורסה', path: '/stocks', icon: <LayoutDashboard size={20}/> },
        { name: 'התיק שלי', path: '/portfolio', icon: <Briefcase size={20}/> },
        { name: 'ארנק', path: '/wallet', icon: <Wallet size={20}/> },
    ];

    return (
        // 🔥 תיקון קריטי: z-[9999] כדי לצוף מעל ה-Layout של המנהל, ו-right-0 נעול
        <div className="w-64 bg-[#0f172a]/95 backdrop-blur-xl text-slate-100 h-screen p-6 flex flex-col fixed right-0 top-0 border-l border-slate-800/50 shadow-2xl z-[9999]" dir="rtl">
            {/* לוגו המערכת */}
            <div className="mb-8 text-center border-b border-slate-800/60 pb-6">
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tighter italic">
                    STOCKAI
                </h1>
                <p className="text-xs text-slate-400 mt-2 font-medium">שלום, {username}</p>
            </div>
            
            {/* ניווט */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                <p className="text-[10px] text-slate-500 font-bold pr-3 mb-2 uppercase tracking-widest">תפריט מסחר</p>
                {navItems.map(item => (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        className={({ isActive }) => `
                            flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm
                            ${isActive 
                                ? 'bg-gradient-to-l from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/10' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }
                        `}
                    >
                        {item.icon} <span>{item.name}</span>
                    </NavLink>
                ))}

                {/* תפריט מנהל - מוצג רק ל-ADMIN */}
                {role === 'ADMIN' && (
                    <div className="mt-6 pt-6 border-t border-slate-800/60 space-y-1.5">
                        <p className="text-[10px] text-indigo-400 font-bold pr-3 mb-2 uppercase tracking-widest">ניהול מערכת</p>
                        
                        <NavLink to="/manager" className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                            <LayoutDashboard size={20}/> <span>לוח בקרה</span>
                        </NavLink>
                        
                        <NavLink to="/addStockM" className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                            <PlusCircle size={20}/> <span>הוספת מניה</span>
                        </NavLink>

                        <NavLink to="/updateStock" className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                            <Settings size={20}/> <span>עריכת מניה</span>
                        </NavLink>

                        <NavLink to="/DeleteStock" className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                            <Trash2 size={20}/> <span>מחיקת מניה</span>
                        </NavLink>

                        <NavLink to="/globalPortfolioM" className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                            <BarChart3 size={20}/> <span>אנליטיקה גלובלית</span>
                        </NavLink>

                        <NavLink to="/todayTransactions" className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                            <History size={20}/> <span>עסקאות היום</span>
                        </NavLink>
                    </div>
                )}
            </nav>

            {/* כפתור התנתקות */}
            <button 
                onClick={handleLogout} 
                className="mt-auto pt-4 border-t border-slate-800/60 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-200 font-bold flex items-center justify-center gap-2 w-full text-sm cursor-pointer"
            >
                <LogOut size={18} /> התנתקות מהמערכת
            </button>
        </div>
    );
};

export default Sidebar;