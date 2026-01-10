import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import ConsultationCard from '../../components/user/ConsultationCard';

const ConsultationPage = () => {
  const navigate = useNavigate();
  const { consultations } = useAppSelector((state) => state.consultation);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Jika belum login, redirect ke home
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted dark:text-brand-light/70 mb-4">
            Silakan login terlebih dahulu untuk melihat riwayat konsultasi Anda
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-xl bg-brand-primary text-white font-semibold hover:opacity-90 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Filter hanya konsultasi yang sudah selesai (status CLOSED)
  const closedConsultations = consultations.filter(c => c.status === 'CLOSED');
  const hasClosedConsultations = closedConsultations.length > 0;

  return (
    <div className="min-h-screen bg-brand-muted/20 dark:bg-brand-dark/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Riwayat Konsultasi
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-light/70">
            Lihat riwayat konsultasi yang sudah selesai dengan notaris
          </p>
        </div>

        {/* Content */}
        {hasClosedConsultations ? (
          <div className="space-y-3">
            {closedConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onViewDetails={(id) => {
                  // TODO: Navigate to consultation detail page
                  console.log('View details for consultation:', id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-sm border border-brand-muted/20 dark:border-brand-light/10 p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-brand-muted/20 dark:bg-brand-muted/30 flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-brand-muted dark:text-brand-light/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark dark:text-brand-light mb-3">
                Belum Ada Riwayat Konsultasi
              </h2>
              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/70 mb-8 leading-relaxed">
                Riwayat konsultasi yang sudah selesai akan muncul di sini.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationPage;
