import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../components/Logo';
import { clearUser } from '../utils/auth';

interface NavbarProps {
  role?: 'msme' | 'lender' | 'regulator';
}

export default function Navbar({ role }: NavbarProps) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <nav className="bg-navy-light border-b border-navy-lighter sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" showText={true} />
          </Link>

          {role && (
            <>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-navy transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showMobileMenu ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {role === 'msme' && (
                  <>
                    <Link to="/msme/dashboard" className="hover:text-cyan transition-colors">Dashboard</Link>
                    <Link to="/msme/invoices" className="hover:text-cyan transition-colors">My Invoices</Link>
                    <Link to="/msme/erp" className="hover:text-cyan transition-colors">ERP Integration</Link>
                    <Link to="/msme/ipfs" className="hover:text-cyan transition-colors">IPFS Storage</Link>
                    <Link to="/msme/financing" className="hover:text-cyan transition-colors">Apply Financing</Link>
                  </>
                )}
                {role === 'lender' && (
                  <>
                    <Link to="/lender/dashboard" className="hover:text-cyan transition-colors">Dashboard</Link>
                    <Link to="/lender/verify" className="hover:text-cyan transition-colors">Verify</Link>
                    <Link to="/lender/pipeline" className="hover:text-cyan transition-colors">Pipeline</Link>
                    <Link to="/lender/portfolio" className="hover:text-cyan transition-colors">Portfolio</Link>
                  </>
                )}
                {role === 'regulator' && (
                  <>
                    <Link to="/regulator/dashboard" className="hover:text-cyan transition-colors">Dashboard</Link>
                    <Link to="/regulator/audit" className="hover:text-cyan transition-colors">Audit</Link>
                    <Link to="/regulator/analytics" className="hover:text-cyan transition-colors">Analytics</Link>
                    <Link to="/regulator/alerts" className="hover:text-cyan transition-colors">Alerts</Link>
                  </>
                )}
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                {/* Blockchain Explorer Link */}
                <Link 
                  to="/shared/blockchain-explorer" 
                  className="hidden md:block text-gray-400 hover:text-cyan transition-colors text-sm"
                >
                  Explorer
                </Link>

                {/* Notification Bell */}
                <button className="relative p-2 hover:bg-navy rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-crimson rounded-full text-xs flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Wallet Chip (MSME only) */}
                {role === 'msme' && (
                  <div className="hidden lg:flex items-center space-x-2 bg-navy px-3 py-1.5 rounded-lg border border-navy-lighter">
                    <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm font-mono text-gray-400">GSTIN: 27AAAPZ1234N1Z5</span>
                  </div>
                )}

                {/* Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 p-2 hover:bg-navy rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan to-emerald rounded-full flex items-center justify-center text-sm font-bold">
                      PT
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-navy-light border border-navy-lighter rounded-lg shadow-lg py-2">
                      <button className="w-full text-left px-4 py-2 hover:bg-navy transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-navy transition-colors flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-navy-lighter my-2"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-navy transition-colors flex items-center space-x-2 text-crimson"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu */}
              {showMobileMenu && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-navy-light border-b border-navy-lighter shadow-lg">
                  <div className="px-4 py-4 space-y-3">
                    {role === 'msme' && (
                      <>
                        <Link to="/msme/dashboard" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
                        <Link to="/msme/invoices" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>My Invoices</Link>
                        <Link to="/msme/erp" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>ERP Integration</Link>
                        <Link to="/msme/ipfs" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>IPFS Storage</Link>
                        <Link to="/msme/financing" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Apply Financing</Link>
                      </>
                    )}
                    {role === 'lender' && (
                      <>
                        <Link to="/lender/dashboard" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
                        <Link to="/lender/verify" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Verify</Link>
                        <Link to="/lender/pipeline" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Pipeline</Link>
                        <Link to="/lender/portfolio" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Portfolio</Link>
                      </>
                    )}
                    {role === 'regulator' && (
                      <>
                        <Link to="/regulator/dashboard" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Dashboard</Link>
                        <Link to="/regulator/audit" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Audit</Link>
                        <Link to="/regulator/analytics" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Analytics</Link>
                        <Link to="/regulator/alerts" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Alerts</Link>
                      </>
                    )}
                    <Link to="/shared/blockchain-explorer" className="block py-2 hover:text-cyan transition-colors" onClick={() => setShowMobileMenu(false)}>Explorer</Link>
                    <button onClick={handleLogout} className="block w-full text-left py-2 text-crimson hover:text-crimson/80 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
