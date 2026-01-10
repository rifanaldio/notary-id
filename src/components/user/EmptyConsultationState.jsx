import PropTypes from 'prop-types';
import { MessageCircle, Search } from 'lucide-react';

const EmptyConsultationState = ({ onStartConsultation }) => {
  return (
    <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-sm border border-brand-muted/20 dark:border-brand-light/10 p-8 sm:p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center mb-6">
          <MessageCircle size={48} className="text-brand-primary" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-brand-dark dark:text-brand-light mb-3">
          Belum Ada Konsultasi Aktif
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/70 mb-8 leading-relaxed">
          Mulai konsultasi dengan notaris terpercaya untuk mendapatkan bantuan hukum yang Anda butuhkan. 
          Pilih notaris yang sesuai dengan kebutuhan Anda.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onStartConsultation}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <Search size={18} />
          Cari Notaris untuk Konsultasi
        </button>
      </div>
    </div>
  );
};

EmptyConsultationState.propTypes = {
  onStartConsultation: PropTypes.func.isRequired
};

export default EmptyConsultationState;
