import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { mockInvoices } from '../../data/mockInvoices';
import { useState } from 'react';

export default function MsmeDashboard() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const [erpConnected, setErpConnected] = useState(false);

  const stats = {
    activeInvoices: mockInvoices.filter(inv => ['pending', 'verified', 'in-progress'].includes(inv.status)).length,
    totalFinanced: mockInvoices.filter(inv => inv.status === 'financed').reduce((sum, inv) => sum + (inv.financedAmount || 0), 0),
    pendingVerification: mockInvoices.filter(inv => inv.status === 'pending').length,
    avgVerificationTime: '28sec',
  };

  return (
    <DashboardLayout role="msme">
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">{greeting}, Priya Textiles 👋</h1>
          <p className="text-gray-400">Here's your invoice financing snapshot</p>
        </div>

        {/* ERP Connection Banner */}
        {!erpConnected && (
          <div className="card bg-gradient-to-r from-cyan/10 to-emerald/10 border-cyan/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">Connect Your ERP System</h3>
                  <p className="text-sm text-gray-400">Automatically sync invoices from Tally, SAP, Zoho Books, or QuickBooks</p>
                </div>
              </div>
              <button 
                onClick={() => setErpConnected(true)}
                className="btn-primary whitespace-nowrap"
              >
                Connect ERP
              </button>
            </div>
          </div>
        )}

        {erpConnected && (
          <div className="card bg-gradient-to-r from-emerald/10 to-cyan/10 border-emerald/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">ERP Connected: Tally Prime</p>
                <p className="text-sm text-gray-400">Last synced: 2 minutes ago</p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <KPICard
            title="Active Invoices"
            value={stats.activeInvoices.toString()}
            subtitle={`${stats.pendingVerification} pending verification`}
            icon="📄"
            color="cyan"
            borderColor="border-l-4 border-cyan"
          />
          <KPICard
            title="Stored Documents"
            value={mockInvoices.length.toString()}
            subtitle="Securely stored"
            icon="💾"
            color="amber"
            borderColor="border-l-4 border-amber"
          />
          <KPICard
            title="Total Financed"
            value={`₹${(stats.totalFinanced / 100000).toFixed(1)}L`}
            subtitle="This quarter"
            icon="₹"
            color="emerald"
            borderColor="border-l-4 border-emerald"
          />
          <KPICard
            title="Avg Verification Time"
            value={stats.avgVerificationTime}
            subtitle="vs 3 days traditional"
            icon="⚡"
            color="cyan"
            borderColor="border-l-4 border-cyan"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 overflow-x-auto">
            <RecentInvoicesTable />
          </div>
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
  const recentInvoices = mockInvoices.slice(0, 5);

  const getStatusBadge = (status: string) => {
    const badges = {
      'pending': { label: '🟡 Pending Verification', class: 'badge-warning' },
      'verified': { label: '🔵 Verified', class: 'badge-info' },
      'in-progress': { label: '🟠 In Progress', class: 'badge bg-amber/20 text-amber border border-amber/30' },
      'financed': { label: '🟢 Financed', class: 'badge-success' },
      'rejected': { label: '🔴 Rejected', class: 'badge-error' },
      'paid': { label: '⚫ Paid', class: 'badge bg-gray-600/20 text-gray-400 border border-gray-600/30' },
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
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Status</th>
              <th className="text-left py-3 px-3 font-medium text-gray-400 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((inv) => {
              const statusBadge = getStatusBadge(inv.status);
              return (
                <tr 
                  key={inv.id} 
                  className="border-b border-navy-lighter hover:bg-navy-lighter/50 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/msme/invoices/${inv.id}`}
                >
                  <td className="py-4 px-3 font-mono text-sm text-cyan">{inv.invoiceNumber}</td>
                  <td className="py-4 px-3 text-sm">{inv.buyerName}</td>
                  <td className="py-4 px-3 font-mono font-bold text-sm">₹{inv.amount.toLocaleString()}</td>
                  <td className="py-4 px-3 text-gray-400 text-sm">{new Date(inv.uploadedAt).toLocaleDateString()}</td>
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
    { icon: '🟢', time: '2 min ago', text: 'Invoice INV-2024-0891 financed by Bajaj Finserv', color: 'emerald' },
    { icon: '🔵', time: '1 hr ago', text: 'Document verification completed for INV-2024-0890', color: 'cyan' },
    { icon: '🟡', time: '3 hr ago', text: 'Invoice INV-2024-0887 uploaded and stored', color: 'amber' },
    { icon: '🔴', time: 'Yesterday', text: 'Duplicate detected — INV-2024-0889 rejected', color: 'crimson' },
    { icon: '🟢', time: '2 days ago', text: '₹3.4L disbursed by HDFC Bank', color: 'emerald' },
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
