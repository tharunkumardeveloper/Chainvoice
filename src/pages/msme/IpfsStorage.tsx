import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { mockIPFSFiles } from '../../data/mockIPFS';

export default function IpfsStorage() {
  const [showInfo, setShowInfo] = useState(false);
  const [copiedCID, setCopiedCID] = useState<string | null>(null);

  const handleCopyCID = (cid: string) => {
    navigator.clipboard.writeText(cid);
    setCopiedCID(cid);
    setTimeout(() => setCopiedCID(null), 2000);
  };

  const totalSize = mockIPFSFiles.reduce((acc, file) => {
    const sizeNum = parseFloat(file.size);
    return acc + sizeNum;
  }, 0);

  return (
    <DashboardLayout role="msme">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">IPFS Storage</h1>
              <p className="text-gray-400 mt-1">InterPlanetary File System — Active</p>
            </div>
          </div>
        </div>

        <p className="text-gray-400">
          All invoice documents are content-addressed and tamper-proof
        </p>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Files Pinned</p>
                <p className="text-3xl font-bold text-teal-400">{mockIPFSFiles.length}</p>
              </div>
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Size</p>
                <p className="text-3xl font-bold text-cyan">{totalSize.toFixed(1)} MB</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Nodes</p>
                <p className="text-3xl font-bold text-emerald-400">8</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Availability</p>
                <p className="text-3xl font-bold text-purple-400">100%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Files Table */}
        <div className="card">
          <h3 className="font-display text-xl font-bold mb-4">Pinned Files</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-lighter">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">File Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Invoice ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">CID</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Size</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Pinned At</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Nodes</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockIPFSFiles.map((file) => (
                  <tr key={file.cid} className="border-b border-navy-lighter/50 hover:bg-navy-lighter/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>{file.fileName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-cyan">{file.invoiceId}</td>
                    <td className="py-4 px-4">
                      <code className="text-xs bg-navy-lighter px-2 py-1 rounded text-teal-400">
                        {file.cid.substring(0, 20)}...
                      </code>
                    </td>
                    <td className="py-4 px-4 text-right">{file.size}</td>
                    <td className="py-4 px-4 text-gray-400">{file.pinnedAt}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                        {file.nodes}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => window.open(`https://ipfs.io/ipfs/${file.cid}`, '_blank')}
                          className="text-cyan hover:underline text-sm"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleCopyCID(file.cid)}
                          className="text-teal-400 hover:underline text-sm relative"
                        >
                          {copiedCID === file.cid ? 'Copied!' : 'Copy CID'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How IPFS Works */}
        <div className="card">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="w-full flex items-center justify-between"
          >
            <h3 className="font-display text-xl font-bold">How IPFS Works</h3>
            <svg 
              className={`w-5 h-5 transition-transform ${showInfo ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showInfo && (
            <div className="mt-4 space-y-3 text-gray-300">
              <p>
                Each file gets a unique Content Identifier (CID) based on its contents. 
                If even one byte changes, the CID changes — making tampering instantly detectable.
              </p>
              <p>
                Files are stored across multiple nodes — no single point of failure.
              </p>
              <div className="bg-navy-lighter rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-white mb-2">Key Benefits:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Content-addressed: Files are identified by their content, not location</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tamper-proof: Any modification changes the CID</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Distributed: Files replicated across multiple nodes for redundancy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Permanent: Files remain accessible as long as at least one node pins them</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-300 text-sm">
                Simulated IPFS storage. In production, files pin to live IPFS network via Pinata/Web3.Storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
