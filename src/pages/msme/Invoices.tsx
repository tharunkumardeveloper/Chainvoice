import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

const mockInvoices = [
  { id: '1', number: 'INV-2024-1001', buyer: 'TechCorp Ltd', amount: 15000, status: 'verified', date: '2024-03-01' },
  { id: '2', number: 'INV-2024-1002', buyer: 'Global Industries', amount: 22500, status: 'pending', date: '2024-03-05' },
  { id: '3', number: 'INV-2024-1003', buyer: 'Retail Chain Inc', amount: 8750, status: 'financed', date: '2024-03-07' },
];

export default function Invoices() {
  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">My Invoices</h1>
            <p className="text-gray-400">Track and manage all your invoices</p>
          </div>
          <Link to="/msme/invoices/upload" className="btn-primary">
            + Upload Invoice
          </Link>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice #</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Buyer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-navy-lighter hover:bg-navy-lighter transition-colors">
                    <td className="py-4 px-4 font-mono">{inv.number}</td>
                    <td className="py-4 px-4">{inv.buyer}</td>
                    <td className="py-4 px-4 font-mono font-bold">${inv.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-400">{inv.date}</td>
                    <td className="py-4 px-4">
                      <span className={`badge-${inv.status === 'verified' ? 'success' : inv.status === 'pending' ? 'warning' : 'info'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Link to={`/msme/invoices/${inv.id}`} className="text-cyan hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
