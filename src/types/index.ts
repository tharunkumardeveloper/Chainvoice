export type UserRole = 'msme' | 'lender' | 'regulator';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'verified' | 'financed' | 'in-progress' | 'paid' | 'rejected' | 'duplicate';
  buyerName: string;
  buyerGSTIN: string;
  sellerName: string;
  sellerGSTIN: string;
  description: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  gstAmount: number;
  totalAmount: number;
  ipfsHash: string;
  ipfsCID?: string;
  sha256Hash?: string;
  blockchainTxHash?: string;
  financedAmount?: number;
  lender?: string;
  uploadedAt: string;
  verifiedAt?: string;
  financedAt?: string;
  odooInvoiceId?: string;
  odooStatus?: 'draft' | 'posted' | 'paid' | 'cancelled';
  ipfsPinned?: boolean;
  ipfsNodes?: number;
}

export interface OdooInvoice {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  amount: number;
  odooStatus: 'draft' | 'posted' | 'paid' | 'cancelled';
  pushedToIPFS: boolean;
  ipfsCID?: string;
}

export interface IPFSFile {
  fileName: string;
  invoiceId: string;
  cid: string;
  size: string;
  pinnedAt: string;
  nodes: number;
}

export interface FinancingRequest {
  id: string;
  invoiceId: string;
  requestedAmount: number;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  role: UserRole;
  details: string;
  txHash?: string;
}
