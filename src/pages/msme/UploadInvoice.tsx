import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { mockOdooInvoices } from '../../data/mockOdoo';

export default function UploadInvoice() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOdooInvoice, setSelectedOdooInvoice] = useState('');
  const [ipfsProgress, setIpfsProgress] = useState(0);
  const [ipfsCID, setIpfsCID] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');
  const [hashGenerating, setHashGenerating] = useState(false);
  const [ipfsProcessing, setIpfsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');

  const [formData, setFormData] = useState({
    invoiceNumber: '',
    buyerName: '',
    amount: '',
    issueDate: '',
    dueDate: '',
    description: '',
  });

  const handleOdooSelect = (invoiceId: string) => {
    const invoice = mockOdooInvoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      setSelectedOdooInvoice(invoiceId);
      setFormData({
        invoiceNumber: invoice.invoiceNumber,
        buyerName: invoice.buyerName,
        amount: invoice.amount.toString(),
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: `Invoice from Odoo ERP - ${invoice.buyerName}`,
      });
      
      // Auto-proceed to IPFS step
      setTimeout(() => {
        setCurrentStep(2);
        processIPFS();
      }, 500);
    }
  };

  const processIPFS = () => {
    setIpfsProcessing(true);
    setIpfsProgress(0);
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setIpfsProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          // Start pinning
          setTimeout(() => {
            const fakeCID = `QmX7f3a9b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9`;
            setIpfsCID(fakeCID);
            setIpfsProcessing(false);
            
            // Auto-proceed to hash generation
            setTimeout(() => {
              setCurrentStep(3);
              generateHash();
            }, 1000);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateHash = () => {
    setHashGenerating(true);
    const fakeHash = '3f4a8b9c2d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';
    let currentHash = '';
    
    // Animate hash generation
    const hashInterval = setInterval(() => {
      if (currentHash.length >= fakeHash.length) {
        clearInterval(hashInterval);
        setHashGenerating(false);
        setSha256Hash(fakeHash);
        setCurrentStep(4);
        return;
      }
      currentHash += fakeHash[currentHash.length];
      setSha256Hash(currentHash);
    }, 50);
  };

  const handleSubmit = () => {
    // Generate fake transaction hash
    const fakeTxHash = `0x${Math.random().toString(16).substring(2, 66)}`;
    setTxHash(fakeTxHash);
    
    setTimeout(() => {
      navigate('/msme/invoices');
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DashboardLayout role="msme">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Upload Invoice</h1>
          <p className="text-gray-400">Register your invoice on the blockchain</p>
        </div>

        {/* Step Indicator */}
        <div className="card">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Pull from Odoo', icon: '📥' },
              { num: 2, label: 'IPFS Pin', icon: '📌' },
              { num: 3, label: 'Hash Generated', icon: '🔐' },
              { num: 4, label: 'Submit', icon: '✅' },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-all ${
                    currentStep >= step.num 
                      ? 'bg-cyan text-navy' 
                      : 'bg-navy-lighter text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep >= step.num ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${
                    currentStep > step.num ? 'bg-cyan' : 'bg-navy-lighter'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Pull from Odoo */}
        {currentStep === 1 && (
          <div className="card space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Step 1: Pull from Odoo ERP</h3>
                <p className="text-gray-400 text-sm">Select an invoice from your Odoo instance</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Invoice from Odoo ERP</label>
              <select 
                className="input w-full"
                value={selectedOdooInvoice}
                onChange={(e) => handleOdooSelect(e.target.value)}
              >
                <option value="">-- Select an Odoo Invoice --</option>
                {mockOdooInvoices.filter(inv => inv.odooStatus === 'posted').map(invoice => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.invoiceNumber} - {invoice.buyerName} - ₹{invoice.amount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {selectedOdooInvoice && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400 font-medium">Pulled from Odoo ERP</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: IPFS Processing */}
        {currentStep === 2 && (
          <div className="card space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Step 2: IPFS Processing</h3>
                <p className="text-gray-400 text-sm">Uploading and pinning to IPFS network</p>
              </div>
            </div>

            {ipfsProcessing && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">📤 Uploading to IPFS...</span>
                  <span className="text-cyan font-mono">{ipfsProgress}%</span>
                </div>
                <div className="w-full bg-navy-lighter rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan to-teal-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${ipfsProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {ipfsProgress === 100 && !ipfsCID && (
              <div className="flex items-center space-x-2 text-amber-400">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <span>📌 Pinning to nodes...</span>
              </div>
            )}

            {ipfsCID && (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400 font-medium">✅ Pinned Successfully</span>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs text-gray-400 mb-1 block">IPFS CID</label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 bg-navy px-3 py-2 rounded font-mono text-sm text-teal-400">
                        {ipfsCID}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(ipfsCID)}
                        className="btn-secondary text-sm py-2"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Pinned across 8 nodes</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Hash Generation */}
        {currentStep === 3 && (
          <div className="card space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Step 3: Hash Generation</h3>
                <p className="text-gray-400 text-sm">Computing SHA-256 hash from IPFS content</p>
              </div>
            </div>

            {hashGenerating && (
              <div className="flex items-center space-x-2 text-purple-400">
                <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span>🔐 Computing SHA-256 Hash...</span>
              </div>
            )}

            {sha256Hash && (
              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <label className="text-xs text-gray-400 mb-2 block">SHA-256 Hash</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-navy px-3 py-2 rounded font-mono text-sm text-purple-400 break-all">
                      {sha256Hash}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(sha256Hash)}
                      className="btn-secondary text-sm py-2"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    This hash will be written to Hyperledger Fabric blockchain
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Submit */}
        {currentStep === 4 && (
          <div className="card space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Step 4: Review & Submit</h3>
                <p className="text-gray-400 text-sm">Confirm details and register on blockchain</p>
              </div>
            </div>

            {/* Review Summary */}
            <div className="bg-navy-lighter rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-white mb-3">Invoice Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Invoice Number:</span>
                  <p className="text-white font-mono">{formData.invoiceNumber}</p>
                </div>
                <div>
                  <span className="text-gray-400">Buyer:</span>
                  <p className="text-white">{formData.buyerName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Amount:</span>
                  <p className="text-white font-semibold">₹{parseInt(formData.amount).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">IPFS CID:</span>
                  <p className="text-teal-400 font-mono text-xs">{ipfsCID.substring(0, 20)}...</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">SHA-256 Hash:</span>
                  <p className="text-purple-400 font-mono text-xs break-all">{sha256Hash}</p>
                </div>
              </div>
            </div>

            {!txHash ? (
              <button 
                onClick={handleSubmit}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>Submit to Blockchain</span>
                <span>→</span>
              </button>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400 font-medium">✅ Invoice registered on-chain successfully</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Transaction Hash</label>
                  <code className="block bg-navy px-3 py-2 rounded font-mono text-xs text-emerald-400 break-all">
                    {txHash}
                  </code>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
