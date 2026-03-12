import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';

const mockPipeline = [
  { id: '1', invoice: 'INV-2024-0891', company: 'Priya Textiles', amount: 420000, status: 'financed', date: '2024-03-12', buyer: 'Reliance Retail' },
  { id: '2', invoice: 'INV-2024-0890', company: 'Priya Textiles', amount: 285000, status: 'in-progress', date: '2024-03-11', buyer: 'Future Group' },
  { id: '3', invoice: 'INV-2024-0889', company: 'Priya Textiles', amount: 195000, status: 'duplicate', date: '2024-03-10', buyer: 'DMart Stores' },
  { id: '4', invoice: 'INV-2024-0888', company: 'Priya Textiles', amount: 340000, status: 'not-financed', date: '2024-03-09', buyer: 'Shoppers Stop' },
  { id: '5', invoice: 'INV-2024-0887', company: 'Priya Textiles', amount: 520000, status: 'in-progress', date: '2024-03-08', buyer: 'Lifestyle Intl' },
];

type FilterType = 'all' | 'financed' | 'not-financed' | 'in-progress' | 'duplicate';

export default function Pipeline() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredPipeline = activeFilter === 'all' 
    ? mockPipeline 
    : mockPipeline.filter(item => item.status === activeFilter);

  const filterCounts = {
    all: mockPipeline.length,
    financed: mockPipeline.filter(i => i.status === 'financed').length,
    'not-financed': mockPipeline.filter(i => i.status === 'not-financed').length,
    'in-progress': mockPipeline.filter(i => i.status === 'in-progress').length,
    duplicate: mockPipeline.filter(i => i.status === 'duplicate').length,
  };

  return (
    <DashboardLayout role="lender">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Financing Pipeline</h1>
          <p className="text-gray-400">Track financing requests from verification to disbursement</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Financed</p>
            <p className="text-3xl font-bold text-emerald-400">{filterCounts.financed}</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">In Progress</p>
            <p className="text-3xl font-bold text-blue-400">{filterCounts['in-progress']}</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Not Financed</p>
            <p className="text-3xl font-bold text-gray-400">{filterCounts['not-financed']}</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Flagged</p>
            <p className="text-3xl font-bold text-red-400">{filterCounts.duplicate}</p>
          </div>
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
              onClick={() => setActiveFilter('duplicate')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'duplicate' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-navy-lighter hover:bg-navy text-gray-300'
              }`}
            >
              🔴 Flagged ({filterCounts.duplicate})
            </button>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl font-bold">Active Requests</h3>
            <Link to="/lender/verify" className="btn-primary">
              Verify New Invoice
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice #</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Seller</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Buyer</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPipeline.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <div className="text-5xl mb-3">📭</div>
                      <p>No invoices found for this filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredPipeline.map((item) => (
                    <tr key={item.id} className="border-b border-navy-lighter hover:bg-navy-lighter/30 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-cyan">{item.invoice}</span>
                      </td>
                      <td className="py-4 px-4">{item.company}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{item.buyer}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-mono font-bold">₹{item.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">
                        {new Date(item.date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={item.status as any} size="sm" />
                      </td>
                      <td className="py-4 px-4 text-right">
                        {item.status === 'in-progress' ? (
                          <Link 
                            to={`/lender/disburse/${item.id}`}
                            className="text-cyan hover:underline text-sm font-medium"
                          >
                            Process →
                          </Link>
                        ) : (
                          <button className="text-gray-400 hover:text-cyan text-sm font-medium">
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/lender/verify" className="card hover:border-cyan/50 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyan/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Verify Invoice</h4>
                <p className="text-sm text-gray-400">Check hash authenticity</p>
              </div>
            </div>
          </Link>

          <Link to="/lender/portfolio" className="card hover:border-emerald-500/50 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">View Portfolio</h4>
                <p className="text-sm text-gray-400">All financed invoices</p>
              </div>
            </div>
          </Link>

          <Link to="/shared/blockchain-explorer" className="card hover:border-purple-500/50 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Blockchain Explorer</h4>
                <p className="text-sm text-gray-400">View all transactions</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
