import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import { mockInvoices } from '../../data/mockInvoices';

export default function Tokens() {
  const totalDocuments = mockInvoices.length;
  const totalSize = (mockInvoices.length * 2.4).toFixed(1); // Average 2.4MB per document
  const storedValue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Document Storage</h1>
          <p className="text-gray-400">Securely stored invoices and documents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Documents" value={totalDocuments.toString()} icon="📄" trend="up" trendValue="+3 this week" />
          <StatCard title="Storage Used" value={`${totalSize} MB`} icon="💾" />
          <StatCard title="Document Value" value={`₹${(storedValue / 10000000).toFixed(1)} Cr`} icon="💰" />
        </div>

        <div className="card">
          <h3 className="font-display text-xl font-bold mb-4">Stored Documents</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Storage Hash</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((inv, i) => (
                  <tr key={inv.id} className="border-b border-navy-lighter hover:bg-navy-lighter transition-colors">
                    <td className="py-4 px-4 text-gray-400">{new Date(inv.uploadedAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 font-mono">{inv.invoiceNumber}</td>
                    <td className="py-4 px-4 font-mono text-cyan text-sm">{inv.ipfsHash.slice(0, 20)}...</td>
                    <td className="py-4 px-4 text-sm">{(2.1 + i * 0.3).toFixed(1)} MB</td>
                    <td className="py-4 px-4">
                      <span className="badge-success">✓ Stored</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Storage Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Storage Type</span>
                <span className="font-bold">Distributed Storage</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Redundancy</span>
                <span className="font-bold text-emerald">8 Nodes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Encryption</span>
                <span className="font-bold">AES-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Availability</span>
                <span className="font-bold text-emerald">99.9%</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Security Features</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Immutable storage</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Blockchain-verified hashes</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Automatic backup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
