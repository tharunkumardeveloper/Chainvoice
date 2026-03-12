import { useState, useRef } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { downloadHashVerificationCertificate } from '../../utils/pdfGenerator';

export default function Verify() {
  const [file, setFile] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'match' | 'mismatch' | null>(null);
  const [uploadedHash, setUploadedHash] = useState('');
  const [onChainHash] = useState('3f4a8b9c2d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a');
  const [dragActive, setDragActive] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(false);
  const [selectedFinancingStatus, setSelectedFinancingStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadCertificate = () => {
    if (verificationResult) {
      downloadHashVerificationCertificate({
        invoiceNumber: 'INV-2024-0891',
        sellerName: 'Priya Textiles',
        buyerName: 'Reliance Retail',
        amount: 420000,
        uploadedHash,
        onChainHash,
        isMatch: verificationResult === 'match',
        verifiedBy: 'Bajaj Finserv',
        verificationDate: new Date().toLocaleString('en-IN'),
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    setVerificationResult(null);
    setUploadedHash('');
    setSelectedFinancingStatus(null);
    processVerification();
  };

  const processVerification = () => {
    setVerifying(true);
    
    setTimeout(() => {
      const fakeHash = '3f4a8b9c2d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';
      setUploadedHash(fakeHash);
      setVerificationResult('match');
      setVerifying(false);
    }, 2000);
  };

  const simulateMatch = () => {
    setFile(new File([''], 'invoice.pdf', { type: 'application/pdf' }));
    setVerifying(true);
    setTimeout(() => {
      setUploadedHash('3f4a8b9c2d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a');
      setVerificationResult('match');
      setVerifying(false);
    }, 2000);
  };

  const simulateMismatch = () => {
    setFile(new File([''], 'invoice.pdf', { type: 'application/pdf' }));
    setVerifying(true);
    setTimeout(() => {
      setUploadedHash('1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b');
      setVerificationResult('mismatch');
      setVerifying(false);
    }, 2000);
  };

  const simulateProcessing = () => {
    setFile(new File([''], 'invoice.pdf', { type: 'application/pdf' }));
    setVerifying(true);
    setVerificationResult(null);
    setUploadedHash('');
  };

  return (
    <DashboardLayout role="lender">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Invoice Hash Verification</h1>
          <p className="text-gray-400">Upload seller's invoice to verify authenticity against blockchain</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT PANEL - Upload Invoice Document */}
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-3">Upload Invoice Document</h3>
            <p className="text-gray-400 text-sm mb-6">
              Upload invoice document provided by the seller
            </p>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-cyan bg-cyan/5' 
                  : 'border-navy-lighter hover:border-cyan/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
              />
              
              {!file ? (
                <>
                  <div className="text-5xl mb-4">📄</div>
                  <h3 className="font-display text-lg font-bold mb-2">Drop invoice PDF here</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    System will re-hash and compare against blockchain record
                  </p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-primary"
                  >
                    Browse Files
                  </button>
                  <p className="text-xs text-gray-500 mt-3">Supports PDF, JPG, PNG</p>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="text-4xl">✅</div>
                  <div>
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button 
                    onClick={() => {
                      setFile(null);
                      setVerificationResult(null);
                      setUploadedHash('');
                      setSelectedFinancingStatus(null);
                    }}
                    className="btn-secondary text-sm"
                  >
                    Upload Different File
                  </button>
                </div>
              )}
            </div>

            {verifying && (
              <div className="mt-6 bg-navy-lighter rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-purple-400 font-medium">🔐 Computing hash...</span>
                </div>
              </div>
            )}

            {uploadedHash && !verifying && (
              <div className="mt-6">
                <label className="text-sm text-gray-400 mb-2 block">Computed Hash</label>
                <div className="bg-navy-lighter rounded-lg p-3">
                  <code className="font-mono text-xs text-white break-all">
                    {uploadedHash}
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - Blockchain Comparison */}
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-3">Blockchain Comparison</h3>
            <p className="text-gray-400 text-sm mb-6">
              Comparing uploaded document with on-chain record
            </p>

            <div className="space-y-6">
              {/* On-Chain Hash */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Registered Hash (Hyperledger Fabric)</label>
                <div className="bg-navy-lighter rounded-lg p-4 border border-cyan/30">
                  <code className="font-mono text-xs text-cyan break-all">
                    {onChainHash}
                  </code>
                  <div className="mt-3 pt-3 border-t border-navy-lighter/50 flex items-center justify-between text-xs text-gray-400">
                    <span>Recorded on: 12 Mar 2025, 14:31 IST</span>
                    <span>Block #847,291</span>
                  </div>
                </div>
              </div>

              {/* Uploaded Document Hash */}
              {uploadedHash && (
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Hash of Document You Uploaded</label>
                  <div className="bg-navy-lighter rounded-lg p-4">
                    <code className="font-mono text-xs text-white break-all">
                      {uploadedHash}
                    </code>
                  </div>
                </div>
              )}

              {/* Comparison Indicator */}
              {uploadedHash && verificationResult && (
                <div className="flex items-center justify-center py-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    verificationResult === 'match' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {verificationResult === 'match' ? '=' : '≠'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COMPARISON RESULT - Full Width */}
        {verificationResult && (
          <div className={`card border-2 animate-fadeIn ${
            verificationResult === 'match' 
              ? 'border-emerald-500/50 bg-emerald-500/5' 
              : 'border-red-500/50 bg-red-500/5'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0 ${
                verificationResult === 'match' 
                  ? 'bg-emerald-500/20' 
                  : 'bg-red-500/20'
              }`}>
                {verificationResult === 'match' ? '✅' : '🚨'}
              </div>
              <div className="flex-1">
                <h3 className={`font-display text-2xl font-bold mb-3 ${
                  verificationResult === 'match' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {verificationResult === 'match' 
                    ? '✅ HASH VERIFIED — Document Integrity Confirmed' 
                    : '🚨 HASH MISMATCH — Document Integrity Compromised'}
                </h3>
                <p className="text-gray-300 text-lg mb-2">
                  {verificationResult === 'match'
                    ? 'The invoice submitted by the seller matches the blockchain record exactly. No tampering detected.'
                    : 'The uploaded document does not match the registered hash. This invoice may have been altered after blockchain registration.'}
                </p>
                <p className={`font-semibold ${
                  verificationResult === 'match' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {verificationResult === 'match'
                    ? 'You may proceed with financing evaluation.'
                    : 'Do NOT proceed with financing. Flag for investigation.'}
                </p>
                <button 
                  onClick={handleDownloadCertificate}
                  className="mt-4 btn-secondary flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Verification Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Financing Decision Section */}
        {verificationResult === 'match' && (
          <div className="card">
            <h3 className="font-display text-xl font-bold mb-4">Financing Decision</h3>
            <p className="text-gray-400 text-sm mb-6">Select the financing status for this invoice</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  id: 'financed',
                  label: 'Financed', 
                  icon: '✓',
                  bgColor: 'rgba(16,185,129,0.15)',
                  borderColor: '#10B981',
                  textColor: '#10B981'
                },
                { 
                  id: 'not-financed',
                  label: 'Not Financed', 
                  icon: '○',
                  bgColor: 'rgba(156,163,175,0.15)',
                  borderColor: '#6B7280',
                  textColor: '#9CA3AF'
                },
                { 
                  id: 'in-progress',
                  label: 'In Progress', 
                  icon: '⏳',
                  bgColor: 'rgba(59,130,246,0.15)',
                  borderColor: '#3B82F6',
                  textColor: '#3B82F6'
                },
                { 
                  id: 'flagged',
                  label: 'Duplicate / Flagged', 
                  icon: '⚠',
                  bgColor: 'rgba(239,68,68,0.15)',
                  borderColor: '#EF4444',
                  textColor: '#EF4444'
                },
              ].map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedFinancingStatus(status.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedFinancingStatus === status.id
                      ? 'ring-2 ring-offset-2 ring-offset-navy'
                      : ''
                  }`}
                  style={{
                    backgroundColor: status.bgColor,
                    borderColor: selectedFinancingStatus === status.id ? status.borderColor : status.borderColor + '80',
                    color: status.textColor
                  }}
                >
                  <div className="text-3xl mb-3">{status.icon}</div>
                  <div className="text-sm font-semibold">{status.label}</div>
                </button>
              ))}
            </div>

            {selectedFinancingStatus && (
              <div className="mt-6 flex gap-4">
                <button className="btn-primary flex-1">
                  Confirm & Save Decision
                </button>
                <button className="btn-secondary">
                  View Full Invoice Details
                </button>
              </div>
            )}
          </div>
        )}

        {verificationResult === 'mismatch' && (
          <div className="card bg-red-500/5 border border-red-500/30">
            <h3 className="font-display text-xl font-bold mb-3 text-red-400">⚠️ Verification Failed</h3>
            <p className="text-gray-300 mb-4">
              This invoice cannot be financed as it failed hash verification. Possible reasons:
            </p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Document has been modified after blockchain registration</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Wrong document uploaded (not the original invoice)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Invoice was never registered on blockchain</span>
              </li>
            </ul>
            <div className="flex gap-4">
              <button className="btn-secondary flex-1">
                Contact Seller for Clarification
              </button>
              <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium px-6 py-3 rounded-lg transition-all">
                Flag for Investigation
              </button>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-300 mb-1">How Hash Verification Works</h4>
              <p className="text-blue-300 text-sm">
                When an MSME uploads an invoice, a SHA-256 hash is computed and stored on Hyperledger Fabric. 
                When you upload the same invoice here, we recompute the hash and compare it with the on-chain record. 
                If they match, the document is authentic and unmodified.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Toggle - Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowDemoPanel(!showDemoPanel)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
        >
          <span className="text-xl">🎭</span>
          <span>Demo Mode</span>
        </button>

        {showDemoPanel && (
          <div className="absolute bottom-16 right-0 bg-navy-light border border-purple-500/50 rounded-xl shadow-2xl p-4 w-64 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Demo Controls</h4>
              <button 
                onClick={() => setShowDemoPanel(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <button
                onClick={simulateMatch}
                className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-medium py-2 px-3 rounded-lg text-sm transition-all flex items-center space-x-2"
              >
                <span>✅</span>
                <span>Simulate Hash Match</span>
              </button>
              <button
                onClick={simulateMismatch}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-2 px-3 rounded-lg text-sm transition-all flex items-center space-x-2"
              >
                <span>🚨</span>
                <span>Simulate Hash Mismatch</span>
              </button>
              <button
                onClick={simulateProcessing}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 font-medium py-2 px-3 rounded-lg text-sm transition-all flex items-center space-x-2"
              >
                <span>⏳</span>
                <span>Simulate Processing</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Demo controls — not in production build
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
}
