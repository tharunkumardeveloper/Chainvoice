# ChainVoice - Blockchain Invoice Financing Platform

A financial-grade dark futuristic UI for blockchain-based invoice financing, connecting MSMEs, Lenders, and Regulators.

## Features

- **MSME Portal**: Upload invoices, track FAB tokens, apply for financing
- **Lender Portal**: Verify invoices, manage financing pipeline, track portfolio
- **Regulator Portal**: Audit logs, analytics, fraud detection
- **Blockchain Explorer**: Public transaction explorer

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router v6
- TailwindCSS
- Google Fonts (Syne, DM Sans, JetBrains Mono)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Design System

- **Colors**: Deep navy base, electric cyan accent, amber warnings, emerald success, crimson errors
- **Typography**: Syne (display), DM Sans (body), JetBrains Mono (code)
- **Spacing**: 8px base grid
- **Animations**: 300ms ease-out transitions

## Routes

- `/` - Landing page
- `/auth/login` - Login
- `/auth/register` - Registration
- `/msme/*` - MSME dashboard and features
- `/lender/*` - Lender dashboard and features
- `/regulator/*` - Regulator dashboard and features
- `/shared/blockchain-explorer` - Public blockchain explorer
