import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const NotaryLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Notary login:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-lg border border-brand-muted/30 dark:border-brand-light/10 p-8">
          <h1 className="text-2xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Login Notaris
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-6">
            Masuk ke dashboard notaris untuk mengelola layanan dan dokumen
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
                  placeholder="nama@email.com"
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

          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-brand-muted/20 dark:border-brand-light/10">
            <p className="text-sm text-center text-brand-muted dark:text-brand-light/70 mb-4">
              Belum punya akun?
            </p>
            <button
              type="button"
              onClick={() => navigate('/notary/register')}
              className="w-full rounded-xl border-2 border-brand-primary px-6 py-3 text-brand-primary font-semibold hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition"
            >
              Daftar sebagai Notaris
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaryLogin;

