import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { MessageCircle, Search } from 'lucide-react';
import ConsultationCard from '../../components/user/ConsultationCard';
import EmptyConsultationState from '../../components/user/EmptyConsultationState';

const ActiveConsultationPage = () => {
  const navigate = useNavigate();
  const { consultations } = useAppSelector((state) => state.consultation);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Jika belum login, redirect ke home
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted dark:text-brand-light/70 mb-4">
            Silakan login terlebih dahulu untuk melihat konsultasi aktif Anda
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

  // Filter hanya konsultasi aktif (status ACTIVE)
  const activeConsultations = consultations.filter(c => c.status === 'ACTIVE');
  const hasActiveConsultations = activeConsultations.length > 0;

  return (
    <div className="min-h-screen bg-brand-muted/20 dark:bg-brand-dark/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Konsultasi Aktif
          </h1>
          <p className="text-sm text-brand-muted dark:text-brand-light/70">
            Kelola konsultasi yang sedang berlangsung dengan notaris
          </p>
        </div>

        {/* Content */}
        {hasActiveConsultations ? (
          <div className="space-y-3">
            {activeConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onViewDetails={(id) => {
                  // TODO: Navigate to chat/detail page
                  console.log('View details for active consultation:', id);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyConsultationState onStartConsultation={() => navigate('/')} />
        )}
      </div>
    </div>
  );
};

export default ActiveConsultationPage;
