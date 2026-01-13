import PropTypes from 'prop-types';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

/**
 * Reusable Status Badge Component
 * Displays status with appropriate icon and color
 */
const StatusBadge = ({ 
  status, 
  size = 'md', 
  showIcon = true,
  className = '' 
}) => {
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || '';

    switch (statusLower) {
      case 'approved':
      case 'success':
      case 'active':
        return {
          icon: CheckCircle,
          color: 'text-status-success',
          bgColor: 'bg-status-success/10',
          borderColor: 'border-status-success/20',
          label: status === 'ACTIVE' ? 'ACTIVE' : 'Disetujui'
        };
      case 'revision':
      case 'warning':
      case 'pending':
        return {
          icon: AlertCircle,
          color: 'text-status-warning',
          bgColor: 'bg-status-warning/10',
          borderColor: 'border-status-warning/20',
          label: status === 'PENDING' ? 'PENDING' : 'Perlu Revisi'
        };
      case 'failed':
      case 'error':
      case 'closed':
        return {
          icon: XCircle,
          color: 'text-status-danger',
          bgColor: 'bg-status-danger/10',
          borderColor: 'border-status-danger/20',
          label: status === 'CLOSED' ? 'CLOSED' : 'Ditolak'
        };
      case 'reviewing':
      default:
        return {
          icon: Clock,
          color: 'text-brand-muted dark:text-brand-light/70',
          bgColor: 'bg-brand-muted/10 dark:bg-brand-muted/20',
          borderColor: 'border-brand-muted/20',
          label: 'Sedang Diperiksa'
        };
    }
  };

  const sizeClasses = {
    sm: {
      padding: 'px-2 py-0.5',
      text: 'text-[10px]',
      icon: 12
    },
    md: {
      padding: 'px-2.5 py-1',
      text: 'text-[10px]',
      icon: 12
    },
    lg: {
      padding: 'px-3 py-1.5',
      text: 'text-xs',
      icon: 14
    }
  };

  const config = getStatusConfig(status);
  const sizeConfig = sizeClasses[size];
  const StatusIcon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${sizeConfig.padding} rounded-md ${config.bgColor} ${config.borderColor} border ${className}`}
    >
      {showIcon && (
        <StatusIcon size={sizeConfig.icon} className={config.color} />
      )}
      <span className={`${sizeConfig.text} font-semibold ${config.color} uppercase`}>
        {config.label}
      </span>
    </div>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showIcon: PropTypes.bool,
  className: PropTypes.string
};

export default StatusBadge;
