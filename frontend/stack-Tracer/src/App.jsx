import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import Sidebar from "./Sidebar";
import './App.css';
import GlobalModal from './components/GlobalModal'; 
// דפי לקוח
import Login from './features/user/login';
import Register from './features/user/register';
import Dashboard from './features/stock/StockDashboard';
import StockDetails from './features/stock/stockDetails';
import Wallet from './features/user/Wallet';
import ListTransaction from './features/transaction/listTransaction';
import ListStockOwnership from './features/stockOwnership/listStockOwnership';
import TransactionForm from './features/transaction/TransactionForm';
// דפי מנהל
import ManagerPage from './features/manager/manager';
import AddStockM from './features/manager/stock/addStockM';
import UpdateStock from './features/manager/stock/UpdateStock';
import DeleteStock from './features/manager/stock/DeleteStock';
import GlobalPortfolioM from './features/manager/GlobalPortfolioManagement';
import TodayTransactions from './features/manager/todayTransactions';

function App() {
 
  const token = useSelector((state) => state.auth?.token); return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#06080f] text-slate-100 antialiased selection:bg-blue-500/30 selection:text-blue-200" dir="rtl">
      <div className="flex min-h-screen bg-[#06080f] text-slate-100" dir="rtl">

        {token && <Sidebar />}

        <main className={`flex-1 transition-all duration-300 min-h-screen ${token ? 'pr-64' : 'pr-0'}`}>
          <Routes>
            {/* 🌍 שלב 1: דפים ציבוריים לחלוטין */}
            <Route path="/stocks" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ניווט ברירת מחדל */}
            <Route path="/" element={<Dashboard />} />

            {/* 🔒 שלב 2: נתיבים מוגנים למשתמשים ומנהלים */}
            <Route element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']} />}>
              <Route path="/stock/:symbol" element={<StockDetails />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/portfolio" element={<ListStockOwnership />} />
              <Route path="/trade" element={<TransactionForm />} />
            </Route>

            {/* 🛠️ שלב 3: נתיבי מנהל בלבד */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/manager" element={<ManagerPage />} />
              <Route path="/addStockM" element={<AddStockM />} />
              <Route path="/updateStock" element={<UpdateStock />} />
              <Route path="/DeleteStock" element={<DeleteStock />} />
              <Route path="/globalPortfolioM" element={<GlobalPortfolioM />} />
              <Route path="/todayTransactions" element={<TodayTransactions />} />
            </Route>

            {/* גארד לכל נתיב מוזר אחר */}
            <Route path="*" element={<Navigate to="/stocks" replace />} />
          </Routes>
        </main>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;