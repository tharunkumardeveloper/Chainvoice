import { OdooInvoice } from '../types';

export const mockOdooInvoices: OdooInvoice[] = [
  {
    id: 'odoo-1',
    invoiceNumber: 'INV-891',
    buyerName: 'Reliance Retail',
    amount: 420000,
    odooStatus: 'posted',
    pushedToIPFS: true,
    ipfsCID: 'QmX7f3a9b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
  },
  {
    id: 'odoo-2',
    invoiceNumber: 'INV-892',
    buyerName: 'Tata Motors',
    amount: 850000,
    odooStatus: 'posted',
    pushedToIPFS: false,
  },
  {
    id: 'odoo-3',
    invoiceNumber: 'INV-893',
    buyerName: 'Infosys Ltd',
    amount: 210000,
    odooStatus: 'draft',
    pushedToIPFS: false,
  },
  {
    id: 'odoo-4',
    invoiceNumber: 'INV-894',
    buyerName: 'Wipro Technologies',
    amount: 560000,
    odooStatus: 'posted',
    pushedToIPFS: true,
    ipfsCID: 'QmY8g4b0c3e2f5g7h9i1j2k3l4m5n6o7p8q9r0s1t2u',
  },
  {
    id: 'odoo-5',
    invoiceNumber: 'INV-895',
    buyerName: 'HCL Tech',
    amount: 340000,
    odooStatus: 'posted',
    pushedToIPFS: true,
    ipfsCID: 'QmZ9h5c1d4f3g6h8i0j1k2l3m4n5o6p7q8r9s0t1u2v',
  },
];
