import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function Disburse() {
  const navigate = useNavigate();

  const handleDisburse = () => {
    setTimeout(() => {
      navigate('/lender/pipeline');
    }, 1500);
  };

  return (
    <DashboardLayout role="lender">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Disburse Funds</h1>
          <p className="text-gray-400">Complete financing disbursement for approved invoice</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Invoice Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Invoice Number</p>
                  <p className="font-mono font-bold">INV-2024-1998</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Company</p>
                  <p className="font-medium">TechStart Solutions</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Invoice Amount</p>
                  <p className="font-mono font-bold text-2xl">₹14,94,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Financing Amount</p>
                  <p className="font-mono font-bold text-2xl text-cyan">₹13,44,600</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Disbursement Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Wallet Address</label>
                  <input 
                    type="text" 
                    className="input w-full font-mono text-sm" 
                    value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                    readOnly
                  />
                </div>

                <div className="bg-navy rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Financing Amount</span>
                    <span className="font-mono font-bold">₹13,44,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interest (3.5%)</span>
                    <span className="font-mono">₹47,061</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processing Fee</span>
                    <span className="font-mono">₹4,150</span>
                  </div>
                  <div className="border-t border-navy-lighter pt-2 flex justify-between">
                    <span className="font-bold">Expected Return</span>
                    <span className="font-mono font-bold text-emerald text-xl">₹13,95,811</span>
                  </div>
                </div>

                <div className="bg-amber/10 border border-amber/30 rounded-lg p-4">
                  <p className="text-amber text-sm">
                    ⚠️ This transaction will be recorded on the blockchain and cannot be reversed. 
                    Please verify all details before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleDisburse} className="btn-primary flex-1">
                Confirm & Disburse Funds
              </button>
              <button onClick={() => navigate('/lender/pipeline')} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Timeline</h3>
              <div className="space-y-4">
                {[
                  { step: 'Invoice Submitted', status: 'complete' },
                  { step: 'Verified', status: 'complete' },
                  { step: 'Financing Approved', status: 'complete' },
                  { step: 'Funds Disbursement', status: 'current' },
                  { step: 'Repayment', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      item.status === 'complete' ? 'bg-emerald' : 
                      item.status === 'current' ? 'bg-cyan' : 'bg-gray-600'
                    }`}></div>
                    <div>
                      <p className={`font-medium ${item.status === 'pending' ? 'text-gray-500' : ''}`}>
                        {item.step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Gas Estimate</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Gas Price</span>
                  <span className="font-mono">25 Gwei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Fee</span>
                  <span className="font-mono font-bold">~₹706</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
