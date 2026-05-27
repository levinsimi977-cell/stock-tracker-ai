// import React, { useState } from 'react';
// import { useGetBalanceQuery, useDepositMoneyMutation, useWithdrawMoneyMutation } from './userApi';

// const BankManagement = () => {
//     const [amount, setAmount] = useState('');
//     const { data: balance } = useGetBalanceQuery();
//     const [deposit, { isLoading: depLoading }] = useDepositMoneyMutation();
//     const [withdraw, { isLoading: witLoading }] = useWithdrawMoneyMutation();

//     const handleAction = async (fn, msg) => {
//         if (!amount || amount <= 0) return alert("נא להזין סכום תקין");
//         try {
//             await fn(Number(amount)).unwrap();
//             alert(msg);
//             setAmount('');
//         } catch (e) { alert(e?.data?.message || "פעולה נכשלה"); }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-10 bg-white rounded-[3rem] shadow-2xl mt-10 rtl border border-slate-100">
//             <h1 className="text-4xl font-black text-center text-slate-800 mb-2">ניהול הון 💰</h1>
//             <p className="text-center text-slate-400 mb-10 font-bold italic">הפקדה ומשיכה מאובטחת של כספי השקעות</p>

//             <div className="bg-blue-50 p-8 rounded-[2rem] text-center mb-10 border border-blue-100">
//                 <span className="text-blue-600 font-black uppercase tracking-widest text-xs">יתרה נוכחית</span>
//                 <h2 className="text-5xl font-black text-blue-900 mt-2">${balance?.toLocaleString()}</h2>
//             </div>

//             <input 
//                 type="number" 
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="הזן סכום (USD)"
//                 className="w-full p-6 text-3xl font-black text-center border-2 border-slate-100 rounded-3xl mb-8 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
//             />

//             <div className="grid grid-cols-2 gap-6">
//                 <button 
//                     onClick={() => handleAction(deposit, "הכסף הופקד בהצלחה! ✅")}
//                     className="bg-emerald-500 hover:bg-emerald-600 text-white p-6 rounded-[1.5rem] font-black text-xl transition-all shadow-xl shadow-emerald-100 disabled:opacity-50"
//                     disabled={depLoading}
//                 >
//                     הפקדה (+)
//                 </button>
//                 <button 
//                     onClick={() => handleAction(withdraw, "המשיכה בוצעה בהצלחה! 🏦")}
//                     className="bg-rose-500 hover:bg-rose-600 text-white p-6 rounded-[1.5rem] font-black text-xl transition-all shadow-xl shadow-rose-100 disabled:opacity-50"
//                     disabled={witLoading}
//                 >
//                     משיכה (-)
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BankManagement;