import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// פלטת צבעי סייבר עמוקה ויוקרתית שמתאימה לקו האחיד של האתר
const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#a855f7'];

const SectorPieChart = ({ stocks }) => {
  // עיבוד נתונים: ספירת מניות בכל סקטור
  const sectorData = stocks.reduce((acc, stock) => {
    const sector = stock.sector || 'כללי';
    const existing = acc.find(item => item.name === sector);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: sector, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="h-64 w-full" dir="ltr"> {/* שמירה על כיוון ltr לצורך תצוגת הגרף התקנית */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sectorData}
            innerRadius={65}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {sectorData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#0d111c" 
                strokeWidth={2}
              />
            ))}
          </Pie>
          
          {/* טולטיפ משודרג לחלוטין - קו Cyber נקי */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#141a29', 
              borderRadius: '12px', 
              border: '1px solid rgba(51, 65, 85, 0.5)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              color: '#f8fafc',
              fontFamily: 'sans-serif',
              fontSize: '12px',
              fontWeight: '600',
              textAlign: 'right'
            }}
            itemStyle={{ color: '#cbd5e1' }}
          />
          
          {/* מקרא נקי עם עיצוב מותאם */}
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingTop: '15px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#94a3b8'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectorPieChart;