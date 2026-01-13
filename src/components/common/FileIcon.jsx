import PropTypes from 'prop-types';
import { FileText, Image as ImageIcon, File } from 'lucide-react';

/**
 * Reusable File Icon Component
 * Displays appropriate icon based on file type
 */
const FileIcon = ({ fileType, size = 20, className = '' }) => {
  const getIcon = () => {
    if (!fileType) return File;

    const type = fileType.toLowerCase();

    if (type.startsWith('image/')) {
      return ImageIcon;
    } else if (
      type.includes('pdf') ||
      type.includes('document') ||
      type.includes('msword') ||
      type.includes('wordprocessingml') ||
      type.includes('spreadsheetml') ||
      type.includes('excel')
    ) {
      return FileText;
    }

    return File;
  };

  const Icon = getIcon();

  return (
    <Icon 
      size={size} 
      className={`text-brand-primary ${className}`}
    />
  );
};

FileIcon.propTypes = {
  fileType: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
};

export default FileIcon;
