import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, Clock, ArrowLeft } from 'lucide-react';

const RegistrationConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark/50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-status-success/10 dark:bg-status-success/20 flex items-center justify-center animate-scaleIn">
              <CheckCircle size={48} className="text-status-success" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Pendaftaran Berhasil Dikirim!
          </h1>
          <p className="text-brand-muted dark:text-brand-light/70">
            Data registrasi Anda telah berhasil dikirim dan sedang dalam proses verifikasi
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-lg border border-brand-muted/30 dark:border-brand-light/10 p-6 sm:p-8 mb-6">
          {/* Processing Time */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Clock size={24} className="text-brand-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light mb-1">
                Proses Verifikasi
              </h3>
              <p className="text-sm text-brand-muted dark:text-brand-light/70">
                Data Anda sedang diproses oleh admin dan akan diverifikasi dalam waktu <strong>1x24 jam</strong> (1 hari kerja).
              </p>
            </div>
          </div>

          {/* Email Notification */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 mb-6">
            <Mail size={24} className="text-brand-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light mb-1">
                Cek Email Anda
              </h3>
              <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-2">
                Kami telah mengirimkan email konfirmasi ke:
              </p>
              {formData?.email && (
                <p className="text-sm font-semibold text-brand-primary bg-white dark:bg-brand-dark px-3 py-2 rounded-lg border border-brand-primary/20">
                  {formData.email}
                </p>
              )}
              <p className="text-xs text-brand-muted dark:text-brand-light/70 mt-3">
                Silakan cek inbox email Anda (termasuk folder spam) untuk mendapatkan informasi lebih lanjut tentang status verifikasi akun Anda.
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="border-t border-brand-muted/20 dark:border-brand-light/10 pt-6">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light mb-4">
              Langkah Selanjutnya
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-dark dark:text-brand-light">
                    Cek Email Konfirmasi
                  </p>
                  <p className="text-xs text-brand-muted dark:text-brand-light/70">
                    Buka email yang telah kami kirimkan untuk konfirmasi pendaftaran
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-dark dark:text-brand-light">
                    Tunggu Verifikasi Admin
                  </p>
                  <p className="text-xs text-brand-muted dark:text-brand-light/70">
                    Admin akan memverifikasi data Anda dalam waktu maksimal 1x24 jam
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand-primary">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-dark dark:text-brand-light">
                    Terima Notifikasi Hasil Verifikasi
                  </p>
                  <p className="text-xs text-brand-muted dark:text-brand-light/70">
                    Setelah verifikasi selesai, Anda akan menerima email notifikasi hasil verifikasi
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand-primary">4</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-dark dark:text-brand-light">
                    Login ke Dashboard
                  </p>
                  <p className="text-xs text-brand-muted dark:text-brand-light/70">
                    Setelah akun diverifikasi, Anda dapat login dan mulai menggunakan platform NotaryID
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate('/notary/login')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:opacity-90 transition"
          >
            Kembali ke Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 text-brand-dark dark:text-brand-light font-semibold hover:bg-brand-muted/10 dark:hover:bg-brand-muted/20 transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-6 p-4 rounded-xl bg-brand-muted/10 dark:bg-brand-muted/20 border border-brand-muted/20 dark:border-brand-light/10">
          <p className="text-xs text-center text-brand-muted dark:text-brand-light/70">
            Butuh bantuan? Hubungi kami di{' '}
            <a href="mailto:support@notary.id" className="text-brand-primary hover:underline">
              support@notary.id
            </a>
            {' '}atau{' '}
            <a href="tel:+6281234567890" className="text-brand-primary hover:underline">
              +62 812 3456 7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
