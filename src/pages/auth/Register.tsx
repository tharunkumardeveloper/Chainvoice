import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'msme' | 'lender' | 'regulator'>('msme');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex justify-center mb-6">
            <Logo size="lg" />
          </Link>
          <h2 className="font-display text-3xl font-bold">Create Account</h2>
          <p className="text-gray-400 mt-2">Join the blockchain financing revolution</p>
        </div>

        <form onSubmit={handleRegister} className="card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">I am a</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as any)}
              className="input w-full"
            >
              <option value="msme">MSME (Small Business)</option>
              <option value="lender">Lender (Financial Institution)</option>
              <option value="regulator">Regulator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <input type="text" className="input w-full" placeholder="Acme Corp" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="input w-full" placeholder="you@company.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input type="password" className="input w-full" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-cyan hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
