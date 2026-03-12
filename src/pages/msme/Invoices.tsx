import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import { mockInvoices } from '../../data/mockInvoices';

type FilterType = 'all' | 'financed' | 'not-financed' | 'in-progress' | 'flagged';

export default function Invoices() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const mapStatusToFilter = (status: string): FilterType => {
    if (status === 'financed' || status === 'paid') return 'financed';
    if (status === 'in-progress') return 'in-progress';
    if (status === 'rejected') return 'flagged';
    return 'not-financed';
  };

  const filteredInvoices = activeFilter === 'all' 
    ? mockInvoices 
    : mockInvoices.filter(inv => mapStatusToFilter(inv.status) === activeFilter);

  const getStatusForBadge = (status: string): 'financed' | 'not-financed' | 'in-progress' | 'duplicate' | 'pending' | 'verified' | 'paid' | 'rejected' => {
    if (status === 'financed') return 'financed';
    if (status === 'in-progress') return 'in-progress';
    if (status === 'rejected') return 'duplicate';
    if (status === 'paid') return 'paid';
    if (status === 'verified') return 'verified';
    if (status === 'pending') return 'pending';
    return 'not-financed';
  };

  const filterCounts = {
    all: mockInvoices.length,
    financed: mockInvoices.filter(i => i.status === 'financed' || i.status === 'paid').length,
    'not-financed': mockInvoices.filter(i => i.status === 'pending' || i.status === 'verified').length,
    'in-progress': mockInvoices.filter(i => i.status === 'in-progress').length,
    flagged: mockInvoices.filter(i => i.status === 'rejected').length,
  };

  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">My Invoices</h1>
            <p className="text-gray-400">Track and manage all your invoices</p>
          </div>
          <Link to="/msme/invoices/upload" className="btn-primary">
            + Upload Invoice
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="card">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-cyan text-navy' 
                  : 'bg-navy-lighter hover:bg-navy text-gray-300'
              }`}
            >
              All ({filterCounts.all})
            </button>
            <button 
              onClick={() => setActiveFilter('financed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'financed' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-navy-lighter hover:bg-navy text-gray-300'
              }`}
            >
              🟢 Financed ({filterCounts.financed})
            </button>
            <button 
              onClick={() => setActiveFilter('not-financed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'not-financed' 
                  ? 'bg-gray-500 text-white' 
                  : 'bg-navy-lighter hover:bg-navy text-gray-300'
              }`}
            >
              ⚪ Not Financed ({filterCounts['not-financed']})
            </button>
            <button 
              onClick={() => setActiveFilter('in-progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'in-progress' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-navy-lighter hover:bg-navy text-gray-300'
              }`}
            >
              🔵 In Progress ({filterCounts['in-progress']})
            </button>
            <button 
              onClick={() => setActiveFilter('flagged')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'flagged' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-navy-lighter hover:bg-navy text-gray-300'
              }`}
            >
              🔴 Flagged ({filterCounts.flagged})
            </button>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice #</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Buyer</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Lender</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <div className="text-5xl mb-3">📭</div>
                      <p>No invoices found for this filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-navy-lighter hover:bg-navy-lighter/30 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-cyan">{inv.invoiceNumber}</span>
                      </td>
                      <td className="py-4 px-4">{inv.buyerName}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-mono font-bold">₹{inv.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">
                        {new Date(inv.issueDate).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={getStatusForBadge(inv.status)} size="sm" />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">
                        {inv.lender || '—'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link 
                          to={`/msme/invoices/${inv.id}`} 
                          className="text-cyan hover:underline text-sm font-medium"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="text-sm text-gray-400 mb-1">Total Invoices</div>
            <div className="text-2xl font-bold">{mockInvoices.length}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-400 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-cyan">
              ₹{mockInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-400 mb-1">Financed</div>
            <div className="text-2xl font-bold text-emerald-400">{filterCounts.financed}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-400 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-blue-400">{filterCounts['in-progress']}</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
