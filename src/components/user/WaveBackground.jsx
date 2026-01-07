import PropTypes from 'prop-types';

const WaveBackground = ({ className, variant = 'default' }) => {
  const variants = {
    default: {
      waveColor: '#1B264F', // brand-dark
      bgColor: '#000000',
      opacity: 0.9,
      gradient: true
    },
    light: {
      waveColor: '#276EF1', // brand-primary
      bgColor: '#F8F9FA', // brand-light
      opacity: 0.1,
      gradient: false
    },
    accent: {
      waveColor: '#276EF1', // brand-primary
      bgColor: 'transparent',
      opacity: 0.15,
      gradient: false
    }
  };

  const config = variants[variant] || variants.default;
  const gradientId = `waveGradient-${variant}`;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {config.gradient ? (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.waveColor} stopOpacity={config.opacity} />
              <stop offset="50%" stopColor={config.waveColor} stopOpacity={config.opacity * 0.95} />
              <stop offset="100%" stopColor={config.waveColor} stopOpacity={config.opacity * 0.85} />
            </linearGradient>
          ) : null}
        </defs>
        {/* Background */}
        {config.bgColor !== 'transparent' && (
          <rect width="100%" height="100%" fill={config.bgColor} />
        )}
        {/* Wave shape - smooth curve with prominent peak */}
        <path
          d="M0,250 Q200,50 500,150 Q800,50 1000,150 Q1200,20 1440,150 L1440,500 L0,500 Z"
          fill={config.gradient ? `url(#${gradientId})` : config.waveColor}
          fillOpacity={config.gradient ? 1 : config.opacity}
          className="transition-all duration-1000"
        />
      </svg>
    </div>
  );
};

WaveBackground.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'accent'])
};

WaveBackground.defaultProps = {
  className: '',
  variant: 'default'
};

export default WaveBackground;

