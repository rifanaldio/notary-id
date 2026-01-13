import PropTypes from 'prop-types';
import { Download } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import FileIcon from '../common/FileIcon';
import { formatFileSize, formatDate } from '../../utils/formatters';

const FileList = ({ files, onFileClick }) => {

  if (!files || files.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <FileText size={48} className="text-brand-muted dark:text-brand-light/30 mx-auto mb-3" />
          <p className="text-sm text-brand-muted dark:text-brand-light/70">
            Belum ada dokumen yang diupload
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-brand-muted/20 dark:border-brand-light/10 bg-brand-muted/5 dark:bg-brand-dark/50">
        <h3 className="text-sm font-bold text-brand-dark dark:text-brand-light mb-1">
          Dokumen Konsultasi
        </h3>
        <p className="text-xs text-brand-muted dark:text-brand-light/70">
          {files.length} {files.length === 1 ? 'dokumen' : 'dokumen'}
        </p>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {files.map((file) => {
        return (
          <div
            key={file.id}
            className="p-3 rounded-xl border border-brand-muted/20 dark:border-brand-light/10 bg-white dark:bg-brand-dark hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            onClick={() => onFileClick?.(file)}
          >
            <div className="flex items-start gap-3">
              {/* File Icon */}
              <div className="flex-shrink-0 p-2 rounded-lg bg-white dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10">
                <FileIcon fileType={file.type} size={20} />
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-brand-dark dark:text-brand-light truncate mb-1">
                  {file.name}
                </p>
                <p className="text-[10px] text-brand-muted dark:text-brand-light/70 mb-2">
                  {formatFileSize(file.size)}
                </p>

                {/* Status Badge */}
                <StatusBadge status={file.status} size="sm" />

                {/* Comment if exists */}
                {file.comment && (
                  <p className="text-[10px] text-brand-muted dark:text-brand-light/70 mt-2 italic">
                    "{file.comment}"
                  </p>
                )}

                {/* Upload Date */}
                {file.uploadedAt && (
                  <p className="text-[10px] text-brand-muted dark:text-brand-light/50 mt-1">
                    {formatDate(file.uploadedAt)}
                  </p>
                )}
              </div>

              {/* Download Button */}
              {file.url && (
                <a
                  href={file.url}
                  download={file.name}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0 p-1.5 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                  title="Download"
                >
                  <Download size={16} className="text-brand-muted dark:text-brand-light/70" />
                </a>
              )}
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      size: PropTypes.number,
      type: PropTypes.string,
      url: PropTypes.string,
      status: PropTypes.oneOf(['reviewing', 'revision', 'failed', 'approved']),
      comment: PropTypes.string,
      uploadedAt: PropTypes.string,
      updatedAt: PropTypes.string
    })
  ),
  onFileClick: PropTypes.func
};

export default FileList;
