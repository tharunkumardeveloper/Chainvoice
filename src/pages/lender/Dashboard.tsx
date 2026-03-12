import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';

export default function LenderDashboard() {
  const pendingInvoices = [
    { id: '1', number: 'INV-2024-2001', company: 'Priya Textiles', amount: 420000 },
    { id: '2', number: 'INV-2024-2002', company: 'Kumar Industries', amount: 285000 },
    { id: '3', number: 'INV-2024-2003', company: 'Shah Enterprises', amount: 340000 },
  ];

  return (
    <DashboardLayout role="lender">
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Lender Dashboard</h1>
          <p className="text-gray-400">Verify invoices and manage your financing portfolio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pending Verification" value="8" icon="⏳" />
          <StatCard title="Active Financing" value="₹2.4Cr" icon="💰" trend="up" trendValue="+12.5%" />
          <StatCard title="Portfolio Size" value="156" icon="📊" />
          <StatCard title="Default Rate" value="0.8%" icon="⚠️" trend="down" trendValue="-0.3%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Verification Queue</h3>
            <div className="space-y-3">
              {pendingInvoices.map((invoice) => (
                <Link 
                  key={invoice.id}
                  to="/lender/verify"
                  className="flex justify-between items-center p-3 bg-navy rounded-lg hover:bg-navy-lighter transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-mono font-medium">{invoice.number}</p>
                    <p className="text-sm text-gray-400">{invoice.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">₹{invoice.amount.toLocaleString()}</p>
                    <span className="badge-warning">Pending</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/lender/pipeline" className="btn-primary w-full mt-4">
              View All
            </Link>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Verified Invoice', invoice: 'INV-2024-1998', time: '2 hours ago', link: '/lender/pipeline' },
                { action: 'Disbursed Funds', invoice: 'INV-2024-1995', time: '5 hours ago', link: '/lender/portfolio' },
                { action: 'Verified Invoice', invoice: 'INV-2024-1992', time: '1 day ago', link: '/lender/pipeline' },
              ].map((activity, i) => (
                <Link 
                  key={i}
                  to={activity.link}
                  className="flex items-start space-x-3 p-3 bg-navy rounded-lg hover:bg-navy-lighter transition-colors"
                >
                  <div className="w-2 h-2 bg-cyan rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.invoice}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </Link>
              ))}
            </div>
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

          <Link to="/lender/pipeline" className="card hover:border-emerald-500/50 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">View Pipeline</h4>
                <p className="text-sm text-gray-400">All financing requests</p>
              </div>
            </div>
          </Link>

          <Link to="/lender/portfolio" className="card hover:border-purple-500/50 transition-all cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Portfolio</h4>
                <p className="text-sm text-gray-400">Active financing</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
