import PropTypes from 'prop-types';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component
 * Base component for all modals in the application
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  showCloseButton = true,
  size = 'md', // sm, md, lg, xl
  className = ''
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`bg-white dark:bg-brand-dark rounded-2xl shadow-2xl w-full ${sizeClasses[size]} pointer-events-auto animate-modalSlideIn ${className}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Header with Close Button */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 pb-4 border-b border-brand-muted/20 dark:border-brand-light/10">
              {title && (
                <h2 id="modal-title" className="text-xl font-bold text-brand-dark dark:text-brand-light">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-brand-muted/20 dark:hover:bg-brand-light/10 transition-colors ml-auto"
                  aria-label="Close"
                >
                  <X size={20} className="text-brand-muted dark:text-brand-light/70" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={title || showCloseButton ? 'p-6' : 'p-6 sm:p-8'}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string
};

export default Modal;
