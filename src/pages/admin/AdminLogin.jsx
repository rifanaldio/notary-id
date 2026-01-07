import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Admin login:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-lg border border-brand-muted/30 dark:border-brand-light/10 p-8">
          <h1 className="text-2xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Login Admin
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-6">
            Masuk ke dashboard admin untuk mengelola sistem dan pengguna
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  placeholder="admin@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-primary px-6 py-3 text-white font-semibold shadow-sm hover:opacity-90 transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

