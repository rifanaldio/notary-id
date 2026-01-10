import PropTypes from 'prop-types';
import { Calendar, Clock, MapPin, ChevronRight, Building2, FileText } from 'lucide-react';

const ConsultationCard = ({ consultation, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-status-success/10 text-status-success border-status-success/20';
      case 'CLOSED':
        return 'bg-brand-muted/20 text-brand-muted dark:text-brand-light/70 border-brand-muted/30';
      case 'PENDING':
        return 'bg-status-warning/10 text-status-warning border-status-warning/20';
      default:
        return 'bg-brand-muted/20 text-brand-muted border-brand-muted/30';
    }
  };

  return (
    <div className="relative bg-white dark:bg-brand-dark rounded-lg shadow-sm border border-brand-muted/20 dark:border-brand-light/10 p-4 hover:shadow-md transition-shadow">
      {/* Consultation ID (Desktop - top right) */}
      <div className="absolute top-3 right-3 hidden sm:block">
        <p className="text-[10px] text-brand-muted dark:text-brand-light/70">
          Consultation ID: {consultation.id}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Left: Notary Info */}
        <div className="flex items-start gap-3 flex-1">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/40 dark:from-brand-primary/30 dark:to-brand-primary/50 flex items-center justify-center overflow-hidden">
              <Building2 size={24} className="text-brand-primary" />
            </div>
          </div>

          {/* Notary Details */}
          <div className="flex-1 min-w-0 pr-16 sm:pr-0">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex-1">
                <p className="text-[10px] text-brand-muted dark:text-brand-light/70 mb-0.5">
                  Konsultasi dengan
                </p>
                <h3 className="text-sm font-bold text-brand-dark dark:text-brand-light mb-0.5">
                  {consultation.notaryName}
                </h3>
                <p className="text-xs text-brand-muted dark:text-brand-light/70">
                  {consultation.notarySpecialization}
                </p>
              </div>
              <div className="flex items-center gap-1.5 ml-3">
                <FileText size={14} className="text-status-danger" />
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1.5 text-brand-dark dark:text-brand-light">
                <Calendar size={12} className="text-brand-muted dark:text-brand-light/70" />
                <span>{consultation.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-muted dark:text-brand-light/70">
                <Clock size={12} />
                <span>{consultation.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-muted dark:text-brand-light/70">
                <MapPin size={12} />
                <span>{consultation.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status and Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:flex-col sm:items-end">
          {/* Status Badge */}
          <div className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold uppercase ${getStatusColor(consultation.status)}`}>
            {consultation.status}
          </div>

          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onViewDetails(consultation.id)}
            className="flex items-center gap-1 text-brand-primary hover:opacity-80 transition text-xs font-semibold"
          >
            Lebih Lanjut
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Consultation ID (Mobile) */}
      <div className="mt-3 pt-3 border-t border-brand-muted/20 dark:border-brand-light/10 sm:hidden">
        <p className="text-[10px] text-brand-muted dark:text-brand-light/70">
          Consultation ID: {consultation.id}
        </p>
      </div>
    </div>
  );
};

ConsultationCard.propTypes = {
  consultation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    notaryName: PropTypes.string.isRequired,
    notarySpecialization: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['ACTIVE', 'CLOSED', 'PENDING']).isRequired
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default ConsultationCard;
