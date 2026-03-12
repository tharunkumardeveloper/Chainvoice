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
          <div className="flex items-center gap-4">
            <h1 className="font-display text-3xl font-bold font-mono">{invoice.invoiceNumber}</h1>
            <span className="badge-success">✓ Verified</span>
          </div>
          <button onClick={handleDownloadPDF} className="btn-primary flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download PDF</span>
          </button>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Invoice Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Invoice Number</span>
                <span className="font-mono">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Issue Date</span>
                <span>{new Date(invoice.issueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Due Date</span>
                <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Buyer</span>
                <span className="font-medium">{invoice.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="font-mono font-bold text-xl">₹{invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST</span>
                <span className="font-mono">₹{invoice.gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-navy-lighter pt-3">
                <span className="font-bold">Total Amount</span>
                <span className="font-mono font-bold text-2xl text-cyan">₹{invoice.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Blockchain Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-1">IPFS Hash</p>
                <p className="font-mono text-xs bg-navy px-3 py-2 rounded break-all">{invoice.ipfsHash}</p>
              </div>
              {invoice.sha256Hash && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">SHA-256 Hash</p>
                  <p className="font-mono text-xs bg-navy px-3 py-2 rounded break-all">{invoice.sha256Hash}</p>
                </div>
              )}
              {invoice.blockchainTxHash && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
                  <p className="font-mono text-xs bg-navy px-3 py-2 rounded break-all">{invoice.blockchainTxHash}</p>
                </div>
              )}
              <Link to="/shared/blockchain-explorer" className="btn-secondary w-full mt-4">
                View on Blockchain Explorer
              </Link>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="card">
          <h3 className="font-display text-xl font-bold mb-4">Invoice Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-right py-3 px-4">Quantity</th>
                  <th className="text-right py-3 px-4">Rate</th>
                  <th className="text-right py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i} className="border-b border-navy-lighter/50">
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4 text-right">{item.quantity}</td>
                    <td className="py-3 px-4 text-right font-mono">₹{item.rate.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financing Info */}
        {invoice.financedAmount && (
          <div className="card bg-emerald-500/5 border-emerald-500/30">
            <h3 className="font-display text-xl font-bold mb-4">Financing Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Lender</p>
                <p className="font-medium">{invoice.lender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Financed Amount</p>
                <p className="font-mono font-bold text-xl text-emerald-400">₹{invoice.financedAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Financing Date</p>
                <p>{invoice.financedAt ? new Date(invoice.financedAt).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Financing %</p>
                <p className="font-bold">{((invoice.financedAmount / invoice.amount) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
