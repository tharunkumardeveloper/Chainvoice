import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';

export default function Portfolio() {
  return (
    <DashboardLayout role="lender">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Active Portfolio</h1>
          <p className="text-gray-400">Monitor your financed invoices and returns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Financed" value="₹19.92Cr" icon="💰" />
          <StatCard title="Active Invoices" value="156" icon="📊" />
          <StatCard title="Avg. Interest Rate" value="3.8%" icon="📈" />
          <StatCard title="Expected Returns" value="₹75.7L" icon="💵" trend="up" trendValue="+5.2%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <h3 className="font-display text-xl font-bold mb-4">Portfolio Breakdown</h3>
            <div className="space-y-4">
              {[
                { sector: 'Technology', count: 45, amount: 850000, percentage: 35 },
                { sector: 'Manufacturing', count: 38, amount: 720000, percentage: 30 },
                { sector: 'Retail', count: 42, amount: 530000, percentage: 22 },
                { sector: 'Services', count: 31, amount: 300000, percentage: 13 },
              ].map((sector) => (
                <div key={sector.sector}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{sector.sector}</span>
                    <span className="text-gray-400">{sector.count} invoices · ${(sector.amount / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="w-full bg-navy-lighter rounded-full h-2">
                    <div 
                      className="bg-cyan h-2 rounded-full transition-all duration-500"
                      style={{ width: `${sector.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Risk Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Default Rate</span>
                  <span className="font-bold text-emerald">0.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Days to Payment</span>
                  <span className="font-bold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Portfolio Diversity</span>
                  <span className="font-bold text-cyan">High</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold mb-4">Upcoming Payments</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">This Week</span>
                  <span className="font-bold">₹1.04Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">This Month</span>
                  <span className="font-bold">₹3.98Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Month</span>
                  <span className="font-bold">₹5.15Cr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
