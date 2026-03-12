import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getInvoiceById } from '../../data/mockInvoices';
import { downloadInvoicePDF } from '../../utils/pdfGenerator';

export default function InvoiceDetail() {
  const { id } = useParams();
  const invoice = getInvoiceById(id || '1');

  const handleDownloadPDF = () => {
    if (invoice) {
      downloadInvoicePDF({
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        sellerName: invoice.sellerName,
        sellerGSTIN: invoice.sellerGSTIN,
        buyerName: invoice.buyerName,
        buyerGSTIN: invoice.buyerGSTIN,
        items: invoice.items,
        amount: invoice.amount,
        gstAmount: invoice.gstAmount,
        totalAmount: invoice.totalAmount,
        ipfsHash: invoice.ipfsHash,
        sha256Hash: invoice.sha256Hash,
        blockchainTxHash: invoice.blockchainTxHash,
      });
    }
  };

  if (!invoice) {
    return (
      <DashboardLayout role="msme">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Invoice Not Found</h2>
          <Link to="/msme/invoices" className="text-cyan hover:underline">
            Back to Invoices
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/msme/dashboard" className="hover:text-cyan">Dashboard</Link>
          <span>›</span>
          <Link to="/msme/invoices" className="hover:text-cyan">My Invoices</Link>
          <span>›</span>
          <span className="text-white">{invoice.invoiceNumber}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold font-mono break-all">{invoice.invoiceNumber}</h1>
            <span className={`badge-${invoice.status === 'financed' ? 'success' : invoice.status === 'verified' ? 'info' : invoice.status === 'pending' ? 'warning' : 'error'}`}>
              {invoice.status === 'financed' ? '🟢 Financed' : 
               invoice.status === 'verified' ? '🔵 Verified' :
               invoice.status === 'in-progress' ? '🟠 In Progress' :
               invoice.status === 'pending' ? '🟡 Pending' :
               invoice.status === 'paid' ? '⚫ Paid' : '🔴 Rejected'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="hidden sm:inline">Share with Lender</span>
              <span className="sm:hidden">Share</span>
            </button>
            <button className="btn-secondary text-crimson border-crimson/30 hover:bg-crimson/10 flex-1 sm:flex-none">
              <span className="hidden sm:inline">Report Issue</span>
              <span className="sm:hidden">Report</span>
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT COLUMN - 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Invoice Summary */}
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-6">Invoice Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Number</p>
                  <p className="font-mono font-bold">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Date</p>
                  <p>{new Date(invoice.issueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Buyer</p>
                  <p className="font-medium">{invoice.buyerName}</p>
                  <p className="text-xs text-gray-500 font-mono">GSTIN: {invoice.buyerGSTIN}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Seller</p>
                  <p className="font-medium">{invoice.sellerName}</p>
                  <p className="text-xs text-gray-500 font-mono">GSTIN: {invoice.sellerGSTIN}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Amount</p>
                  <p className="font-mono font-bold text-xl">₹{invoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">GST Amount</p>
                  <p className="font-mono">₹{invoice.gstAmount.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                  <p className="font-mono font-bold text-2xl text-cyan">₹{invoice.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mt-6 pt-6 border-t border-navy-lighter">
                <h4 className="font-medium mb-4">Invoice Items</h4>
                <div className="space-y-3">
                  {invoice.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start p-3 bg-navy rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-400">Qty: {item.quantity} × ₹{item.rate.toLocaleString()}</p>
                      </div>
                      <p className="font-mono font-bold">₹{item.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-navy-lighter space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Document Storage</p>
                  <a href="#" className="text-cyan hover:underline text-sm font-mono flex items-center space-x-2">
                    <span>{invoice.ipfsHash}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                {invoice.blockchainTxHash && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Blockchain Transaction</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-xs text-gray-300 bg-navy px-3 py-2 rounded flex-1 break-all">
                        {invoice.blockchainTxHash}
                      </p>
                      <button className="p-2 hover:bg-navy-lighter rounded transition-colors" title="Copy">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - 40% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Lifecycle Timeline */}
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-6">Invoice Lifecycle</h3>
              <div className="space-y-6">
                {[
                  { status: 'complete', icon: '✅', title: 'Invoice Uploaded', time: new Date(invoice.uploadedAt).toLocaleString(), desc: `Document stored: ${invoice.ipfsHash.slice(0, 12)}...` },
                  invoice.verifiedAt && { status: 'complete', icon: '✅', title: 'Verification Complete', time: new Date(invoice.verifiedAt).toLocaleString(), desc: 'GSTN API confirmed: Buyer GSTIN active' },
                  invoice.financedAt && { status: 'complete', icon: '✅', title: 'Financing Approved', time: new Date(invoice.financedAt).toLocaleString(), desc: `Financed by: ${invoice.lender}` },
                  invoice.status === 'financed' && { status: 'complete', icon: '🟢', title: 'Funds Disbursed', time: 'Completed', desc: `Amount: ₹${invoice.financedAmount?.toLocaleString()}` },
                  invoice.status === 'in-progress' && { status: 'current', icon: '🔵', title: 'Lender Review', time: 'In Progress', desc: 'Under evaluation...' },
                  invoice.status === 'pending' && { status: 'current', icon: '🟡', title: 'Pending Verification', time: 'Waiting', desc: 'Awaiting lender review' },
                  !invoice.financedAt && { status: 'pending', icon: '⬜', title: 'Disbursement', time: 'Pending', desc: '' },
                  { status: 'pending', icon: '⬜', title: 'Repayment', time: 'Pending', desc: '' },
                ].filter(Boolean).map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step!.status === 'complete' ? 'bg-emerald/20 text-emerald' :
                      step!.status === 'current' ? 'bg-cyan/20 text-cyan' :
                      'bg-navy-lighter text-gray-600'
                    }`}>
                      {step!.icon}
                    </div>
                    <div className="flex-1 pb-6 border-l-2 border-navy-lighter pl-4 -ml-4 last:border-0">
                      <p className={`font-medium mb-1 ${step!.status === 'pending' ? 'text-gray-500' : ''}`}>
                        {step!.title}
                      </p>
                      <p className="text-xs text-gray-400 mb-1">{step!.time}</p>
                      {step!.desc && <p className="text-xs text-gray-500">{step!.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financing Info */}
            {invoice.financedAmount && (
              <div className="card bg-gradient-to-br from-emerald/5 to-transparent border-emerald/30">
                <h3 className="font-display text-xl font-bold mb-4">Financing Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lender</span>
                    <span className="font-medium">{invoice.lender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Financed Amount</span>
                    <span className="font-mono font-bold text-emerald text-xl">₹{invoice.financedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Financing %</span>
                    <span className="font-bold">{((invoice.financedAmount / invoice.amount) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/msme/dashboard" className="hover:text-cyan">Dashboard</Link>
          <span>›</span>
          <Link to="/msme/invoices" className="hover:text-cyan">My Invoices</Link>
          <span>›</span>
          <span className="text-white">INV-2024-0891</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold font-mono break-all">INV-2024-0891</h1>
            <span className="badge-success">🟢 Financed</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 flex-1 sm:flex-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="hidden sm:inline">Share with Lender</span>
              <span className="sm:hidden">Share</span>
            </button>
            <button className="btn-secondary text-crimson border-crimson/30 hover:bg-crimson/10 flex-1 sm:flex-none">
              <span className="hidden sm:inline">Report Issue</span>
              <span className="sm:hidden">Report</span>
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT COLUMN - 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Invoice Summary */}
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-6">Invoice Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Number</p>
                  <p className="font-mono font-bold">INV-2024-0891</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Date</p>
                  <p>12 March 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Buyer</p>
                  <p className="font-medium">Reliance Retail Ltd</p>
                  <p className="text-xs text-gray-500 font-mono">GSTIN: 27AAAPZ9999N1Z1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Seller</p>
                  <p className="font-medium">Priya Textiles</p>
                  <p className="text-xs text-gray-500 font-mono">GSTIN: 27AAAPZ1234N1Z5</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Invoice Amount</p>
                  <p className="font-mono font-bold text-xl">₹4,20,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">GST Amount</p>
                  <p className="font-mono">₹75,600</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                  <p className="font-mono font-bold text-2xl text-cyan">₹4,95,600</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-navy-lighter space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-2">IPFS Document Link</p>
                  <a href="#" className="text-cyan hover:underline text-sm font-mono flex items-center space-x-2">
                    <span>QmX7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">SHA-256 Hash</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-xs text-gray-300 bg-navy px-3 py-2 rounded flex-1">
                      3f4a8b9c2d1e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0
                    </p>
                    <button className="p-2 hover:bg-navy-lighter rounded transition-colors" title="Copy">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Record */}
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-6">On-Chain Record</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Transaction Hash</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-sm text-cyan bg-navy px-3 py-2 rounded flex-1">
                      0xabc123def456789abc123def456789abc123def456789abc123def456789abc1
                    </p>
                    <button className="p-2 hover:bg-navy-lighter rounded transition-colors" title="Copy">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Block Number</p>
                    <p className="font-mono">#847,291</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Timestamp</p>
                    <p>12 Mar 2025, 14:32:07 IST</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Network</p>
                  <p>Hyperledger Fabric — ChainVoice Channel</p>
                </div>
                <Link to="/shared/blockchain-explorer" className="btn-secondary w-full flex items-center justify-center space-x-2">
                  <span>View in Blockchain Explorer</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - 40% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Lifecycle Timeline */}
            <div className="card">
              <h3 className="font-display text-xl font-bold mb-6">Invoice Lifecycle Timeline</h3>
              <div className="space-y-6">
                {[
                  { status: 'complete', icon: '✅', title: 'Invoice Uploaded', time: '12 Mar, 14:30', desc: 'Document pinned to IPFS: QmX7f3a...' },
                  { status: 'complete', icon: '✅', title: 'Hash Generated', time: '12 Mar, 14:30:34', desc: 'SHA-256 hash computed and stored on blockchain' },
                  { status: 'complete', icon: '✅', title: 'Blockchain Registration', time: '12 Mar, 14:31', desc: 'Hash registered on Hyperledger Fabric' },
                  { status: 'complete', icon: '✅', title: 'Financing Request Sent', time: '12 Mar, 14:35', desc: 'Sent to: Bajaj Finserv, HDFC Bank' },
                  { status: 'current', icon: '🔵', title: 'Lender Review', time: 'In Progress', desc: 'Bajaj Finserv reviewing...' },
                  { status: 'pending', icon: '⬜', title: 'Disbursement', time: 'Pending', desc: '' },
                  { status: 'pending', icon: '⬜', title: 'Repayment', time: 'Pending', desc: '' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'complete' ? 'bg-emerald/20 text-emerald' :
                      step.status === 'current' ? 'bg-cyan/20 text-cyan' :
                      'bg-navy-lighter text-gray-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 pb-6 border-l-2 border-navy-lighter pl-4 -ml-4 last:border-0">
                      <p className={`font-medium mb-1 ${step.status === 'pending' ? 'text-gray-500' : ''}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400 mb-1">{step.time}</p>
                      {step.desc && <p className="text-xs text-gray-500">{step.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Verification Card */}
            <div className="card bg-gradient-to-br from-purple/5 to-transparent border-purple/30">
              <h3 className="font-display text-xl font-bold mb-6">Blockchain Verification</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 border-4 border-purple bg-purple/10 rounded-lg transform rotate-45 shadow-lg shadow-purple/20"></div>
              </div>
              <div className="space-y-3 text-center">
                <div>
                  <p className="text-sm text-gray-400">Token ID</p>
                  <p className="font-mono font-bold text-amber">FAB#0x7f3a2b9c</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p className="font-bold text-emerald">ACTIVE</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Minted</p>
                    <p>12 Mar 2025</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Eligible Amount</p>
                  <p className="text-2xl font-bold text-cyan">₹3,50,000</p>
                </div>
                <div className="bg-amber/10 border border-amber/30 rounded-lg p-3 text-xs">
                  This token authorizes exactly ONE financing event
                </div>
                <Link to="/shared/blockchain-explorer" className="btn-secondary w-full text-sm">
                  View Token on Chain →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
