import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MsmeDashboard from './pages/msme/Dashboard';
import Invoices from './pages/msme/Invoices';
import UploadInvoice from './pages/msme/UploadInvoice';
import InvoiceDetail from './pages/msme/InvoiceDetail';
import Tokens from './pages/msme/Tokens';
import Financing from './pages/msme/Financing';
import LenderDashboard from './pages/lender/Dashboard';
import Verify from './pages/lender/Verify';
import Pipeline from './pages/lender/Pipeline';
import Disburse from './pages/lender/Disburse';
import Portfolio from './pages/lender/Portfolio';
import RegulatorDashboard from './pages/regulator/Dashboard';
import Audit from './pages/regulator/Audit';
import Analytics from './pages/regulator/Analytics';
import Alerts from './pages/regulator/Alerts';
import BlockchainExplorer from './pages/shared/BlockchainExplorer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        <Route path="/msme/dashboard" element={<MsmeDashboard />} />
        <Route path="/msme/invoices" element={<Invoices />} />
        <Route path="/msme/invoices/upload" element={<UploadInvoice />} />
        <Route path="/msme/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/msme/tokens" element={<Tokens />} />
        <Route path="/msme/financing" element={<Financing />} />
        
        <Route path="/lender/dashboard" element={<LenderDashboard />} />
        <Route path="/lender/verify" element={<Verify />} />
        <Route path="/lender/pipeline" element={<Pipeline />} />
        <Route path="/lender/disburse/:id" element={<Disburse />} />
        <Route path="/lender/portfolio" element={<Portfolio />} />
        
        <Route path="/regulator/dashboard" element={<RegulatorDashboard />} />
        <Route path="/regulator/audit" element={<Audit />} />
        <Route path="/regulator/analytics" element={<Analytics />} />
        <Route path="/regulator/alerts" element={<Alerts />} />
        
        <Route path="/shared/blockchain-explorer" element={<BlockchainExplorer />} />
        
        {/* 404 Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
