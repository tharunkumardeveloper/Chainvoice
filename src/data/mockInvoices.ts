export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'verified' | 'financed' | 'in-progress' | 'paid' | 'rejected';
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
  blockchainTxHash?: string;
  financedAmount?: number;
  lender?: string;
  uploadedAt: string;
  verifiedAt?: string;
  financedAt?: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-0891',
    amount: 420000,
    currency: 'INR',
    issueDate: '2024-03-12',
    dueDate: '2024-04-12',
    status: 'financed',
    buyerName: 'Reliance Retail Ltd',
    buyerGSTIN: '27AAAPZ9999N1Z1',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Cotton fabric supply for Q1 2024',
    items: [
      { description: 'Premium Cotton Fabric - 100m rolls', quantity: 50, rate: 6000, amount: 300000 },
      { description: 'Polyester Blend Fabric - 50m rolls', quantity: 40, rate: 3000, amount: 120000 },
    ],
    gstAmount: 75600,
    totalAmount: 495600,
    ipfsHash: 'QmX7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
    blockchainTxHash: '0xabc123def456789abc123def456789abc123def456789abc123def456789abc1',
    financedAmount: 350000,
    lender: 'Bajaj Finserv NBFC',
    uploadedAt: '2024-03-12T14:30:00Z',
    verifiedAt: '2024-03-12T14:30:34Z',
    financedAt: '2024-03-12T15:45:00Z',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-0890',
    amount: 285000,
    currency: 'INR',
    issueDate: '2024-03-11',
    dueDate: '2024-04-11',
    status: 'in-progress',
    buyerName: 'Future Group Enterprises',
    buyerGSTIN: '29AAACF8888M1Z2',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Textile materials for retail stores',
    items: [
      { description: 'Silk Fabric - Premium Grade', quantity: 30, rate: 8000, amount: 240000 },
      { description: 'Cotton Lining Material', quantity: 15, rate: 3000, amount: 45000 },
    ],
    gstAmount: 51300,
    totalAmount: 336300,
    ipfsHash: 'QmY8g4b0c3e2f5g7h9i1j2k3l4m5n6o7p8q9r0s1t2u3v4w',
    blockchainTxHash: '0xdef456abc789def456abc789def456abc789def456abc789def456abc789def4',
    uploadedAt: '2024-03-11T10:15:00Z',
    verifiedAt: '2024-03-11T10:45:00Z',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-0889',
    amount: 195000,
    currency: 'INR',
    issueDate: '2024-03-10',
    dueDate: '2024-04-10',
    status: 'rejected',
    buyerName: 'DMart Stores Pvt Ltd',
    buyerGSTIN: '27AAACM7777K1Z3',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Fabric supply - Duplicate detected',
    items: [
      { description: 'Cotton Fabric Rolls', quantity: 25, rate: 7000, amount: 175000 },
      { description: 'Packaging Materials', quantity: 10, rate: 2000, amount: 20000 },
    ],
    gstAmount: 35100,
    totalAmount: 230100,
    ipfsHash: 'QmZ9h5c1d4f3g6h8i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x',
    blockchainTxHash: '0xghi789jkl012ghi789jkl012ghi789jkl012ghi789jkl012ghi789jkl012gh',
    uploadedAt: '2024-03-10T09:20:00Z',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-0888',
    amount: 340000,
    currency: 'INR',
    issueDate: '2024-03-09',
    dueDate: '2024-04-09',
    status: 'verified',
    buyerName: 'Shoppers Stop Ltd',
    buyerGSTIN: '27AAACS6666J1Z4',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Premium fabric collection for spring season',
    items: [
      { description: 'Designer Silk Fabric', quantity: 20, rate: 12000, amount: 240000 },
      { description: 'Embroidered Cotton', quantity: 20, rate: 5000, amount: 100000 },
    ],
    gstAmount: 61200,
    totalAmount: 401200,
    ipfsHash: 'QmA0i6d2e5g4h7i9j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y',
    blockchainTxHash: '0xjkl012mno345jkl012mno345jkl012mno345jkl012mno345jkl012mno345jk',
    uploadedAt: '2024-03-09T11:30:00Z',
    verifiedAt: '2024-03-09T12:15:00Z',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-0887',
    amount: 520000,
    currency: 'INR',
    issueDate: '2024-03-08',
    dueDate: '2024-04-08',
    status: 'pending',
    buyerName: 'Lifestyle International',
    buyerGSTIN: '29AAACL5555H1Z5',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Bulk textile order for new store openings',
    items: [
      { description: 'Premium Linen Fabric', quantity: 40, rate: 10000, amount: 400000 },
      { description: 'Cotton Blend Material', quantity: 30, rate: 4000, amount: 120000 },
    ],
    gstAmount: 93600,
    totalAmount: 613600,
    ipfsHash: 'QmB1j7e3f6h5i8j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z',
    uploadedAt: '2024-03-08T08:45:00Z',
  },
  {
    id: '6',
    invoiceNumber: 'INV-2024-0886',
    amount: 675000,
    currency: 'INR',
    issueDate: '2024-03-07',
    dueDate: '2024-04-07',
    status: 'financed',
    buyerName: 'Pantaloons Fashion Ltd',
    buyerGSTIN: '27AAACP4444G1Z6',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Seasonal fabric collection',
    items: [
      { description: 'Wool Blend Fabric', quantity: 50, rate: 9000, amount: 450000 },
      { description: 'Synthetic Fabric Rolls', quantity: 45, rate: 5000, amount: 225000 },
    ],
    gstAmount: 121500,
    totalAmount: 796500,
    ipfsHash: 'QmC2k8f4g7i6j9k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a',
    blockchainTxHash: '0xmno345pqr678mno345pqr678mno345pqr678mno345pqr678mno345pqr678mn',
    financedAmount: 540000,
    lender: 'HDFC Bank TReDS',
    uploadedAt: '2024-03-07T13:20:00Z',
    verifiedAt: '2024-03-07T14:00:00Z',
    financedAt: '2024-03-07T16:30:00Z',
  },
  {
    id: '7',
    invoiceNumber: 'INV-2024-0885',
    amount: 890000,
    currency: 'INR',
    issueDate: '2024-03-06',
    dueDate: '2024-04-06',
    status: 'in-progress',
    buyerName: 'Westside Retail',
    buyerGSTIN: '29AAACW3333F1Z7',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Large scale fabric procurement',
    items: [
      { description: 'Denim Fabric - Heavy Grade', quantity: 60, rate: 11000, amount: 660000 },
      { description: 'Canvas Material', quantity: 46, rate: 5000, amount: 230000 },
    ],
    gstAmount: 160200,
    totalAmount: 1050200,
    ipfsHash: 'QmD3l9g5h8j7k0l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b',
    blockchainTxHash: '0xpqr678stu901pqr678stu901pqr678stu901pqr678stu901pqr678stu901pq',
    uploadedAt: '2024-03-06T15:10:00Z',
    verifiedAt: '2024-03-06T15:50:00Z',
  },
  {
    id: '8',
    invoiceNumber: 'INV-2024-0884',
    amount: 425000,
    currency: 'INR',
    issueDate: '2024-03-05',
    dueDate: '2024-04-05',
    status: 'paid',
    buyerName: 'Max Fashion',
    buyerGSTIN: '27AAACM2222E1Z8',
    sellerName: 'Priya Textiles',
    sellerGSTIN: '27AAAPZ1234N1Z5',
    description: 'Fabric supply for summer collection',
    items: [
      { description: 'Light Cotton Fabric', quantity: 55, rate: 6000, amount: 330000 },
      { description: 'Rayon Material', quantity: 19, rate: 5000, amount: 95000 },
    ],
    gstAmount: 76500,
    totalAmount: 501500,
    ipfsHash: 'QmE4m0h6i9k8l1m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c',
    blockchainTxHash: '0xstu901vwx234stu901vwx234stu901vwx234stu901vwx234stu901vwx234st',
    financedAmount: 340000,
    lender: 'SBI Invoice Finance',
    uploadedAt: '2024-03-05T10:00:00Z',
    verifiedAt: '2024-03-05T10:30:00Z',
    financedAt: '2024-03-05T11:45:00Z',
  },
];

export const getInvoicesByStatus = (status: Invoice['status']) => {
  return mockInvoices.filter(inv => inv.status === status);
};

export const getInvoiceById = (id: string) => {
  return mockInvoices.find(inv => inv.id === id);
};

export const getInvoicesByLender = (lender: string) => {
  return mockInvoices.filter(inv => inv.lender === lender);
};
