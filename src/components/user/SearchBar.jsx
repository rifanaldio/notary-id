import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder, onSearch }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-brand-muted dark:text-brand-light/80">
      Cari Notaris atau Layanan
    </label>
    <div className="flex items-center gap-2 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark px-3 py-2 shadow-sm">
      <Search size={18} className="text-brand-muted" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent focus:outline-none text-brand-dark dark:text-brand-light placeholder:text-brand-muted"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <button
        type="button"
        className="rounded-lg bg-brand-primary px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
        onClick={() => onSearch?.()}
      >
        Cari
      </button>
    </div>
  </div>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func
};

SearchBar.defaultProps = {
  placeholder: 'Masukkan nama notaris atau jenis layanan',
  onSearch: undefined
};

export default SearchBar;

