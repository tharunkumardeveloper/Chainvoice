import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function MsmeDashboard() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout role="msme">
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">{greeting}, Priya Textiles 👋</h1>
          <p className="text-gray-400">Here's your invoice financing snapshot</p>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Active Invoices"
            value="24"
            subtitle="8 pending verification"
            icon="📄"
            color="cyan"
            borderColor="border-l-4 border-cyan"
          />
          <KPICard
            title="FAB Tokens Held"
            value="6"
            subtitle="₹48L financing eligible"
            icon="⬡"
            color="amber"
            borderColor="border-l-4 border-amber"
          />
          <KPICard
            title="Total Financed"
            value="₹2.4 Cr"
            subtitle="This quarter"
            icon="₹"
            color="emerald"
            borderColor="border-l-4 border-emerald"
          />
          <KPICard
            title="Avg Verification Time"
            value="28sec"
            subtitle="vs 3 days traditional"
            icon="⚡"
            color="cyan"
            borderColor="border-l-4 border-cyan"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Invoices Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentInvoicesTable />
          </div>

          {/* Activity Timeline - Takes 1 column */}
          <div>
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
  borderColor: string;
}

function KPICard({ title, value, subtitle, icon, color, borderColor }: KPICardProps) {
  return (
    <div className={`card hover:shadow-cyan-glow hover:-translate-y-1 transition-all duration-300 ${borderColor}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h3 className={`text-3xl font-display font-bold text-${color} mb-1`}>{value}</h3>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}/10 rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function RecentInvoicesTable() {
  const invoices = [
    { id: 'INV-2024-0891', buyer: 'Reliance Retail', amount: 420000, date: '12 Mar 2025', gstStatus: 'verified', fabToken: 'FAB#0x7f3a', status: 'financed' },
    { id: 'INV-2024-0890', buyer: 'Future Group', amount: 285000, date: '11 Mar 2025', gstStatus: 'verified', fabToken: 'FAB#0x8e2b', status: 'fab-issued' },
    { id: 'INV-2024-0889', buyer: 'DMart Stores', amount: 195000, date: '10 Mar 2025', gstStatus: 'duplicate', fabToken: '-', status: 'rejected' },
    { id: 'INV-2024-0888', buyer: 'Shoppers Stop', amount: 340000, date: '09 Mar 2025', gstStatus: 'verified', fabToken: 'FAB#0x6c4d', status: 'gst-verified' },
    { id: 'INV-2024-0887', buyer: 'Lifestyle Stores', amount: 520000, date: '08 Mar 2025', gstStatus: 'pending', fabToken: '-', status: 'pending' },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      'pending': { label: '🟡 Pending Verification', class: 'badge-warning' },
      'gst-verified': { label: '🔵 GST Verified', class: 'badge-info' },
      'fab-issued': { label: '🟠 FAB Token Issued', class: 'badge bg-amber/20 text-amber border border-amber/30' },
      'financed': { label: '🟢 Financed', class: 'badge-success' },
      'rejected': { label: '🔴 Duplicate Detected', class: 'badge-error' },
      'repaid': { label: '⚫ Repaid', class: 'badge bg-gray-600/20 text-gray-400 border border-gray-600/30' },
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-xl font-bold">Recent Invoices</h3>
        <Link to="/msme/invoices" className="text-cyan hover:underline text-sm flex items-center space-x-1">
          <span>View All</span>
          <span>→</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-navy-lighter">
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Invoice ID</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Buyer Name</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Amount</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Upload Date</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">FAB Token</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Status</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const statusBadge = getStatusBadge(inv.status);
              return (
                <tr 
                  key={inv.id} 
                  className="border-b border-navy-lighter hover:bg-navy-lighter/50 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/msme/invoices/${inv.id}`}
                >
                  <td className="py-4 px-3 font-mono text-sm text-cyan">{inv.id}</td>
                  <td className="py-4 px-3 text-sm">{inv.buyer}</td>
                  <td className="py-4 px-3 font-mono font-bold text-sm">₹{inv.amount.toLocaleString()}</td>
                  <td className="py-4 px-3 text-gray-400 text-sm">{inv.date}</td>
                  <td className="py-4 px-3 font-mono text-xs text-gray-400">{inv.fabToken}</td>
                  <td className="py-4 px-3">
                    <span className={statusBadge.class}>{statusBadge.label}</span>
                  </td>
                  <td className="py-4 px-3">
                    <button className="text-cyan hover:text-cyan-dark transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActivityTimeline() {
  const activities = [
    { icon: '🟢', time: '2 min ago', text: 'FAB Token minted for INV-891', color: 'emerald' },
    { icon: '🔵', time: '1 hr ago', text: 'GST verification completed', color: 'cyan' },
    { icon: '🟡', time: '3 hr ago', text: 'Invoice INV-890 uploaded to IPFS', color: 'amber' },
    { icon: '🔴', time: 'Yesterday', text: 'Duplicate detected — INV-889 rejected', color: 'crimson' },
    { icon: '🟢', time: '2 days ago', text: '₹4.2L disbursed by Bajaj Finserv', color: 'emerald' },
  ];

  return (
    <div className="card">
      <h3 className="font-display text-xl font-bold mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start space-x-3 pb-4 border-b border-navy-lighter last:border-0 last:pb-0">
            <div className={`w-2 h-2 rounded-full bg-${activity.color} mt-2 flex-shrink-0`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-400 mb-1">{activity.time}</p>
              <p className="text-sm leading-relaxed">{activity.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-navy-lighter">
        <Link to="/msme/invoices" className="text-cyan hover:underline text-sm flex items-center justify-center space-x-1">
          <span>View Full Activity Log</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
