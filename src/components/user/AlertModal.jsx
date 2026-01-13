import PropTypes from 'prop-types';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import Modal from '../common/Modal';

const AlertModal = ({ isOpen, onClose, type = 'info', title, message, buttonText = 'OK' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} className="text-status-success" />;
      case 'error':
        return <XCircle size={24} className="text-status-danger" />;
      case 'warning':
        return <AlertCircle size={24} className="text-status-warning" />;
      case 'info':
      default:
        return <Info size={24} className="text-brand-primary" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'success':
        return 'bg-status-success/10';
      case 'error':
        return 'bg-status-danger/10';
      case 'warning':
        return 'bg-status-warning/10';
      case 'info':
      default:
        return 'bg-brand-primary/10';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 rounded-full ${getIconBg()} flex items-center justify-center`}>
          {getIcon()}
        </div>
      </div>

      {/* Title */}
      {title && (
        <h3 className="text-xl font-bold text-center text-brand-dark dark:text-brand-light mb-3">
          {title}
        </h3>
      )}

      {/* Message */}
      <p className="text-center text-brand-muted dark:text-brand-light/70 mb-6 leading-relaxed">
        {message}
      </p>

      {/* Button */}
      <button
        type="button"
        onClick={onClose}
        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        {buttonText}
      </button>
    </Modal>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string
};

export default AlertModal;
