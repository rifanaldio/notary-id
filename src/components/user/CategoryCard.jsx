import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';

const CategoryCard = ({ icon, title, desc, onClick, isSelected, disabled, unavailableMessage }) => (
  <div className="relative group/card">
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all w-full relative ${
        disabled
          ? 'border-brand-muted/20 dark:border-brand-light/5 bg-brand-muted/5 dark:bg-brand-dark/50 opacity-60 cursor-not-allowed'
          : isSelected
          ? 'border-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20 shadow-md -translate-y-1 cursor-pointer'
          : 'border-brand-muted/30 dark:border-brand-light/10 bg-brand-surface dark:bg-brand-dark shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer'
      }`}
      title={disabled ? (unavailableMessage || 'Tidak tersedia') : desc}
    >
      <div className={`flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full transition ${
        disabled
          ? 'bg-brand-muted/10 dark:bg-brand-muted/20 text-brand-muted'
          : isSelected
          ? 'bg-brand-primary/20 dark:bg-brand-primary/30 text-brand-primary'
          : 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary/20 dark:group-hover:bg-brand-primary/30'
      }`}>
        <div className="scale-125">{icon}</div>
      </div>
      <div className="text-center w-full">
        <h3 className={`text-xs sm:text-sm font-semibold leading-tight mb-1 ${
          disabled
            ? 'text-brand-muted dark:text-brand-light/50'
            : isSelected
            ? 'text-brand-primary'
            : 'text-brand-dark dark:text-brand-light'
        }`}>
          {title}
        </h3>
        {disabled && unavailableMessage && (
          <div className="flex items-center justify-center gap-1 mt-1">
            <AlertCircle size={12} className="text-status-warning dark:text-status-warning/80" />
            <span className="text-[10px] text-status-warning dark:text-status-warning/80 font-medium">
              Tidak tersedia
            </span>
          </div>
        )}
      </div>
    </button>
    {disabled && unavailableMessage && (
      <div className="absolute z-50 invisible group-hover/card:visible opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 px-3 py-2 bg-brand-dark dark:bg-brand-light text-white dark:text-brand-dark text-xs rounded-lg shadow-xl pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-brand-dark dark:bg-brand-light"></div>
        <p className="relative z-10 text-center leading-relaxed">{unavailableMessage}</p>
      </div>
    )}
  </div>
);

CategoryCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  unavailableMessage: PropTypes.string
};

CategoryCard.defaultProps = {
  desc: '',
  onClick: undefined,
  isSelected: false,
  disabled: false,
  unavailableMessage: undefined
};

export default CategoryCard;

