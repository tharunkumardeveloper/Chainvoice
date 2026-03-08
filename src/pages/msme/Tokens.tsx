import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';

export default function Tokens() {
  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">FAB Token Balance</h1>
          <p className="text-gray-400">Fungible Asset-Backed tokens from your invoices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total FAB Tokens" value="12,450" icon="🪙" trend="up" trendValue="+8.2%" />
          <StatCard title="Token Value" value="$124,500" icon="💵" />
          <StatCard title="Locked in Financing" value="4,200" icon="🔒" />
        </div>

        <div className="card">
          <h3 className="font-display text-xl font-bold mb-4">Token History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-03-07', type: 'Minted', invoice: 'INV-2024-1003', amount: '+875', hash: '0x3e5d...8c7b' },
                  { date: '2024-03-05', type: 'Minted', invoice: 'INV-2024-1002', amount: '+2,250', hash: '0x9b2c...4f1a' },
                  { date: '2024-03-01', type: 'Minted', invoice: 'INV-2024-1001', amount: '+1,500', hash: '0x7a8f...3d2e' },
                ].map((tx, i) => (
                  <tr key={i} className="border-b border-navy-lighter hover:bg-navy-lighter transition-colors">
                    <td className="py-4 px-4 text-gray-400">{tx.date}</td>
                    <td className="py-4 px-4">
                      <span className="badge-success">{tx.type}</span>
                    </td>
                    <td className="py-4 px-4 font-mono">{tx.invoice}</td>
                    <td className="py-4 px-4 font-mono font-bold text-emerald">{tx.amount}</td>
                    <td className="py-4 px-4 font-mono text-cyan text-sm">{tx.hash}</td>
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
