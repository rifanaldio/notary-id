import PropTypes from 'prop-types';
import { Calendar, Clock, MapPin, ChevronRight, Building2, MessageCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const ConsultationCard = ({ consultation, onViewDetails, onChatClick }) => {

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
              {/* <div className="flex items-center gap-1.5 ml-3">
                <FileText size={14} className="text-status-danger" />
              </div> */}
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
          <StatusBadge status={consultation.status} size="sm" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Chat Button - Only show for ACTIVE consultations */}
            {consultation.status === 'ACTIVE' && onChatClick && (
              <button
                type="button"
                onClick={() => onChatClick(consultation.id)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white transition shadow-sm hover:shadow-md"
                title="Buka Chat"
              >
                <MessageCircle size={16} />
              </button>
            )}
            
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
  onViewDetails: PropTypes.func.isRequired,
  onChatClick: PropTypes.func
};

export default ConsultationCard;
