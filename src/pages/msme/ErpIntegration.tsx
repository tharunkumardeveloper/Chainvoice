import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { mockOdooInvoices } from '../../data/mockOdoo';

export default function ErpIntegration() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2 minutes ago');
  const [invoices, setInvoices] = useState(mockOdooInvoices);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync('Just now');
    }, 2000);
  };

  const handlePushToIPFS = (id: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id 
        ? { ...inv, pushedToIPFS: true, ipfsCID: `Qm${Math.random().toString(36).substring(2, 15)}` }
        : inv
    ));
  };

  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">ERP Integration</h1>
              <p className="text-gray-400 mt-1">Odoo ERP — Connected</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">Connected</span>
            </div>
          </div>
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="btn-primary flex items-center space-x-2"
          >
            <svg className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>

        <p className="text-gray-400">
          Invoices are automatically synced from your Odoo instance
        </p>

        {/* Connection Status Card */}
        <div className="card">
          <h3 className="font-display text-xl font-bold mb-4">Connection Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">ERP URL</label>
              <p className="text-cyan font-mono">https://priyatextiles.odoo.com</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Status</label>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-emerald-400 font-medium">Connected</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Last Sync</label>
              <p className="text-white">{lastSync}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Total Invoices Pulled</label>
              <p className="text-white font-bold text-2xl">{invoices.length}</p>
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button className="btn-secondary">Re-authenticate</button>
            <button className="btn-secondary">Configure</button>
          </div>
        </div>

        {/* Synced Invoices Table */}
        <div className="card">
          <h3 className="font-display text-xl font-bold mb-4">Synced Invoices</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Invoice No</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Buyer</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Odoo Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Pushed to IPFS</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-navy-lighter/50 hover:bg-navy-lighter/30 transition-colors">
                    <td className="py-4 px-4 font-mono text-cyan">{invoice.invoiceNumber}</td>
                    <td className="py-4 px-4">{invoice.buyerName}</td>
                    <td className="py-4 px-4 text-right font-semibold">₹{invoice.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.odooStatus === 'posted' ? 'bg-emerald-500/20 text-emerald-400' :
                        invoice.odooStatus === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {invoice.odooStatus.charAt(0).toUpperCase() + invoice.odooStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {invoice.pushedToIPFS ? (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-emerald-400 text-sm">Pushed</span>
                        </div>
                      ) : invoice.odooStatus === 'draft' ? (
                        <span className="text-gray-500 text-sm">—</span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-amber-400 text-sm">Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {invoice.pushedToIPFS ? (
                        <button className="text-cyan hover:underline text-sm">View on IPFS</button>
                      ) : invoice.odooStatus === 'draft' ? (
                        <span className="text-gray-500 text-sm">Not ready</span>
                      ) : (
                        <button 
                          onClick={() => handlePushToIPFS(invoice.id)}
                          className="btn-primary text-sm py-1.5 px-3"
                        >
                          Push to IPFS
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-300 text-sm">
                This is a simulated Odoo integration. In production, this connects to your live Odoo ERP via REST API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
