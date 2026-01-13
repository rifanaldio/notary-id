import PropTypes from 'prop-types';
import { CheckCircle } from 'lucide-react';
import Modal from '../common/Modal';

const SuccessModal = ({ isOpen, onClose, title, message, buttonText, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
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
    </Modal>
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
