import DashboardLayout from '../../layouts/DashboardLayout';

const mockPipeline = [
  { id: '1', invoice: 'INV-2024-1998', company: 'TechStart', amount: 18000, status: 'approved', date: '2024-03-07' },
  { id: '2', invoice: 'INV-2024-1995', company: 'RetailCo', amount: 32000, status: 'disbursed', date: '2024-03-06' },
  { id: '3', invoice: 'INV-2024-1992', company: 'ManufacturePro', amount: 45000, status: 'approved', date: '2024-03-05' },
];

export default function Pipeline() {
  return (
    <DashboardLayout role="lender">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Financing Pipeline</h1>
          <p className="text-gray-400">Track financing requests from approval to disbursement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Pending Review</p>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-emerald">12</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Disbursed</p>
            <p className="text-3xl font-bold text-cyan">45</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-400 text-sm mb-1">Rejected</p>
            <p className="text-3xl font-bold text-crimson">2</p>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl font-bold">Active Requests</h3>
            <select className="input">
              <option>All Statuses</option>
              <option>Approved</option>
              <option>Disbursed</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPipeline.map((item) => (
                  <tr key={item.id} className="border-b border-navy-lighter hover:bg-navy-lighter transition-colors">
                    <td className="py-4 px-4 font-mono">{item.invoice}</td>
                    <td className="py-4 px-4">{item.company}</td>
                    <td className="py-4 px-4 font-mono font-bold">${item.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-400">{item.date}</td>
                    <td className="py-4 px-4">
                      <span className={`badge-${item.status === 'approved' ? 'success' : 'info'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {item.status === 'approved' && (
                        <button className="text-cyan hover:underline">Disburse →</button>
                      )}
                      {item.status === 'disbursed' && (
                        <button className="text-gray-400">View Details</button>
                      )}
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
