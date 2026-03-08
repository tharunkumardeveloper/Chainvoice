import DashboardLayout from '../../layouts/DashboardLayout';

export default function Financing() {
  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Apply for Financing</h1>
          <p className="text-gray-400">Get instant capital against your verified invoices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Invoice</label>
                <select className="input w-full">
                  <option>INV-2024-1001 - $15,000 (Verified)</option>
                  <option>INV-2024-1003 - $8,750 (Verified)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Financing Amount</label>
                <input type="number" className="input w-full" placeholder="12000" />
                <p className="text-sm text-gray-400 mt-1">Maximum: $13,500 (90% of invoice value)</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Financing Period</label>
                <select className="input w-full">
                  <option>30 days - 2.5% interest</option>
                  <option>60 days - 4.0% interest</option>
                  <option>90 days - 5.5% interest</option>
                </select>
              </div>

              <div className="bg-navy rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Requested Amount</span>
                  <span className="font-mono font-bold">$12,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interest (2.5%)</span>
                  <span className="font-mono">$300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Fee</span>
                  <span className="font-mono">$50</span>
                </div>
                <div className="border-t border-navy-lighter pt-2 flex justify-between">
                  <span className="font-bold">Total Repayment</span>
                  <span className="font-mono font-bold text-cyan text-xl">$12,350</span>
                </div>
              </div>

              <button className="btn-primary w-full">Submit Financing Request</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Active Requests</h3>
              <div className="space-y-3">
                <div className="bg-navy rounded-lg p-3">
                  <p className="font-mono text-sm">INV-2024-1002</p>
                  <p className="font-bold text-cyan">$18,000</p>
                  <span className="badge-warning mt-2">Pending</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Benefits</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Instant approval for verified invoices</li>
                <li>✓ Competitive interest rates</li>
                <li>✓ No hidden fees</li>
                <li>✓ Blockchain-secured transactions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
