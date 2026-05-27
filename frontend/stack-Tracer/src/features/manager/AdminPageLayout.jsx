import React from 'react';
import { motion } from 'framer-motion';

const AdminPageLayout = ({ title, subtitle, icon: Icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    // 1. שינוי הרקע הכללי של המסך לשחור עמוק
    className="min-h-screen bg-[#07080b] p-6 lg:p-12 font-sans" dir="rtl"
  >
    <div className="max-w-7xl mx-auto">
      {/* 2. הפיכת ההדר לשחור-ריבוע יוקרתי עם מסגרת עדינה בסגנון Cyber */}
      <header className="mb-10 flex items-center justify-between bg-[#0d0e12] p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-800/60">
        <div className="flex items-center gap-6">
          {/* 3. שינוי קופסת האייקון לרקע כהה חזק עם צבע אמבר זוהר */}
          {Icon && (
            <div className="p-4 bg-[#161920] text-amber-500 rounded-2xl border border-slate-700/30 shadow-lg">
              <Icon size={32} />
            </div>
          )}
          <div>
            {/* 4. הפיכת הטקסטים ללבן ואפור סלייט מקצועי */}
            <h1 className="text-4xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-slate-500 font-bold mt-1 uppercase text-[11px] tracking-widest">{subtitle}</p>
          </div>
        </div>
      </header>
      {children}
    </div>
  </motion.div>
);

export default AdminPageLayout;