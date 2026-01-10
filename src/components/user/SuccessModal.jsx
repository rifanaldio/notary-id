import PropTypes from 'prop-types';
import { CheckCircle, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message, buttonText, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop with animation */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal with animation */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white dark:bg-brand-dark rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-modalSlideIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-muted/20 dark:hover:bg-brand-light/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-brand-muted dark:text-brand-light/70" />
          </button>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-status-success/10 dark:bg-status-success/20 flex items-center justify-center animate-scaleIn">
                <CheckCircle size={48} className="text-status-success" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-brand-dark dark:text-brand-light mb-3">
              {title || 'Pembayaran Berhasil!'}
            </h2>

            {/* Message */}
            <p className="text-center text-brand-muted dark:text-brand-light/70 mb-8 leading-relaxed">
              {message || 'Pembayaran Anda telah berhasil diproses.'}
            </p>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {buttonText || 'OK'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  buttonText: PropTypes.string,
  onConfirm: PropTypes.func
};

export default SuccessModal;
