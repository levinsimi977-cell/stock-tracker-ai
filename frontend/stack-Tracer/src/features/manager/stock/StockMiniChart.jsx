import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const StockMiniChart = ({ stock }) => {
  const prices = Array.isArray(stock?.movePrice) ? stock.movePrice : [];
  
  const data = prices.length >= 2 
    ? prices.map((p, i) => ({ i, v: p }))
    : [{ i: 0, v: stock.currentPrice || 0 }, { i: 1, v: stock.currentPrice || 0 }];

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  // לוגיקת צבעים משולשת:
  let strokeColor = "#94a3b8"; // ברירת מחדל: אפור (למצב סטטי)
  if (lastPrice > firstPrice) {
    strokeColor = "#10b981"; // ירוק: עלייה
  } else if (lastPrice < firstPrice) {
    strokeColor = "#f43f5e"; // אדום: ירידה
  }
  // אם הם שווים - נשאר אפור (שזה ה"שחור" המעודן של מערכות פיננסיות)

  const gradientId = `colorPrice-${stock.id}`;

  return (
    <div style={{ width: '100%', height: '60px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
          <Area
            type="monotone"
            dataKey="v"
            stroke={strokeColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockMiniChart;