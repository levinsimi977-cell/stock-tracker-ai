import React from 'react';
import { useGetMyPortfolioQuery } from './stockOwnershipApi';
import { useNavigate } from 'react-router-dom';
import StockOwnership from './StockOwnership';
import { Briefcase, Loader2 } from 'lucide-react';
import AdminPageLayout from '../manager/AdminPageLayout'; // בהנחה שאתה משתמש ב-Layout האחיד

const ListStockOwnership = () => {
    const { data: portfolio, isLoading } = useGetMyPortfolioQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="bg-[#07080b] min-h-screen">
                <AdminPageLayout title="התיק האישי שלי" subtitle="מסתנכרן עם השרת..." icon={Briefcase} className="bg-[#07080b]">
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500 font-mono text-sm tracking-widest gap-4 bg-[#07080b]">
                        <Loader2 className="animate-spin text-amber-500" size={48} />
                        <p className="font-black tracking-widest uppercase text-xs">טוען נכסים...</p>
                    </div>
                </AdminPageLayout>
            </div>
        );
    }

    return (
        <div className="bg-[#07080b] min-h-screen text-slate-200">
            <AdminPageLayout title="התיק האישי שלי" subtitle="ניהול נכסים וניתוח AI" icon={Briefcase} className="bg-[#07080b]">
                {/* מעטפת פנימית שחורה מוחלטת כדי לוודא שום רקע בהיר לא חומק */}
                <div className="bg-[#07080b] p-6 min-h-screen">
                    {/* סטטיסטיקה מהירה */}
                    <div className="max-w-4xl mx-auto mb-8 flex justify-end">
                        <div className="bg-[#0d0e12] px-6 py-3 rounded-full border border-slate-800/60 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                            <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">נכסים בתיק:</span>
                            <span className="font-black text-xl text-amber-500 font-mono">{portfolio?.length || 0}</span>
                        </div>
                    </div>

                    {/* רשימת מניות */}
                    <div className="grid gap-4 max-w-4xl mx-auto">
                        {portfolio?.map((item) => (
                            <StockOwnership key={item.id} item={item} navigate={navigate} />
                        ))}
                    </div>

                    {/* מצב ריק */}
                    {portfolio?.length === 0 && (
                        <div className="text-center mt-20 text-slate-400 border border-dashed border-slate-800 rounded-[2.5rem] bg-[#0d0e12] p-16 max-w-4xl mx-auto shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
                            <p className="text-xl font-black text-white">התיק עדיין ריק... הגיע הזמן להשקיע! 🚀</p>
                            <button 
                                onClick={() => navigate('/stocks')} 
                                className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                            >
                                לרשימת המניות
                            </button>
                        </div>
                    )}
                </div>
            </AdminPageLayout>
        </div>
    );
};

export default ListStockOwnership;