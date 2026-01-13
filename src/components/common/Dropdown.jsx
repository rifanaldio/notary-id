import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

/**
 * Reusable Dropdown Component
 * Can be used for select inputs, menus, etc.
 */
const Dropdown = ({
  label,
  placeholder,
  options = [],
  selectedValue,
  onSelect,
  disabled = false,
  loading = false,
  error = null,
  required = false,
  className = '',
  optionClassName = '',
  renderOption = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => {
    if (typeof selectedValue === 'object') {
      return opt.id === selectedValue?.id || opt.value === selectedValue?.value;
    }
    return opt.id === selectedValue || opt.value === selectedValue;
  });

  const displayText = selectedOption 
    ? (selectedOption.name || selectedOption.label || selectedOption.value)
    : placeholder;

  return (
    <div className={`w-full relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
          {label}
          {required && <span className="text-status-danger ml-1">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        disabled={disabled || loading}
        className={`w-full flex items-center justify-between rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark px-4 py-3 shadow-sm hover:border-brand-primary transition text-left disabled:opacity-50 disabled:cursor-not-allowed ${
          selectedOption ? 'text-brand-dark dark:text-brand-light' : 'text-brand-muted'
        }`}
      >
        <span>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Memuat...
            </span>
          ) : (
            displayText
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-brand-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && options.length > 0 && (
        <div className="absolute z-20 w-full mt-1 max-h-60 overflow-auto rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark shadow-lg">
          {options.map((option) => {
            const isSelected = selectedOption?.id === option.id || selectedOption?.value === option.value;
            
            if (renderOption) {
              return renderOption(option, isSelected, () => handleSelect(option));
            }

            return (
              <button
                key={option.id || option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-3 text-left hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition ${optionClassName} ${
                  isSelected
                    ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary font-semibold'
                    : 'text-brand-dark dark:text-brand-light'
                }`}
              >
                {option.name || option.label || option.value}
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-xs text-status-danger mt-1">{error}</p>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  optionClassName: PropTypes.string,
  renderOption: PropTypes.func
};

export default Dropdown;
