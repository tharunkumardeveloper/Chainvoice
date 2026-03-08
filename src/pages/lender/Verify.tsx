import DashboardLayout from '../../layouts/DashboardLayout';

export default function Verify() {
  return (
    <DashboardLayout role="lender">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Verify Invoices</h1>
          <p className="text-gray-400">Review and verify invoice authenticity on blockchain</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-1">INV-2024-2001</h3>
                  <p className="text-gray-400">Submitted by TechStart Solutions</p>
                </div>
                <span className="badge-warning">Pending Verification</span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Amount</p>
                  <p className="font-mono text-3xl font-bold text-cyan">$25,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Buyer</p>
                  <p className="font-medium text-xl">Global Tech Corp</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Issue Date</p>
                  <p>2024-03-08</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Due Date</p>
                  <p>2024-04-08</p>
                </div>
              </div>

              <div className="bg-navy rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-3">Invoice Document</h4>
                <div className="border border-navy-lighter rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-400 mb-4">invoice_2024_2001.pdf</p>
                  <button className="btn-secondary">Download & Review</button>
                </div>
              </div>

              <div className="bg-navy rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-3">Verification Checklist</h4>
                <div className="space-y-2">
                  {[
                    'Invoice number matches company records',
                    'Buyer company exists and is verified',
                    'Amount is within acceptable range',
                    'Dates are valid and reasonable',
                    'No duplicate invoice detected',
                  ].map((item, i) => (
                    <label key={i} className="flex items-center space-x-3 cursor-pointer hover:text-cyan transition-colors">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="btn-primary flex-1">✓ Approve & Verify</button>
                <button className="bg-crimson hover:bg-crimson/80 text-white font-medium px-6 py-3 rounded-input transition-all duration-300">
                  ✗ Reject
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Blockchain Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">Tx Hash</p>
                  <p className="font-mono text-cyan break-all">0x9b2c...4f1a</p>
                </div>
                <div>
                  <p className="text-gray-400">Block Number</p>
                  <p className="font-mono">15,234,567</p>
                </div>
                <div>
                  <p className="text-gray-400">Timestamp</p>
                  <p>2024-03-08 14:30:22</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Seller History</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Invoices</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Verified</span>
                  <span className="font-bold text-emerald">11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rejected</span>
                  <span className="font-bold text-crimson">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="font-bold">91.7%</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Queue</h3>
              <p className="text-gray-400 text-sm mb-2">7 more invoices pending</p>
              <button className="btn-secondary w-full">Next Invoice →</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
