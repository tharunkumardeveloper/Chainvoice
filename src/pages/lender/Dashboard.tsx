import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';

export default function LenderDashboard() {
  return (
    <DashboardLayout role="lender">
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Lender Dashboard</h1>
          <p className="text-gray-400">Verify invoices and manage your financing portfolio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pending Verification" value="8" icon="⏳" />
          <StatCard title="Active Financing" value="$2.4M" icon="💰" trend="up" trendValue="+12.5%" />
          <StatCard title="Portfolio Size" value="156" icon="📊" />
          <StatCard title="Default Rate" value="0.8%" icon="⚠️" trend="down" trendValue="-0.3%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Verification Queue</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-navy rounded-lg hover:bg-navy-lighter transition-colors cursor-pointer">
                  <div>
                    <p className="font-mono font-medium">INV-2024-{2000 + i}</p>
                    <p className="text-sm text-gray-400">Acme Corp</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">${(25000 + i * 5000).toLocaleString()}</p>
                    <span className="badge-warning">Pending</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary w-full mt-4">View All</button>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Verified Invoice', invoice: 'INV-2024-1998', time: '2 hours ago' },
                { action: 'Disbursed Funds', invoice: 'INV-2024-1995', time: '5 hours ago' },
                { action: 'Verified Invoice', invoice: 'INV-2024-1992', time: '1 day ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-navy rounded-lg">
                  <div className="w-2 h-2 bg-cyan rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.invoice}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
