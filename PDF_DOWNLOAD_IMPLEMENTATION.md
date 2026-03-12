# PDF Download Implementation

## Overview
Added professional PDF generation functionality for invoices and hash verification certificates using jsPDF library.

## New Dependencies
- `jspdf` - PDF generation library
- `jspdf-autotable` - Table generation for PDFs

## New File Created
`src/utils/pdfGenerator.ts` - Contains PDF generation utilities

## Functions Available

### 1. `generateInvoicePDF(invoice: InvoiceData)`
Generates a professional tax invoice PDF with:
- Company header with ChainVoice branding
- Seller and buyer details with GSTIN
- Itemized invoice table
- GST calculations and totals
- Blockchain verification section showing:
  - IPFS CID
  - SHA-256 Hash
  - Blockchain Transaction Hash
- Security footer with timestamp

### 2. `downloadInvoicePDF(invoice: InvoiceData)`
Downloads the generated invoice PDF with filename: `Invoice_{invoiceNumber}.pdf`

### 3. `generateHashVerificationCertificate(data)`
Generates a hash verification certificate/report with:
- Color-coded header (green for match, red for mismatch)
- Invoice details
- Side-by-side hash comparison
- Verification result with recommendations
- Verifier details and timestamp

### 4. `downloadHashVerificationCertificate(data)`
Downloads the certificate with filename: `Hash_Verification_{status}_{invoiceNumber}.pdf`

## Usage Examples

### In Invoice Detail Page
```typescript
import { downloadInvoicePDF } from '../../utils/pdfGenerator';

const handleDownloadPDF = () => {
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
};
```

### In Lender Verify Page
```typescript
import { downloadHashVerificationCertificate } from '../../utils/pdfGenerator';

const handleDownloadCertificate = () => {
  downloadHashVerificationCertificate({
    invoiceNumber: 'INV-2024-0891',
    sellerName: 'Priya Textiles',
    buyerName: 'Reliance Retail',
    amount: 420000,
    uploadedHash: '3f4a8b9c2d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
    onChainHash: '3f4a8b9c2d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a',
    isMatch: true,
    verifiedBy: 'Bajaj Finserv',
    verificationDate: new Date().toLocaleString('en-IN'),
  });
};
```

## PDF Features

### Invoice PDF
- Professional tax invoice format
- ChainVoice branding
- Blockchain verification section (green background)
- Cryptographic security indicators
- Tamper-proof messaging
- Generation timestamp

### Hash Verification Certificate
- Color-coded status (green/red)
- Clear match/mismatch indication
- Side-by-side hash comparison
- Actionable recommendations
- Audit trail information

## Next Steps
1. Wire up download buttons in InvoiceDetail page
2. Add certificate download in Lender Verify page
3. Add download options in invoice lists
4. Consider adding email functionality to send PDFs

## Notes
- PDFs are generated client-side (no server required)
- All styling matches ChainVoice brand colors
- PDFs include blockchain verification details
- Suitable for legal/audit purposes
